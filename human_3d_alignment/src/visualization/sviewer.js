/*global Module*/
"use strict";

import * as THREE from 'three';
import Framstick from './framstick';
import Scene from './scene';
import Camera from './camera';
const TransformControls = require('three-transform-controls')(THREE);

/** Camera class configuration for Viewer */
export const cameraconfig = {
    fieldOfView: 75,
    near: 0.1,
    far: 1000,
    autoRotateSpeed: 2,
    defaultSettings: {
        target: {
            x: 0,
            y: 0,
            z: 0
        },
        position: {
            x: 0.56,
            y: 0.56,
            z: 0.56
        },
    }
};

/** Light configuration for Viewer */
export const lightconfig = {
    ambient: {
        color: 0x303030
    },
    directional: {
        top: {
            color: 0x808080,
            intensity: 1.0,
            positionZ: 1000
        },
        bottom: {
            color: 0x808080,
            intensity: 1.0,
            positionZ: -1000
        }
    }
};

/**
 * Class for visualizing static Framsticks creatures. Connects all visualization 
 * classes and render scene in given HTML canvas. For resizing it is recommended 
 * to put canvas in resizable div and then compute new widths and heights from 
 * this parent.
 */
class Viewer {
    /**
     * Default constructor for Viewer. It initializes all 3D visualization objects 
     * in Scene  without creature Meshes. It needs canvas to be created in 
     * HTML - it does not create canvas on its own, like default WebGLRenderer. 
     * Width and height should be taken from canvas parent
     * @param {number} width width of canvas
     * @param {number} height height of canvas
     * @param {Element} canvasdom DOM reference to canvas.
     */
    constructor(width, height, canvasdom) {
        this.container = document.getElementById("simcontainer");

        this.meshes = [];
        this.parts = [];
        this.lines = [];
        this.framstick1 = null;
        this.framstick2 = null;
        this.selected1 = [];
        this.selected2 = [];

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            devicePixelRatio: window.devicePixelRatio || 1,
            canvas: canvasdom
        });
        this.renderer.setSize(width, height);
        this.raycaster = new THREE.Raycaster();
        this.scene = new Scene();
        this.camera = new Camera(cameraconfig, this.renderer.domElement, false);
        this.control = new TransformControls(this.camera.getPerspectiveCamera(), this.renderer.domElement);
        this.control.addEventListener( 'change', (e) => {
            this.addLines(this.selected1, this.selected2);
            this.addText();
        });
        this.control.addEventListener( 'dragging-changed', function(e) {
            this.camera.getCameraControl().enable = ! e.value;
        });
        this.scene.add(this.control);
        this.control.setMode( "translate" );

        let ambientLight = new THREE.AmbientLight(lightconfig.ambient.color);
        this.scene.add(ambientLight);

        let topDirectionalLight = new THREE.DirectionalLight(
            lightconfig.directional.top.color, 
            lightconfig.directional.top.intensity);
        topDirectionalLight.position.set(0, 0, lightconfig.directional.top.positionZ);
        this.scene.add(topDirectionalLight);

        let bottomDirectionalLight = new THREE.DirectionalLight(
            lightconfig.directional.bottom.color, 
            lightconfig.directional.bottom.intensity);
        bottomDirectionalLight.position.set(0, 0, lightconfig.directional.bottom.positionZ);
        this.scene.add(bottomDirectionalLight);

        this.renderer.setClearColor('gray');
        this.rezoom = false;
        this.autorotate = false;
        this.renderScene = this.renderScene.bind(this);
        this.selectedelements = [];

        this.mouse = new THREE.Vector2();
        this.SELECTED = null;
        this.CLICKED = false;


        this.lineMaterial = new THREE.LineBasicMaterial({
            color: 0xffff00,
            transparent: true,
            opacity: 0.5
        });

        this.textLabels = [];
        this.container = document.getElementById("simcontainer");
    }

    /**
     * Allow to clear view and add new pair of genotypes
     * @param {string} genotype1 Genotype of first framstick
     * @param {string} genotype2 Genotype of second framstick
     */
    add2Genotypes(genotype1, genotype2) {
        this.clearView();

        this.framstick1 = new Framstick(genotype1, this);
        this.framstick2 = new Framstick(genotype2, this);

        this.meshes = [];
        this.parts = [];

        for (let i = 0; i < this.framstick1.mesh.children.length; i++) {
            this.meshes.push(this.framstick1.mesh.children[i]);
        }

        for (let i = 0; i < this.framstick2.mesh.children.length; i++) {
            this.meshes.push(this.framstick2.mesh.children[i]);
        }

        for (let i = 0; i < this.framstick1.parts.length; i++) {
            this.parts.push(this.framstick1.parts[i]);
        }

        for (let i = 0; i < this.framstick2.parts.length; i++) {
            this.parts.push(this.framstick2.parts[i]);
        }

        this.framstick1.mesh.position.set( 0, -2, 0 );
        this.framstick2.mesh.position.set( 0, 2, 0 );

        this.framstick1.setPositions();
        this.framstick2.setPositions();

        this.framstick1.setColor('red');
        this.framstick2.setColor('blue');

        this.camera.zoomAll(this.meshes);
        this.addText();
    }

    /**
     * Draw lines between selected parts of both framsticks
     * @param {Array} selected1 array of values that user selected in fitview for first genotype
     * @param {Array} selected2 array of values that user selected in fitview for second genotype
     */
    addLines(selected1, selected2) {
        for (let i = 0; i < this.lines.length; i++) {
            this.scene.remove(this.lines[i]);
        }

        this.lines = [];

        let pairs = (selected1.length + selected2.length) / 2;

        for (let i = 0; i < pairs; i++) {
            if (selected1[i] != ' ' && selected2[i] != ' ') {
                let index1 = parseInt(selected1[i]) - 1;
                let index2 = selected2[i].charCodeAt(0) - 65;

                let tempV1 = new THREE.Vector3().copy(this.framstick1.positions[index1]).applyEuler(this.framstick1.mesh.rotation).add(this.framstick1.mesh.position);
                let tempV2 = new THREE.Vector3().copy(this.framstick2.positions[index2]).applyEuler(this.framstick2.mesh.rotation).add(this.framstick2.mesh.position);

                let geometry = new THREE.Geometry();
                geometry.vertices.push( tempV1 );
                geometry.vertices.push( tempV2 );

                let line = new THREE.Line( geometry, this.lineMaterial );
                this.lines.push(line);
            }
        }

        for (let i = 0; i < this.lines.length; i++) {
            this.scene.add(this.lines[i]);
        }
    }

    addText() {

        while (this.container.children.length > 3){
            this.container.removeChild(this.container.lastChild)
        }

        this.textLabels = [];

        if (this.framstick1 != null && this.framstick2 != null) {
            this.framstick1.addText(1);
            this.framstick2.addText(2);
        }

    }

    /**
     * Allow to change mode of TransformControls
     * @param {string} mode Selected mode of transformcontrols
     */
    setMode(mode) {
        this.control.setMode(mode);
    }

    /**
     * Selects object from scene according to current mouse position. The position
     * of mouse should be transformed to screen space, which has values from -1 to 1
     * for each dimension.
     * @param {{x: number, y: number}} position position of mouse in canvas normalized to [-1,1]x[-1,1] space
     */
    handleMouseDown(position) {
        this.raycaster.setFromCamera( position, this.camera.getPerspectiveCamera() );  
        let intersectsC1 = this.raycaster.intersectObjects( this.framstick1.mesh.children );
        let intersectsC2 = this.raycaster.intersectObjects( this.framstick2.mesh.children );

        if ( intersectsC1.length > 0 || intersectsC2.length > 0 ) {
            
            let obj = intersectsC1.length > 0 ? this.framstick1 : this.framstick2;

            if ( this.SELECTED ) {
                if (this.SELECTED == obj) {
                    if (this.SELECTED == this.framstick1) {
                        obj.setColor('red');
                    } else {
                        obj.setColor('blue');
                    }
                    this.control.detach();
                    this.SELECTED = null;
                } else {
                    if (this.SELECTED == this.framstick1) {
                        this.SELECTED.setColor('red');
                    } else {
                        this.SELECTED.setColor('blue');
                    }
                    this.control.detach();
                    obj.setColor('white');   
                    this.SELECTED = obj;      
                    this.control.attach( obj.mesh );     
                }
            } else {
                this.control.detach();
                obj.setColor('white');
                this.SELECTED = obj;  
                this.control.attach( obj.mesh );
            }
        } else {
            if (this.SELECTED) {
                if (this.SELECTED == this.framstick1) {
                    this.SELECTED.setColor('red');
                } else {
                    this.SELECTED.setColor('blue');
                }
                this.control.detach();
                this.SELECTED = null;
            }
        }
    }

    handleMouseUp() {
    }

    handleMouseMove(position) {
    }

    /**
     * Method for rendering Scene. It should be passed as drawing element in 
     * owners method.
     * 
     * Example of usage is visible in GenoViewer Component.
     * @returns {number} frameId of animation
     */
    renderScene() {
        this.camera.getCameraControl().update();

        let frameId = window.requestAnimationFrame(this.renderScene);
        this.scene.render(this.renderer, this.camera.getPerspectiveCamera());
        return frameId;
    }

    /**
     * Resizes scene. Use with caution - this is performance-consuming function, 
     * so it should only be used when necessary. To perform resize, the canvas 
     * should have absolute position within parent, otherwise it
     * will change size on its own.
     * @param {number} width new width of canvas
     * @param {number} height new height of canvas
     */
    resizeView(width, height) {
        this.renderer.context.canvas.width = width;
        this.renderer.context.canvas.height = height;
        this.camera.getPerspectiveCamera().aspect = width / height;
        this.camera.getPerspectiveCamera().updateProjectionMatrix();
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio || 1);
    }

    /**
     * Determines whether camera should change position in order to show all body
     * or not.
     * @param {boolean} rezoom true if should rezoom, false otherwise
     */
    setRezoom(rezoom) {
        this.rezoom = rezoom;
        if (this.rezoom) {
            this.camera.zoomAll(this.meshes);
        }
    }

    /**
     * Determines whether camera should rotate automatically.
     * @param {boolean} autorotate true if should autorotate, false otherwise
     */
    setAutoRotate(autorotate) {
        this.camera.setAutoRotate(autorotate);
    }

    /**
     * Clears scene from meshes.
     */
    clearView() {
        if (this.framstick1 != null && this.framstick2 != null) {
            this.scene.remove(this.framstick1.mesh);
            this.scene.remove(this.framstick2.mesh);
        }
        this.control.detach();
        while (this.container.children.length > 3) {
            this.container.removeChild(this.container.lastChild)
        }

        this.SELECTED = null;
    }

    /**
     * Returns reference to renderer DOM Element.
     * @returns {Element} DOM Element of Viewer.
     */
    getDOM() {
        return this.renderer.domElement;
    }

    /**
     * Highlights all parts and joints presented in selectedelements argument.
     * @param {SelectedElements} selectedelements object of class SelectedElements defined in mappingresolver.js, determines which parts and joints should be highlighted
     */
    highlightElements(selectedelements) {
        this.selectedelements = [];
        for (let i = 0; i < selectedelements.parts.length; i++) {
            this.parts[selectedelements.parts[i]].material.transparent = false;
            this.parts[selectedelements.parts[i]].material.emissive.set('green');
            this.selectedelements.push(this.parts[selectedelements.parts[i]]);
        }
        for (let i = 0; i < selectedelements.joints.length; i++) {
            this.joints[selectedelements.joints[i]].material.transparent = false;
            this.joints[selectedelements.joints[i]].material.emissive.set('green');
            this.selectedelements.push(this.joints[selectedelements.joints[i]]);
        }
    } 

    /**
     * Removes all highlights from objects.
     */
    clearHighlights() {
        for (let i = 0; i < this.selectedelements.length; i++) {
            if (this.selectedelements[i] && this.selectedelements[i].material) {
                this.selectedelements[i].material.transparent = this.selectedelements[i].userData.showTransparent;
                this.selectedelements[i].material.emissive.set('black');
            }
        }
        this.selectedelements = [];
    }
}

export default Viewer;
