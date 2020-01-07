"use strict";
import * as THREE from 'three';
import Transformations from './transformations';

/**
 * Helper class for creating meshes for parts in Framsticks-SDK. 
 * It combines Framsticks-SDK logic with THREE.js logic.
 * 
 * For now shape versions of parts are hard-coded. It may need redefinition 
 * in the future.
 */
class PartMeshFactory {
    /**
     * Basic constructor that takes information of how parts should be drawn.
     * @param {object} config object holding following fields
     * @param {object} config.defaultShape object holding following fields
     * @param {number} config.defaultShape.radius radius of part cylinder
     * @param {number} config.defaultShape.segments number of segments on cylinder
     * @param {object} config.ellipsoidShape object holding following fields
     * @param {number} config.ellipsoidShape.radius radius of part ellipsoid
     * @param {number} config.ellipsoidShape.segments number of segments on ellipsoid
     * 
     */
    constructor(config) {
        this.config = config;
        this.transformations = new Transformations();
        this.partShapes = this.transformations.getPartShapes();
    }

    /**
     * Creates sphere mesh for a given part.
     * @param {Module.Part} part part, for which Mesh is generated
     * @param {number} sphereRadius radius of part sphere
     * @param {number} segments number of created segments
     * @param {boolean} applyScale true if scale for this mesh should be applied from Module.Part
     * @returns {PartMesh} info about part mesh
     */
    getNewSphereMesh(part, color, sphereRadius, segments, applyScale) {
        let geometry = new THREE.SphereGeometry(sphereRadius, segments, segments);
        let material = this.transformations.getNewMaterial(color);
        let mesh = null;
        if (applyScale) {
            geometry.scale(
                part.get_scale().get_x(), 
                part.get_scale().get_y(), 
                part.get_scale().get_z());
            if (part.get_scale().get_x() == part.get_scale().get_y() && 
                part.get_scale().get_x() == part.get_scale().get_z()) {
                mesh = new THREE.Mesh(geometry, material);
            } else {
                mesh = new THREE.Mesh(geometry, material);
            }
        }
        else {
            mesh = new THREE.Mesh(geometry, material);
        }
        mesh.position.set(
            part.get_p().get_x(), 
            part.get_p().get_y(), 
            part.get_p().get_z());

        // if (applyScale) {
        //     mesh.scale.set(
        //         part.get_scale().get_x(), 
        //         part.get_scale().get_y(), 
        //         part.get_scale().get_z());
        // }

        let angles = part.get_o().getAngles();
        mesh.rotation.copy(
            this.transformations.getPartRotation(
                angles.get_x(), 
                angles.get_y(), 
                angles.get_z())
        );

        mesh.userData = { 
            isBodyElement: true, 
            type: 'p', 
            data: part, 
            mesh: mesh, 
            isPhysical: this.physics,
            connectedJoints: [] 
        };
        return mesh;
    }

    /**
     * Creates box mesh for a given part
     * @param {Module.Part} part part, for which Mesh is generated
     * @returns {PartMesh} info about part mesh
     */
    getNewBoxMesh(part, color) {
        let geometry = new THREE.BoxGeometry(2, 2, 2);
        geometry.scale(
            part.get_scale().get_x(), 
            part.get_scale().get_y(), 
            part.get_scale().get_z());

        let material = this.transformations.getNewMaterial(color);
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
            part.get_p().get_x(), 
            part.get_p().get_y(), 
            part.get_p().get_z());

        let angles = part.get_o().getAngles();
        mesh.rotation.copy(this.transformations.getPartRotation(
            angles.get_x(), 
            angles.get_y(), 
            angles.get_z()));

        mesh.userData = { 
            isBodyElement: true, 
            type: 'p', 
            data: part, 
            mesh: mesh, 
            isPhysical: this.physics,
            connectedJoints: [] 
        };
        return mesh;
    }

    /**
     * Creates cylinder mesh for a given part
     * @param {Module.Part} part part, for which Mesh is generated
     * @returns {PartMesh} info about part mesh
     */
    getNewCylinderMesh(part, color) {
        let geometry = new THREE.CylinderGeometry(1, 1, 2, 32);
        let material = this.transformations.getNewMaterial(color);

        geometry.scale(
            part.get_scale().get_y(), 
            part.get_scale().get_x(), 
            part.get_scale().get_z());

        let mesh = null;
        if (part.get_scale().get_y() == part.get_scale().get_z()) {
            mesh = new THREE.Mesh(geometry, material);
        } else {
            mesh = new THREE.Mesh(geometry, material);
        }
        mesh.position.set(
            part.get_p().get_x(), 
            part.get_p().get_y(), 
            part.get_p().get_z());

        let angles = part.get_o().getAngles();
        let m = this.transformations.getCylinderPartRotationMatrix(
            angles.get_x(), 
            angles.get_y(), 
            angles.get_z());

        mesh.rotation.setFromRotationMatrix(m);

        mesh.userData = { 
            isBodyElement: true, 
            type: 'p', 
            data: part, 
            mesh: mesh, 
            isPhysical: this.physics,
            connectedJoints: [] 
        };
        return mesh;
    }

    /**
     * Creates part mesh according to which shape should be applied for a given 
     * part.
     * @param {Module.Part} part part, for which Mesh is generated
     * @returns {PartMesh} info about part mesh
     */
    create(part, color) {

        let shape = part.get_shape();
        if (this.partShapes['SHAPE_ELLIPSOID'].value == shape) {
            return this.getNewSphereMesh(
                part, 
                color,
                this.config.ellipsoidShape.radius, 
                this.config.ellipsoidShape.segments, true);
        }
        else if (this.partShapes['SHAPE_CUBOID'].value == shape) {
            return this.getNewBoxMesh(part, color);
        }
        else if (this.partShapes['SHAPE_CYLINDER'].value == shape) {
            return this.getNewCylinderMesh(part, color);
        }
        return this.getNewSphereMesh(
            part, 
            color,
            this.config.defaultShape.radius, 
            this.config.defaultShape.segments, 
            false);
    }
}

export default PartMeshFactory;