/*global Module*/
"use strict";

import React from 'react';

const styles = {
    header: {
        textAlign: 'center',
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
        fontSize: '28px',
        fontFamily: "'Fira Mono', Monaco, 'Andale Mono', 'Lucida Console', 'Bitstream Vera Sans Mono', 'Courier New', Courier, monospace"
    },
    finishButton: {
        width: '200px',
        height: '40px',
        backgroundColor: 'red',
        color: 'white',
        fontSize: '16px',
        fontFamily: "'Fira Mono', Monaco, 'Andale Mono', 'Lucida Console', 'Bitstream Vera Sans Mono', 'Courier New', Courier, monospace"
    }
}

/**
 * Component for adding user parameters
 */
class NextViewer extends React.Component {
    /**
     * Basic constructor.
     * @param {any} props properties of Component
     */
    constructor(props) {
        super(props);
        this.props = props;
        this.state = { 
        }
    }

    render() {
        return (
            <div onMouseDown={ev => {if (ev) ev.stopPropagation();}} onTouchStart={ev => {if (ev) ev.stopPropagation();}}>
                <div style={styles.nextButton_position}>
                    <button type='button' onClick={this.props.onClickNext} style={styles.nextButton}>
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

export default NextViewer;
