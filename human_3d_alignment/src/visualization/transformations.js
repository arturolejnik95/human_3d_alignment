/*global Module*/
"use strict";

import * as THREE from 'three';
import JointMeshFactory from './jointmeshfactory';
import PartMeshFactory from './partmeshfactory';

/**@typedef {object} BodyElement
 * @property {boolean} isBodyElement checked if element is body element
 * @property {string} type should be 'p' for parts, 'j' for joints
 * @property {object} data model logic for part or joint
 * @property {Mesh} mesh mesh for a given part
*/

/**@typedef {BodyElement} PartMesh
 * @property {Module.Part} data model logic for part
 * @property {Module.Joint[]} connectedJoints list of joints connected to part
 */

/**@typedef {BodyElement} JointMesh
 * @property {Module.Joint} data reference to model logic joint
 * @property {Module.Part[]} connectedParts list of parts connected by this joint
 * @property {boolean} showTransparent true if joint should be transparent
 */

/**
 * @typedef {object} ShapeInfo
 * @property {string} name full name of shape
 * @property {number} value enum for part shape
 */

/** Parts and Joints geometry info for viewer */
export const geometry = {
    part: {
        defaultShape: {
            radius: 0.213,
            segments: 16
        },
        ellipsoidShape: {
            radius: 1,
            segments: 32
        }
    },
    joint: {
        cylinderShape: {
            radius: 0.1,
            radiusSegments: 10
        },
        linkShape: {
            radius: 0.04,
            radiusSegments: 10
        }
    }
};

/**
 * Class for creating various transformations on Framsticks-SDK joints and parts 
 * meshes. It contains helpers for conversions between Joint/Part logic and THREE.js 
 * visualization. 
 * 
 * Any constants and methods considering shapes should go here.
 */
class Transformations {

    /**
     * Basic constructor for Transformations class. 
     * Initializes fields partShapes and jointShapes with getPartShapes and 
     * getJointsShapes results.
     */
    constructor() {
        this.partShapes = this.getPartShapes();
        this.jointShapes = this.getJointShapes();
    }

    /**
     * Getter for Part shapes informations.
     * @returns {ShapeInfo[]} basic info about shapes of parts
     */
    getPartShapes() {
        let shapes = [];
        shapes["SHAPE_BALL_AND_STICK"] = { name: "Ball & Stick", value: Module.Part["SHAPE_BALL_AND_STICK"] };
        shapes["SHAPE_ELLIPSOID"] = { name: "Elipsoid", value: Module.Part["SHAPE_ELLIPSOID"] };
        shapes["SHAPE_CUBOID"] = { name: "Cuboid", value: Module.Part["SHAPE_CUBOID"] };
        shapes["SHAPE_CYLINDER"] = { name: "Cylinder", value: Module.Part["SHAPE_CYLINDER"] };
        return shapes;
    }

    /**
     * Getter for Joint shapes informations.
     * @returns {ShapeInfo[]} basic info about shapes of joints
     */
    getJointShapes() {
        let shapes = [];
        shapes["SHAPE_BALL_AND_STICK"] = { name: "Ball & Stick", value: Module.Joint["SHAPE_BALL_AND_STICK"] };
        shapes["SHAPE_FIXED"] = { name: "Fixed", value: Module.Joint["SHAPE_FIXED"] };
        return shapes;
    }

    /**
     * Recursive method for checking which elements are affected by transformations of object.
     * This is internal method that should not be called.
     * @param {BodyElement} bodyElement bodyelement, for which connected elements are checked for affection 
     * @param {object} result {partElements: PartMesh[], jointElements: JointMesh[]} that is result of recursive call
     */
    getAffectedElements_r(bodyElement, result) {
        if (bodyElement.marked) {
            return;
        }

        if (bodyElement.type == "p") {

            bodyElement.marked = true;
            result.partElements.push(bodyElement);

            for (let i = 0; i < bodyElement.connectedJoints.length; ++i) {
                let joint = bodyElement.connectedJoints[i];
                if (!joint.marked) {
                    joint.marked = true;
                    result.jointElements.push(joint);
                    if (joint.data.get_usedelta()) {
                        this.getAffectedElements_r(joint.connectedParts[1], result);
                    }
                }
            }

        }
        else if (bodyElement.type == "j") {
            bodyElement.marked = true;
            result.jointElements.push(bodyElement);

            this.getAffectedElements_r(bodyElement.connectedParts[1], result);
        }
    }

