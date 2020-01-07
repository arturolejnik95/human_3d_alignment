/*global Module*/
"use strict";

import React from 'react';


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
    columnBench: {
        width: '30%', 
        float: 'left'
    },
    columnField: {
        width: '20%', 
        float: 'left'
    },
    creatureText: {
        margin: '0',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        webkitUserSelect : 'none',
        mozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none',
        fontFamily: "'Fira Mono', Monaco, 'Andale Mono', 'Lucida Console', 'Bitstream Vera Sans Mono', 'Courier New', Courier, monospace"
    },
    creatureBench: { 
        position: 'relative', 
        border: '2px solid black', 
        color: 'white', 
        backgroundColor: 'gray', 
        margin: '5px auto', 
        width: '50px', 
        height: '60px', 
        fontSize: '30px',
        pointerEvent: 'none',
        fontFamily: "'Fira Mono', Monaco, 'Andale Mono', 'Lucida Console', 'Bitstream Vera Sans Mono', 'Courier New', Courier, monospace"
    },
    creatureBench1: { 
        position: 'relative', 
        border: '2px solid black', 
        color: 'white', 
        backgroundColor: 'red', 
        margin: '5px auto', 
        width: '50px', 
        height: '60px', 
        fontSize: '30px',
        pointerEvents: 'none',
        fontFamily: "'Fira Mono', Monaco, 'Andale Mono', 'Lucida Console', 'Bitstream Vera Sans Mono', 'Courier New', Courier, monospace"
    },
    creatureBench2: { 
        position: 'relative', 
        border: '2px solid black', 
        color: 'white', 
        backgroundColor: 'blue', 
        margin: '5px auto', 
        width: '50px', 
        height: '60px', 
        fontSize: '30px',
        pointerEvents: 'none',
        fontFamily: "'Fira Mono', Monaco, 'Andale Mono', 'Lucida Console', 'Bitstream Vera Sans Mono', 'Courier New', Courier, monospace"
    },
    middleField:{
        color: 'gray', 
        backgroundColor: 'gray', 
        margin: '5px auto', 
        width: '54px', 
        height: '64px'
    },
    emptyField: {
        display: 'table', 
        width: '100%', 
        height: '20px'
    },
    field: {
        display: 'flex'
    },
    empty: {
        webkitUserSelect : 'none',
        mozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none'
    }
};

/**
 * Component for assesing genotypes matching.
 */
class FitViewer extends React.Component {
    /**
     * Basic constructor.
     * @param {any} props properties of Component
     */
    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            height: 5,
            initialX: 0,
            initialY: 0
        }
        
        this.createSecondColumn = this.createSecondColumn.bind(this);
        this.createThirdColumn = this.createThirdColumn.bind(this);
    }

    createSecondColumn() {
        let column = []
        let len = Math.min(this.props.parts1, this.props.parts2);
        for (let i = 0; i < len; i++) { 
            if (this.props.selected1.length == len) {       
                column.push(
                    <div id={'field1-'+(i+1).toString()} 
                        className='field'
                        style={styles.middleField}>
                        <div id={'creature' + this.props.selected1[i]} 
                            className='creature1' 
                            onMouseDown={this.select}
                            style={styles.creatureBench1}>
                            <p id={'p' + this.props.selected1[i]} style={styles.creatureText}>
                                {this.props.selected1[i]}
                            </p>
                        </div>
                    </div>
                );
            }
        }
        if (column.length == 0) {
            column.push(
                <div style={styles.empty}>&nbsp;</div>
            );
        }
        return column;
    }

    createThirdColumn() {
        let column = [];
        let len = Math.min(this.props.parts1, this.props.parts2);
        for (let i = 0; i < len; i++) {  
            if (this.props.selected2.length == len) {
                let value = this.props.selected2[i];
                let char = value.charCodeAt(0);
                if (char > 90) {
                    char += 6;
                    value = String.fromCharCode(char);
                }
                column.push(
                    <div id={'field2-'+(i+1).toString()}
                        className='field'
                        style={styles.middleField}>
                        <div id={'creature' + value}
                            className='creature2' 
                            onMouseDown={this.select}
                            style={styles.creatureBench2}>
                            <p id={'p' + value} style={styles.creatureText}>
                                {value}
                            </p>
                        </div>
                    </div>
                );
            }
        }
        if (column.length == 0) {
            column.push(
                <div style={styles.empty}>&nbsp;</div>
            );
        }
        return column;
    }

     
    render() {     
        let h = ((this.props.fitHeight * 150 - 16) + 8 * (this.props.fitHeight - 1)).toString() + 'px';

        return (
            <div id='fit' className='fit' onMouseDown={ev => {if (ev) ev.stopPropagation();}} onTouchStart={ev => {if (ev) ev.stopPropagation();}} style={{overflowY: 'scroll', height: h}}>
                <div className='break' style={styles.emptyField}/>
                <h2 className='title' style={styles.header}>
                    DOPASOWANIE
                </h2>
                <div className='break' style={styles.emptyField}/>

                <div key='columnsField' className="columns" style={{position: 'table', textAlign: 'center'}}>
                    <div id='columnCreature1'>
                        <div id='columnBench1' className='columnBench' style={styles.columnBench}>
                            <div style={styles.empty}>&nbsp;</div>
                        </div>
                        <div id='columnField1' className='columnField' style={styles.columnField}>
                            {this.createSecondColumn()}
                        </div>
                    </div>
                    <div id='columnCreature2'>
                        <div id='columnField2' className='columnField' style={styles.columnField}>
                            {this.createThirdColumn()}
                        </div>
                        <div id='columnBench2' className='columnBench' style={styles.columnBench}>
                            <div style={styles.empty}>&nbsp;</div>
                        </div>
                    </div>
                </div>           
            </div>
        );
    }
}             

export default FitViewer;
