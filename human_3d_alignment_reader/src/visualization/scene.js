"use strict";
import * as THREE from 'three';

/**
 * Class helper for creating a THREE.js scene with multiple meshes.
 */
class Scene {
    /**
     * Basic constructor setting THREE.js Scene object
     */
    constructor() {
        this.scene = new THREE.Scene();
    }

    /**
     * Adds new element (or more elements) to THREE.js Scene
     * @param {...Object3D[]} obj list of objects to be added to the Scene
     */
    add(obj) {
        this.scene.add(obj);
    }

    /**
     * Removes object from Scene by reference. If object was geometry or material, 
     * then it disposes their data
     * @param {Object3D} obj object to be removed from Scene
     */
    remove(obj) {
        this.scene.remove(obj);
        if (obj.geometry) {
            obj.geometry.dispose();
            obj.geometry = null;
        }
        if (obj.material) {
            obj.material.dispose();
            obj.material = null;
        }
    }

    /**
     * Getter for Scene children
     * @returns {Object3D} children of Scene
     */
    getChildren() {
        return this.scene.children;
    }

    /**
     * Getter of meshes of Scene
     * @returns {Mesh} only meshes objects from Scene
     */
    getMeshes() {
        let meshes = [];
        for (let i = 0; i < this.scene.children.length; i++) {
            let child = this.scene.children[i];
            if (child instanceof THREE.Mesh) {
                meshes.push(child);
            }
        }
        return meshes;
    }

    /**
     * Removes all elements from Scene.
     */
    clear() {
        let toRemove = [];
        for (let i = 0; i < this.scene.children.length; i++) {
            let obj = this.scene.children[i];
            if (obj.userData && obj.userData.isBodyElement) {
                toRemove.push(obj);
            }
        }
        for (let i = 0; i < toRemove.length; i++) {
            this.remove(toRemove[i]);
        }
    }

    /**
     * Render scene with renderer
     * @param {WebGLRenderer} renderer Renderer for scene
     * @param {PerspectiveCamera} camera Perspective camera for scene
     */
    render(renderer, camera) {
        renderer.render(this.scene, camera);
    }
}

export default Scene;