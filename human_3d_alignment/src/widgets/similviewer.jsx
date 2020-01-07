/*global Module*/
"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';
import Sviewer from '../visualization/sviewer';
import { Md3dRotation, MdYoutubeSearchedFor } from 'react-icons/lib/md';

/**
 * Component for assesing genotypes matching.
 */
class GenoViewer extends React.Component {
    /**
     * Basic constructor.
     * @param {any} props properties of Component
     */
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            autorotate: false,
            rezoom: true,
            valid: true,
            clicked: false,
            controlMode: 'translate',
            round: 0
        };
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.animate = this.animate.bind(this);
    }

    /**
     * Method initializes all visualizations and binds their methods and events with SViewer.
     */
    componentDidMount() {
        let temp = ReactDOM.findDOMNode(this.mount);
        let temp2 = ReactDOM.findDOMNode(this.mount).parentNode;
        this.viewer = new Sviewer(temp2.clientWidth, temp2.clientHeight, temp);
        this.viewer.setAutoRotate(this.state.autorotate);
        this.viewer.setRezoom(this.state.rezoom);

        this.renderScene = this.viewer.renderScene.bind(this.viewer);
        this.lastw = temp2.clientWidth;
        this.lasth = temp2.clientHeight;
        this.start();
    }

    /**
     * Method stops animation of Framsticks.
     */
    componentWillUnmount() {
        this.stop();
    }

    /**
     * After update of state all visualizations are refreshed
     */
    componentDidUpdate() {
        let temp = ReactDOM.findDOMNode(this.mount).parentNode;
        this.viewer.resizeView(temp.clientWidth, temp.clientHeight);
    }

    /**
     * Method starts animation process. Internal method, used by componentDidMount.
     */
    start() {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate);
        }
    }

    /**
     * Main animation loop. If any change was applied to genotype, this method loads new
     * models and brains.
     */
    animate() {
        let temp = ReactDOM.findDOMNode(this.mount).parentNode;
        if (this.lasth != temp.clientHeight || this.lastw != temp.clientWidth) {
            this.viewer.resizeView(temp.clientWidth, temp.clientHeight);
            this.lastw = temp.clientWidth;
            this.lasth = temp.clientHeight;
        }
        
        this.viewer.camera.getCameraControl().update();
        this.frameId = window.requestAnimationFrame(this.animate);
        this.viewer.scene.render(
            this.viewer.renderer, 
            this.viewer.camera.getPerspectiveCamera());
            
        if (!this.props.blockView) {

            if (this.props.round != this.state.round) {
                this.setState({ round: this.props.round }, function() {
                    console.log(`Round in sim: `, this.state.round);
                });
                this.viewer.add2Genotypes(this.props.genotype1, this.props.genotype2);
                this.viewer.addLines(this.props.selected1, this.props.selected2);
            }
            if (this.props.controlMode != this.state.controlMode) {
                this.setState({ controlMode: this.props.controlMode }, function() {
                    console.log('Control mode: ', this.state.controlMode);
                    this.viewer.setMode(this.state.controlMode);
                })
            }
            if (this.viewer.selected1 != this.props.selected1) {
                this.viewer.selected1 = [];
                this.viewer.selected1 = this.props.selected1;
            }
            if (this.viewer.selected2 != this.props.selected2) {
                this.viewer.selected2 = [];
                this.viewer.selected2 = this.props.selected2;
            }
            if (this.props.round == this.state.round) {
                this.viewer.addText();
                this.viewer.addLines(this.props.selected1, this.props.selected2);
            } else {
                this.viewer.clearView();
            }
        }
    }

    /**
     * Method cancels animation.
     */
    stop() {
        cancelAnimationFrame(this.frameId);
    }

    /**
     * Turns on/off rezoom property of viewer
     */
    switchRezoom() {
        this.setState({rezoom: !this.state.rezoom}, function() {
            this.viewer.setRezoom(this.state.rezoom);
        });
    }

    /**
     * Turns on/off autorotate property of viewer
     */
    switchAutorotate() {
        if (this.state.rezoom) {
            this.switchRezoom();
        }
        this.setState({autorotate: !this.state.autorotate}, function() {
            console.log(this.state.autorotate);
            this.viewer.setAutoRotate(this.state.autorotate);
        });
    }

    /**
     * Gets position of mouse
     */
    getMousePosition(evt){
        let bound = this.mount.getBoundingClientRect();
        let mousePosition = {x: 0, y: 0};
        mousePosition.x = ((evt.clientX - bound.left) / bound.width) * 2 - 1;
        mousePosition.y = -((evt.clientY - bound.top) / bound.height) * 2 + 1;
        let vector = new THREE.Vector2(mousePosition.x, mousePosition.y);
        return vector;
    }

       /**
     * Event function for using mouse within viewer.
     * @param {any} evt object holding event data
     */
    handleMouseDown(evt) {
        if (this.state.rezoom) {
            this.switchRezoom();
        }

        if (this.state.autorotate) {
            this.switchAutorotate();
        }

        evt.preventDefault();
        let mousePosition = this.getMousePosition(evt);
        this.viewer.handleMouseDown(mousePosition);
    }

           /**
     * Event function for using mouse within viewer.
     * @param {any} evt object holding event data
     */
    handleMouseUp(evt) {

        let position1 = [];
        let position2 = [];
        let rotation1 = [];
        let rotation2 = [];
        this.viewer.framstick1.mesh.position.toArray(position1);
        this.viewer.framstick2.mesh.position.toArray(position2);
        this.viewer.framstick1.mesh.rotation.toArray(rotation1);
        this.viewer.framstick2.mesh.rotation.toArray(rotation2);

        this.props.handleChangePosition1(position1);
        this.props.handleChangePosition2(position2);
        this.props.handleChangeRotation1(rotation1);
        this.props.handleChangeRotation2(rotation2);

        evt.preventDefault();
        let mousePosition = this.getMousePosition(evt);
        this.viewer.handleMouseUp(mousePosition);
    }

               /**
     * Event function for using mouse within viewer.
     * @param {any} evt object holding event data
     */
    handleMouseMove(evt) {
        evt.preventDefault();
        let mousePosition = this.getMousePosition(evt);
        this.viewer.handleMouseMove(mousePosition);
    }    
     
    render() {
        return (
            <table {...this.props} style={{height: '100%', width: '100%'}}>
                <tbody>
                    <tr onMouseDown={ev => {if (ev) ev.stopPropagation();}}>
                        <td rowSpan={2} style={{position:'relative', verticalAlign: 'top', alignContent: 'left'}}>
                            <div id="simcontainer" style={{height: '100%', width: '100%', position: 'absolute', transform: 'translateZ(0)'}} onMouseDown={ev => {if (ev) ev.stopPropagation();}} onTouchStart={ev => {if (ev) ev.stopPropagation();}}>
                                <canvas ref={(mount) => {this.mount = mount;}} onMouseDown={(evt) => this.handleMouseDown(evt)} onMouseUp={(evt) => this.handleMouseUp(evt)} onMouseMove={(evt) => this.handleMouseMove(evt)} style={{position: 'absolute', zIndex: 1}}></canvas>
                                <Md3dRotation onClick={() => this.switchAutorotate()}  style={{zIndex: 2, position: 'absolute', left: '5%', bottom: 0, width: '20%', height: '20%', maxWidth: '40px', maxHeight: '40px', minWidth: '15px', minHeight: '15px', color: this.state.autorotate ? 'green' : 'black'}} />
                                <MdYoutubeSearchedFor onClick={() => this.switchRezoom()} style={{zIndex: 2, position: 'absolute', right: '5%', bottom: 0, width: '20%', height: '20%', maxWidth: '40px', maxHeight: '40px', minWidth: '15px', minHeight: '15px', color: this.state.rezoom ? 'green' : 'black' }} />
                            </div>
                        </td>
                    </tr>  
                </tbody>
            </table>
        );
    }
}

export default GenoViewer;
