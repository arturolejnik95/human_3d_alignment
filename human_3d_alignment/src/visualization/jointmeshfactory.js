"use strict";
import * as THREE from 'three';
import Transformations from './transformations';

/**
 * Helper class for creating meshes for joints in Framsticks-SDK. It combines 
 * Framsticks-SDK logic with THREE.js logic.
 * 
 * For now shape versions of joints are hard-coded. It may need redefinition in 
 * the future.
 */
class JointMeshFactory {
    /**
     * Basic constructor that takes information of how joints should be drawn.
     * @param {object} config basic config for joints drawing
     * @param {boolean} physics determines if created objects should by Physijs based
     */
    constructor(config, physics = false) {
        this.config = config;
        this.transformations = new Transformations();
        this.jointShapes = this.transformations.getJointShapes();
        this.physics = physics;
    }

    /**
     * Creates Mesh for a given Joint.
     * @param {Module.Joint} joint Framsticks-SDK Joint class object
     * @param {object}  shapeConfig object holding following fields
     * @param {number}  shapeConfig.radius radius of mesh
     * @param {number}  shapeConfig.radiusSegments number of segments for mesh
     * @param {boolean} shapeConfig.isTransparent true if transparent, false otherwise
     * @param {number}  shapeConfig.opacity opacity of mesh
     * @returns {Mesh}  Mesh for a given joint
     */
    getNewJointMesh(joint, color, shapeConfig) {
        let firstPartPosVec = new THREE.Vector3(
            joint.get_part1().get_p().get_x(), 
            joint.get_part1().get_p().get_y(), 
            joint.get_part1().get_p().get_z());
        let secondPartPosVec = new THREE.Vector3(
            joint.get_part2().get_p().get_x(), 
            joint.get_part2().get_p().get_y(), 
            joint.get_part2().get_p().get_z());

        let direction = new THREE.Vector3().subVectors(secondPartPosVec, firstPartPosVec);
        let geometry = new THREE.CylinderGeometry(shapeConfig.radius, shapeConfig.radius, direction.length() - 2 * 0.18, shapeConfig.radiusSegments);     
        let material = this.transformations.getNewMaterial(color);   
        let mesh = new THREE.Mesh( geometry, material ); //new Physijs.CylinderMesh( geometry, Physijs.createMaterial(material) ); //new THREE.Mesh( geometry, material );

        let orientation = new THREE.Matrix4();
        orientation.lookAt(firstPartPosVec, secondPartPosVec, new THREE.Object3D().up);
        orientation.multiply(new THREE.Matrix4().set(
            1, 0, 0, 0, 
            0, 0, 1, 0, 
            0, -1, 0, 0, 
            0, 0, 0, 1
        ));

        mesh.applyMatrix(orientation);
        mesh.position.x = (secondPartPosVec.x + firstPartPosVec.x) / 2;
        mesh.position.y = (secondPartPosVec.y + firstPartPosVec.y) / 2;
        mesh.position.z = (secondPartPosVec.z + firstPartPosVec.z) / 2;
        
        
        mesh.userData = { 
            isBodyElement: true, 
            type: 'j', 
            data: joint, 
            mesh: mesh, 
            connectedParts: [], 
            showTransparent: true 
        };
        return mesh;
    }

    /**
     * Method finds for a given jointMesh all attached partMeshes and updates 
     * respectively for those objects their connectedParts and connectedJoints 
     * fields.
     * @param {JointMesh}  jointMesh joint for which attached parts will be searched
     * @param {PartMesh}  partMeshes list of available parts
     */
    addConnectionInfo(jointMesh, partMeshes) {
        let p1 = jointMesh.data.get_part1();
        let p2 = jointMesh.data.get_part2();
        let count = 0;
        for (let i = 0; i < partMeshes.length && count < 2; ++i) {
            if (partMeshes[i].data === p1 || partMeshes[i].data === p2) {
                jointMesh.connectedParts.push(partMeshes[i]);
                partMeshes[i].connectedJoints.push(jointMesh);
                ++count;
            }
        }
    }

    /**
     * Creates mesh for a given Joint. Additional parameter partMeshes is 
     * provided to update both Joint and connected Parts with info about 
     * their connectivity.
     * @param {Module.Joint} joint joint for which mesh is created
     * @param {PartMesh}  partMeshes list of available parts
     * @returns {JointMesh} new joint mesh, for properties of Object look at addConnectionInfo jointMesh param documentation
     */
    create(joint, color, partMeshes) {
        let result;
        let shape = joint.get_shape();

        if (this.jointShapes['SHAPE_FIXED'].value == shape) {
            result = this.getNewJointMesh(joint, color, this.config.linkShape);
        } else {
            result = this.getNewJointMesh(joint, color, this.config.cylinderShape);
        }

        if (partMeshes) {
            this.addConnectionInfo(result.userData, partMeshes);
        }

        return result;
    }
}

export default JointMeshFactory;