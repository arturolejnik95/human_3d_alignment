/*global Module*/
"use strict";

import React from 'react';
import Slider from 'react-input-slider';

const styles = {
    header: {
        textAlign: 'center',
        letterSpacing: '5px',
        fontFamily: "'Fira Mono', Monaco, 'Andale Mono', 'Lucida Console', 'Bitstream Vera Sans Mono', 'Courier New', Courier, monospace", 
        webkitUserSelect : 'none', 
        mozUserSelect: 'none', 
        msUserSelect: 'none', 
        userSelect: 'none'
    },
    interval: {
        display: 'table',
        width: '100%',
        height: '20px'
    },
    small_interval: {
        display: 'table',
        width: '100%',
        height: '5px'
    },
    slider_position: {
        textAlign: 'center',
        width: '100%'
    },
    nextButton_position: {
        display: 'table',
        width: '100%',
        textAlign: 'center'
    },
    finishButton_position: {
        display: 'table',
        width: '90%',
        textAlign: 'right'
    },
    slider: {
        width: '80%'
    },
    nextButton: {
        width: '250px',
        height: '50px',
        fontSize: '28px'
    },
    finishButton: {
        width: '200px',
        height: '40px',
        backgroundColor: 'red',
        color: 'white',
        fontSize: '16px'
    },
    percent: {
        textAlign: 'center', 
        fontFamily: "'Fira Mono', Monaco, 'Andale Mono', 'Lucida Console', 'Bitstream Vera Sans Mono', 'Courier New', Courier, monospace", 
        webkitUserSelect : 'none', 
        mozUserSelect: 'none', 
        msUserSelect: 'none', 
        userSelect: 'none'
    }
}

/**
 * Component for adding user parameters
 */
class SliderViewer extends React.Component {
    /**
     * Basic constructor.
     * @param {any} props properties of Component
     */
    constructor(props) {
        super(props);
        this.props = props;
        this.state = { 
            percent: 50
        }

        this.handleChangePercent = this.handleChangePercent.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
    }
    
    /**
     * Allow to change percent in state of sliderViewer and set it also in props
     * @param {number} per choosed similarity of framsticks by user in percentage
     */
    handleChangePercent(per) {
		this.setState({ percent: per.x }, function() {
            console.log(this.state.percent);
            this.props.handleChangePercent(this.state.percent);
        });
    }

    onClickNext() {
        let index1 = this.props.selected1.indexOf(' ');
        let index2 = this.props.selected2.indexOf(' ');

        if (index1 < 0 && index2 < 0) {
            this.props.onClickNext();
            this.setState({ percent: 50 }, function() {
                console.log(this.state.percent);
                this.props.handleChangePercent(this.state.percent);
            });
        } else {
            let min = '';
            let max = '';
            if (this.props.parts1 <= this.props.parts2) {
                min = 'pierwszego';
                max = 'drugiego';
            } else {
                min = 'drugiego';
                max = 'pierwszego';
            }
            alert('Należy dopasować wszystkie wierzchołki z '+min+' modelu z wierzchołkami '+max+' modelu.');
        }
        
    }

    render() {
        return (
            <div onMouseDown={ev => {if (ev) ev.stopPropagation();}} onTouchStart={ev => {if (ev) ev.stopPropagation();}}>
                <h2 className='title' style={styles.header}>
                    PODOBIEŃSTWO
                </h2>
                <div style={styles.interval}/>
                <div className='slider' style={styles.slider_position}>
                    <Slider 
                        min={0}
                        max={100}
                        x = {this.state.percent}
                        percent = {this.state.percent}
                        style={styles.slider}
                        onChange={this.handleChangePercent}
                    />
                </div> 
                <div style={styles.small_interval}/>
                <div className='percent' style={styles.percent}>
                    {this.state.percent} %
                </div>
                <div style={styles.interval}/>
                <div style={styles.nextButton_position}>
                    <button type='button' onClick={this.onClickNext} disabled={this.props.isDisable} style={styles.nextButton}>
                        Następny
                    </button>
                </div>
                <div style={styles.small_interval}/>
                <div style={styles.finishButton_position}>
                    <button type='button' onClick={this.props.onClickFinish} style={styles.finishButton}>
                        Zamknij
                    </button>
                </div>
                
            </div>
        );
    }
}

export default SliderViewer;