    /**
     * Function that finds affected elements with function getAffectedElements_r 
     * and returns all affected parts and joints
     * @param {BodyElement} bodyElement bodyelement, for which connected elements are checked for affection 
     * @returns {object} {partElements: PartMesh[], jointElements: JointMesh[]} that is result of recursive call
     */
    getAffectedElements(bodyElement) {
        let result = {
            partElements: [],
            jointElements: []
        };

        this.getAffectedElements_r(bodyElement, result);

        for (let j = 0; j < result.partElements.length; ++j) {
            result.partElements[j].marked = false;
        }
        for (let k = 0; k < result.jointElements.length; ++k) {
            result.jointElements[k].marked = false;
        }
        return result;
    }

    /**
     * Helper for clamping colors from Framsticks-SDK to 0-1 values
     * @param {number} value density of color
     * @returns {number} clamped color
     */
    calcColorComponent(value) {
        return THREE.Math.clamp(value, 0, 1);
    }

    /**
     * Applies color for a given element
     * @param {BodyElement} bodyElement body element to color
     * @param {number} component which component should be changed
     * @param {number} value new value of component
     */
    applyColor(bodyElement, component, value) {
        bodyElement.mesh.material.color[component] = this.calcColorComponent(value);
    }

    /**
     * Creates new phong material for Mesh
     * @param {number} r color red
     * @param {number} g color green
     * @param {number} b color blue
     * @returns {MeshPhongMaterial} new material for Mesh
     */
    getNewMaterial(color) {
        return new THREE.MeshPhongMaterial({
            color: color,
            transparent: true,
            opacity: 0.6,
            reflectivity: 0.2,
            shininess: 600
        });
    }

    /**
     * Returns THREE.js object representing rotation matrix based on XYZ axis
     * rotation angles.
     * @param {number} rotAngleX angle of rotation for X axis
     * @param {number} rotAngleY angle of rotation for Y axis
     * @param {number} rotAngleZ angle of rotation for Z axis
     * @returns {THREE.Euler} rotation matrix to be applied for model
     */
    getPartRotation(rotAngleX, rotAngleY, rotAngleZ) {
        return new THREE.Euler(rotAngleX, -rotAngleY, rotAngleZ, "ZYX");
    }

    /**
     * Creates rotation matrix for cylinder Part
     * @param {number} rotAngleX rotate coordinate
     * @param {number} rotAngleY rotate coordinate
     * @param {number} rotAngleZ rotate coordinate
     * @returns {Matrix4} rotation matrix for cylinder Part
     */
    getCylinderPartRotationMatrix(rotAngleX, rotAngleY, rotAngleZ) {
        let rot = this.getPartRotation(rotAngleX, rotAngleY, rotAngleZ);

        let m = new THREE.Matrix4();
        m.makeRotationZ(THREE.Math.degToRad(90));

        let m2 = new THREE.Matrix4();
        m2.makeRotationFromEuler(rot);
        m2.multiply(m);
        return m2;
    }

    /**
     * Applies rotation on a single part
     * @param {BodyElement} bodyElement element on which rotation will be performed
     */
    applySinglePartRotation(bodyElement) {
        let shape = bodyElement.data.get_shape();
        let rot = bodyElement.data.get_o().getAngles();

        if (this.partShapes['SHAPE_CYLINDER'].value == shape) {
            let m = this.getCylinderPartRotationMatrix(
                rot.get_x(), 
                rot.get_y(), 
                rot.get_z());
            bodyElement.mesh.rotation.setFromRotationMatrix(m);
        }
        else {
            let r = this.getPartRotation(rot.get_x(), rot.get_y(), rot.get_z());
            bodyElement.mesh.rotation.copy(r);
        }
    }

    /**
     * Applies rotation on a bodyElement part and all other affected elements.
     * @param {BodyElement} bodyElement element on which rotation will be performed
     */
    applyPartRotation(bodyElement) {

        let affectedElements = this.getAffectedElements(bodyElement);

        if (affectedElements.partElements.length > 1) {
            for (let i = 0; i < affectedElements.partElements.length; ++i) {
                let part = affectedElements.partElements[i];
                part.mesh.position.x = part.data.get_p().get_x();
                part.mesh.position.y = part.data.get_p().get_y();
                part.mesh.position.z = part.data.get_p().get_z();
                this.applySinglePartRotation(part);
            }
            let jointMeshFactory = new JointMeshFactory(this.jointShapes);
            for (let j = 0; j < affectedElements.jointElements.length; ++j) {
                let newJointMesh = jointMeshFactory.create(affectedElements.jointElements[j].data);
                this.changeBodyElementMesh(affectedElements.jointElements[j], newJointMesh);
            }
        } else {
            this.applySinglePartRotation(bodyElement);
        }

    }

