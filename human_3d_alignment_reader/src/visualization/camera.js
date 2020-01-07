"use strict";
import * as THREE from 'three';

const OrbitControls = require('three-orbit-controls')(THREE);

/**
 * Class for creating camera object in THREE.js view. it uses OrbitControls for
 * user moving. It is designed to work with model analysis.
 */
class Camera {
    /**
     * Method for Camera initialization. It's adjusting the view according to
     * camera resize, prepares OrbitControls as default controller.
     */
    init() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            this.config.fieldOfView,
            window.innerWidth / window.innerHeight,
            this.config.near,
            this.config.far
        );
        this.perspectiveCamera.up.set(0,0,1);
        this.cameraControl = new OrbitControls(this.perspectiveCamera, this.rendererDOMElement);
        this.cameraControl.autoRotate = this.autoRotate;
        this.cameraControl.autoRotateSpeed = this.config.autoRotateSpeed;
        this.cameraControl.enableKeys = false;
    }

    /**
     * Creates instance of camera, then initalizes it with init() method
     * @param {{fieldOfView: number, near: number, far: number}} config Configuration of Camera view
     * @param {Element} rendererDOMElement Canvas in which element will be drawn.
     * @param {boolean} autoRotate true if camera should rotate, false otherwise
     */
    constructor(config, rendererDOMElement, autoRotate) {
        this.config = config;
        this.rendererDOMElement = rendererDOMElement;
        this.autoRotate = autoRotate;
        this.perspectiveCamera = null;
        this.cameraControl = null;
        this.init();
    }

    /**
     * Method for updating modelBox coordinates
     * @param {{min: {x: number, y: number, z: number}, max: {x: number, y: number, z: number}}} modelBox Bounding box of Model
     * @param {{min: {x: number, y: number, z: number}, max: {x: number, y: number, z: number}}} box update of bounding box
     */
    updateModelBox(modelBox, box) {
        modelBox.min.x = Math.min( modelBox.min.x, box.min.x );
        modelBox.min.y = Math.min( modelBox.min.y, box.min.y );
        modelBox.min.z = Math.min( modelBox.min.z, box.min.z );

        modelBox.max.x = Math.max( modelBox.max.x, box.max.x );
        modelBox.max.y = Math.max( modelBox.max.y, box.max.y );
        modelBox.max.z = Math.max( modelBox.max.z, box.max.z );
    }

    /**
     * Extracts bounding box of given object.
     * @param {Object3D} object object for which bounding box is extracted
     * @returns {Box3} bounding box of object
     */
    getBoundingBox(object) {
        let box = new THREE.Box3();
        box.setFromObject(object);
        return box;
    }

    /**
     * Calculates Camera position and rotation that should be used in order to see all meshes in scene.
     * @param {Mesh[]} meshes list of meshes to be bound by camera.
     * @returns {{target: {x: number, y: number, z: number}, position: {x: number, y: number, z: number}}} new position of Camera and target, to which Camera should point
     */
    calculateCameraSetting(meshes) {
        if (meshes.length == 0) {
            return this.config.defaultSettings;
        }

        let modelBox = new THREE.Box3();
        for (let i = 0; i < meshes.length; i++) {
            let mesh = meshes[i];
            let box = this.getBoundingBox(mesh);
            this.updateModelBox(modelBox, box);
        }

        let modelSphere = modelBox.getBoundingSphere();

        this.targetPosition = modelSphere.center.clone();
        this.cameraPosition = modelSphere.center.clone().addScalar(modelSphere.radius);

        return {
            target: {
                x: modelSphere.center.x,
                y: modelSphere.center.y,
                z: modelSphere.center.z
            },
            position: {
                x: modelSphere.center.x + modelSphere.radius,
                y: modelSphere.center.y + modelSphere.radius,
                z: modelSphere.center.z + modelSphere.radius
            }
        };
    }

    /**
     * Moves Camera to cover all selected meshes in canvas.
     * @param {Mesh[]} meshes list of meshes to be seen
     */
    zoomAll(meshes) {
        let settings = this.calculateCameraSetting(meshes);
        this.cameraControl.target.set(settings.target.x, settings.target.y, settings.target.z);
        this.perspectiveCamera.position.set(settings.position.x, settings.position.y, settings.position.z);
        this.cameraControl.update();
    }

    /**
     * Getter for THREE.js perspective camera logic.
     * @returns {PerspectiveCamera} reference to Camera perspective camera
     */
    getPerspectiveCamera() {
        return this.perspectiveCamera;
    }

    /**
     * Getter for THREE.js orbit controls logic.
     * @returns {OrbitControls} reference to Camera orbit controls
     */
    getCameraControl() {
        return this.cameraControl;
    }

    /**
     * Sets the camera autorotation property.
     * @param {boolean} autoRotate true if camera should autorotate, false otherwise
     */
    setAutoRotate(autoRotate) {
        this.autoRotate = autoRotate;
        this.cameraControl.autoRotate = this.autoRotate;
    }
}

export default Camera;