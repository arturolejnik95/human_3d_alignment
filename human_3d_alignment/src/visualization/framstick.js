/*global Module*/
"use strict";

import * as THREE from 'three';
import PartMeshFactory from './partmeshfactory';
import JointMeshFactory from './jointmeshfactory';
import GenotypeParser from '../utils/genotypeparser';
import { geometry } from './transformations';


/**
 * @file Framstick Object
 * @author Patryk Gliszczynski
 * @version 1.2
 */
class Framstick {

  /**
   * 
   * @param {Genotype} genotype genotype of creating framstick
   */
  constructor(genotype, viewer) {
    this.viewer = viewer;
    this.genotype = genotype;
    this.parts = [];
    this.joints = [];
    this.meshes = [];
    
    this.positions = [];
    this.color = 'white';
    this.avgPosition = new THREE.Vector3(0, 0, 0);

    this.partfactory = new PartMeshFactory(geometry.part);
    this.jointfactory = new JointMeshFactory(geometry.joint);

    this.mesh = new THREE.Group();
    this.loadFromGenotype();

    for (let i = 0; i < this.mesh.children.length; i++) {
      this.avgPosition.add(this.mesh.children[i].position.clone());
    }

    this.avgPosition.divideScalar(this.mesh.children.length);

    for (let i = 0; i < this.mesh.children.length; i++) {
      this.mesh.children[i].position.sub(this.avgPosition);
    }

    this.viewer.scene.add(this.mesh);

  }

  /**
   * Change Framstick's color on click
   */
  setColor(color) { 
    if (this.color != color) {
      let colorTemp = this.color;
      this.color = color;

      let position = this.mesh.position.clone();
      let rotation = this.mesh.rotation.clone();
      this.viewer.scene.remove(this.mesh);

      this.loadFromGenotype();

      this.mesh.position.set( position.x, position.y, position.z );
      this.mesh.rotation.set(rotation.x, rotation.y, rotation.z, rotation.order );


      if (this.color == 'red' || colorTemp == 'red') {
        for (let i = 0; i < this.meshes.length; i++) {
          this.viewer.meshes.shift();
        }
        for (let i = 0; i < this.parts.length; i++) {
          this.viewer.parts.shift();
        }
        for (let i = this.meshes.length - 1; i >= 0; i--) {
          this.viewer.meshes.unshift(this.meshes[i]);
        }
        for (let i = this.parts.length - 1; i >= 0; i--) {
          this.viewer.parts.unshift(this.parts[i]);
        }
      } else {
        for (let i = 0; i < this.meshes.length; i++) {
          this.viewer.meshes.pop();
        }
        for (let i = 0; i < this.parts.length; i++) {
          this.viewer.parts.pop();
        }
        for (let i = 0; i < this.meshes.length; i++) {
          this.viewer.meshes.push(this.meshes[i]);
        }
        for (let i = 0; i < this.parts.length; i++) {
          this.viewer.parts.push(this.parts[i]);
        }
      }

      this.viewer.scene.add(this.mesh);
    }
  }

  addText(nr) {
    for (let i = 0; i < this.positions.length; i++) {
      let div = document.createElement("div");
      div.className = "label";
      div.style.position = 'absolute';
      div.style.color = 'white';
      div.style.textAlign = 'center';
      div.style.display = '';
      div.style.fontFamily = "'Fira Mono', Monaco, 'Andale Mono', 'Lucida Console', 'Bitstream Vera Sans Mono', 'Courier New', Courier, monospace";
      //div.style.margin = '-5px 0 0 15px';
      div.style.pointerEvents = 'none';
      div.style.webkitUserSelect = 'none';
      div.style.mozUserSelect = 'none';
      div.style.msUserSelect = 'none';
      div.style.userSelect = 'none';

      if (nr == 1) {
        div.textContent = (i+1).toString();
      } else {
        let label = '';
        if (i + 1 + 64 > 90) {
          label = String.fromCharCode(i + 1 + 70);
        } else {
          label = String.fromCharCode(i + 1 + 64);
        }    
        div.textContent = label;
      }
      
      let pos = new THREE.Vector3().copy(this.positions[i]).applyEuler(this.mesh.rotation).add(this.mesh.position);
      let dis = pos.distanceTo(this.viewer.camera.perspectiveCamera.position);
      pos.project(this.viewer.camera.perspectiveCamera);

      this.viewer.raycaster.setFromCamera(pos, this.viewer.camera.perspectiveCamera);

      let intersectedObjects = this.viewer.raycaster.intersectObjects(this.viewer.parts);
      let show = intersectedObjects.length && this.parts[i] === intersectedObjects[0].object;


      if (Math.abs(pos.z) > 1 || pos.x < -0.96 || pos.y < -0.96 || pos.x > 0.96 || pos.y > 0.96)  {
        div.style.display = 'none';
      } else {
        div.style.fontSize = (150.0 / dis).toString() + 'px';
        div.style.display = '';

        if ((150.0 / dis)/(2*this.viewer.container.clientHeight) + pos.y > 1.0 || 
            pos.y - (150.0 / dis)/(2*this.viewer.container.clientHeight) < -1.0 || 
            (150.0 / dis)/(2*this.viewer.container.clientWidth) + pos.x > 1.0 || 
            pos.x - (150.0 / dis)/(2*this.viewer.container.clientWidth) < -1.0) {
          div.style.display = 'none';
        }
        div.style.zIndex = (-pos.z * .5 + .5) * 100000 | 0;

        if (!show) {
          //div.style.margin = '-5px 0 0 15px';
          div.style.display = 'none';
        }
        
        let x = (pos.x *  .5 + .5) * this.viewer.container.clientWidth;
        let y = (pos.y * -.5 + .5) * this.viewer.container.clientHeight;
        div.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;
        this.viewer.container.appendChild(div);
      }

    }
  }

  /**
   * Return framstick position in the world
   */
  setPositions() {
    this.positions = [];
    let tempV = new THREE.Vector3();

    for (let i = 0; i < this.parts.length; i++) {
      let mesh = this.parts[i];

      this.viewer.camera.perspectiveCamera.updateMatrixWorld(true, false);
      mesh.getWorldPosition(tempV);
      this.positions.push(tempV.clone());
    }
  }

  /**
  * Code below was taken from: http://fugue.synology.me:30000/grzegorzlatosinski/framsticks-js
  * @author Grzegorz Latosiński
  * @pull_date 22.01.2018
  */
  loadFromGenotype() {
    this.mesh = new THREE.Group();

    let model = GenotypeParser.getModelFromGenotype(this.genotype);

    if (typeof model !== 'undefined') {
      let partsforjoints = [];
      this.meshes = [];
      this.parts = [];
      this.joints = [];

      for (let i = 0; i < model.getPartCount(); i++) {
        let m = this.partfactory.create(model.getPart(i), this.color);
        partsforjoints.push(m.userData);
        this.mesh.add(m)
        this.parts.push(m);
        this.meshes.push(m);
      }

      for (let i = 0; i < model.getJointCount(); i++) {
        let m = this.jointfactory.create(model.getJoint(i), this.color, partsforjoints);
        
        this.mesh.add(m);
        this.joints.push(m);
        this.meshes.push(m);
      }

      new THREE.Box3().setFromObject(this.mesh).getCenter(this.mesh.position).multiplyScalar(-1);

      for (let i = 0; i < this.mesh.children.length; i++) {
        this.mesh.children[i].position.sub(this.avgPosition);
      }
    }
  }
}

export default Framstick;