    /**
     * Redefines all affected joints due to part changes
     * @param {BodyElement} bodyElement starting element
     */
    applyJointDeltaChange(bodyElement) {

        let affectedElements = this.getAffectedElements(bodyElement);

        for (let i = 0; i < affectedElements.partElements.length; ++i) {
            let part = affectedElements.partElements[i];
            part.mesh.position.x = part.data.get_p().get_x();
            part.mesh.position.y = part.data.get_p().get_y();
            part.mesh.position.z = part.data.get_p().get_z();
            this.applySinglePartRotation(part);
        }
        let jointMeshFactory = new JointMeshFactory(this.jointShapes);
        for (let j = 0; j < affectedElements.jointElements.length; ++j) {
            let newJointMesh = jointMeshFactory.create(affectedElements.jointElements[j].data);
            this.changeBodyElementMesh(affectedElements.jointElements[j], newJointMesh);
        }

    }

    /**
     * Applies scale to a part
     * @param {BodyElement} bodyElement element to be scaled
     */
    applyPartScale(bodyElement) {
        let part = bodyElement.data;
        let shape = part.get_shape();
        if (this.partShapes['SHAPE_CYLINDER'].value == shape) {
            bodyElement.mesh.scale.set(
                part.get_scale().get_y(), 
                part.get_scale().get_x(), 
                part.get_scale().get_z());
        } else if (this.partShapes['SHAPE_BALL_AND_STICK'].value != shape) {
            bodyElement.mesh.scale.set(
                part.get_scale().get_x(), 
                part.get_scale().get_y(), 
                part.get_scale().get_z());
        }
    }

    /**
     * Replaces old mesh of an element with a new mesh
     * @param {BodyElement} element Element to be changed
     * @param {Mesh} newMesh New mesh for element
     */
    changeBodyElementMesh(element, newMesh) {
        let scene = element.mesh.parent;
        let oldMesh = element.mesh;

        let userData = oldMesh.userData;
        userData.showTransparent = newMesh.userData.showTransparent;
        userData.mesh = newMesh.userData.mesh;
        newMesh.userData = userData;

        scene.remove(oldMesh);
        scene.add(newMesh);

        oldMesh.geometry.dispose();
        oldMesh.geometry = null;
        oldMesh.material.dispose();
        oldMesh.material = null;
    }

    /**
     * Changes Part position.
     * @param {BodyElement} bodyElement element to be changed
     * @param {string} axis which axis should be changed
     */
    applyPartPosition(bodyElement, axis) {
        let jointMeshFactory = new JointMeshFactory(this.jointShapes);

        let affectedElements = this.getAffectedElements(bodyElement);
        for (let i = 0; i < affectedElements.partElements.length; ++i) {
            affectedElements.partElements[i].mesh.position[axis] = 
                affectedElements.partElements[i].data.get_p()["get_" + axis]();
        }
        for (let j = 0; j < affectedElements.jointElements.length; ++j) {
            let newJointMesh = jointMeshFactory.create(affectedElements.jointElements[j].data);
            this.changeBodyElementMesh(affectedElements.jointElements[j], newJointMesh);
        }
    }

    /**
     * Updates all affected elements positions.
     * @param {BodyElement} bodyElement beginning element
     */
    updateAfterPartTranslation(bodyElement) {
        let jointMeshFactory = new JointMeshFactory(this.jointShapes);

        let affectedElements = this.getAffectedElements(bodyElement);
        for (let i = 0; i < affectedElements.partElements.length; ++i) {
            let currentElement = affectedElements.partElements[i];
            if (currentElement !== bodyElement) {
                affectedElements.partElements[i].mesh.position.x = 
                    affectedElements.partElements[i].data.get_p().get_x();
                affectedElements.partElements[i].mesh.position.y = 
                    affectedElements.partElements[i].data.get_p().get_y();
                affectedElements.partElements[i].mesh.position.z = 
                    affectedElements.partElements[i].data.get_p().get_z();
            }
        }
        for (let j = 0; j < affectedElements.jointElements.length; ++j) {
            let newJointMesh = jointMeshFactory.create(affectedElements.jointElements[j].data);
            this.changeBodyElementMesh(affectedElements.jointElements[j], newJointMesh);
        }
    }

    /**
     * Creates Part shape and removes old shape.
     * @param {PartMesh} bodyElement part to be applied
     */
    applyPartShape(bodyElement) {
        let partMeshFactory = new PartMeshFactory(this.partShapes);
        let newPartMesh = partMeshFactory.create(bodyElement.data);
        this.changeBodyElementMesh(bodyElement, newPartMesh);
    }

    /**
     * Creates Joint shape and removes old shape.
     * @param {JointMesh} bodyElement joint to be applied
     */
    applyJointShape(bodyElement) {
        let jointMeshFactory = new JointMeshFactory(this.jointShapes);
        let newJointMesh = jointMeshFactory.create(bodyElement.data);
        this.changeBodyElementMesh(bodyElement, newJointMesh);
    }
}

export default Transformations;