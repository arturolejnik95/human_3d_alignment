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
        width: '50px', 
        height: '50px', 
        fontSize: '30px',
        pointerEvent: 'none',
        fontFamily: "'Fira Mono', Monaco, 'Andale Mono', 'Lucida Console', 'Bitstream Vera Sans Mono', 'Courier New', Courier, monospace",
    },
    creatureBench1: { 
        position: 'relative', 
        border: '2px solid black', 
        color: 'white', 
        backgroundColor: 'red',
        width: '50px', 
        height: '50px', 
        fontSize: '30px',
        pointerEvents: 'none',
        fontFamily: "'Fira Mono', Monaco, 'Andale Mono', 'Lucida Console', 'Bitstream Vera Sans Mono', 'Courier New', Courier, monospace",
    },
    creatureBench2: { 
        position: 'relative', 
        border: '2px solid black', 
        color: 'white', 
        backgroundColor: 'blue',
        width: '50px', 
        height: '50px', 
        fontSize: '30px',
        pointerEvents: 'none',
        fontFamily: "'Fira Mono', Monaco, 'Andale Mono', 'Lucida Console', 'Bitstream Vera Sans Mono', 'Courier New', Courier, monospace",
    },
    middleField:{
        position: 'relative', 
        color: 'gray', 
        backgroundColor: 'gray',
        width: '54px',
        height: '54px',
        webkitUserSelect: 'none',
        mozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none'
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
    },
    cell: {
        display: 'table-cell'
    },
    row: {
        display: 'table-row',
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
            height: 2,
            choosed: ' ',
            initialX: 0,
            initialY: 0
        }
        
        this.createSecondRow = this.createSecondRow.bind(this);
        this.createThirdRow = this.createThirdRow.bind(this);
        this.createFourthRow = this.createFourthRow.bind(this);
        this.select = this.select.bind(this);
    }

    select(e) {
        let item = null;
        let index;

        for (let i = 0; i < this.props.parts1; i++) {
            let index2 = (i+1).toString();
            let itemD = document.querySelector('#creature' + index2);
            let itemP = document.querySelector('#p' + index2);
            if (e.target === itemD || e.target === itemP) {
                item = null;
                index = index2;
                item = document.querySelector('#creature' + index);
            }
        }

        for (let i = 0; i < this.props.parts2; i++) {
            let index2 = '';
            if (i + 1 + 64 > 90) {
                index2 = String.fromCharCode(i + 1 + 70);
            } else {
                index2 = String.fromCharCode(i + 1 + 64);
            }     
            let itemD = document.querySelector('#creature' + index2);
            let itemP = document.querySelector('#p' + index2);
            if (e.target === itemD || e.target === itemP) {
                item = null;
                index = index2;
                item = document.querySelector('#creature' + index);
            }
        }

        if (this.state.choosed != ' ') {
            if (!item) {
                if (!isNaN(this.state.choosed)) {
                    for (let i = 0; i < Math.min(this.props.parts1, this.props.parts2); i++) {
                        let index2 = (i+1).toString();
                        let itemD =  document.querySelector('#field1-' + index2);

                        
                        if (e.target === itemD) {
                            let index3 = this.props.selected1.indexOf(this.state.choosed);

                            if (index3 > -1) {
                                this.props.handleChangeSelected(1, index3, ' ');
                            }
                            this.props.handleChangeSelected(1, i, this.state.choosed);
                        }
                    }
                } else {
                    for (let i = 0; i < Math.min(this.props.parts1, this.props.parts2); i++) {
                        let index2 = (i+1).toString();
                        let itemD =  document.querySelector('#field2-' + index2);

                        
                        if (e.target === itemD) {

                            let temp = this.state.choosed;
                            if (this.state.choosed.charCodeAt(0) > 90) {
                                temp = String.fromCharCode(temp.charCodeAt(0) - 6);
                            }

                            let index3 = this.props.selected2.indexOf(temp);

                            if (index3 > -1) {
                                this.props.handleChangeSelected(2, index3, ' ');
                            }
                            this.props.handleChangeSelected(2, i, this.state.choosed);
                        }
                    }
                }
                this.setState({ choosed: ' ' }, function() {
                    console.log(this.state.choosed);
                });

            } else {
                let item2 = document.querySelector('#creature' + this.state.choosed);
                if ((item.parentNode.parentNode.parentNode.className == 'rowField' || item.parentNode.parentNode.parentNode.className == 'rowBench') &&
                    (item2.parentNode.parentNode.parentNode.className == 'rowField' || item2.parentNode.parentNode.parentNode.className == 'rowBench')) {
                    let nr = 0;
                    let index1 = 0;
                    let index2 = 0;
                    let temp = this.state.choosed;
                    if (this.state.choosed.charCodeAt(0) > 90) {
                        temp = String.fromCharCode(temp.charCodeAt(0) - 6);
                    }
                    if (!isNaN(this.state.choosed)) {
                        nr = 1;
                        index1 = this.props.selected1.indexOf(this.state.choosed);
                        index2 = this.props.selected1.indexOf(index);
                    } else {
                        nr = 2;
                        let temp1 = this.state.choosed;
                        let temp2 = index;
                        if (this.state.choosed.charCodeAt(0) > 90) {
                            temp1 = String.fromCharCode(temp1.charCodeAt(0) - 6);
                        }
                        if (index.charCodeAt(0) > 90) {
                            temp2 = String.fromCharCode(temp2.charCodeAt(0) - 6);
                        }

                        index1 = this.props.selected2.indexOf(temp);
                        index2 = this.props.selected2.indexOf(temp2);
                    }
                    this.props.handleChangeSelected(nr, index1, index);
                    this.props.handleChangeSelected(nr, index2, this.state.choosed);

                    this.setState({ choosed: ' ' }, function() {
                        console.log(this.state.choosed);
                    });
                } else {
                    if (item.parentNode.parentNode.parentNode.parentNode === item2.parentNode.parentNode.parentNode || 
                        item.parentNode.parentNode.parentNode === item2.parentNode.parentNode.parentNode.parentNode) {
                        let nr = 0;
                        let index1 = 0;
                        let index2 = 0;
                        if (!isNaN(this.state.choosed)) {
                            nr = 1;
                            index1 = this.props.selected1.indexOf(this.state.choosed);
                            index2 = this.props.selected1.indexOf(index);
                        } else {
                            nr = 2;
                            let temp = this.state.choosed;
                            let temp2 = index;
                            if (this.state.choosed.charCodeAt(0) > 90) {
                                temp = String.fromCharCode(temp.charCodeAt(0) - 6);
                            }
                            if (index.charCodeAt(0) > 90) {
                                temp2 = String.fromCharCode(temp2.charCodeAt(0) - 6);
                            }
                            index1 = this.props.selected2.indexOf(temp);
                            index2 = this.props.selected2.indexOf(temp2);
                        }
                        this.props.handleChangeSelected(nr, index1, index);
                        this.props.handleChangeSelected(nr, index2, this.state.choosed);
                        this.setState({ choosed: ' ' }, function() {
                            console.log(this.state.choosed);
                        });
                    } else {
                        this.setState({ choosed: index }, function() {
                            console.log(this.state.choosed);
                        });
                    }
                }
            }
        } else {
            if (item != null) {
                this.setState({ choosed: index }, function() {
                    console.log(this.state.choosed);
                });
            }
        }
    }

    createSecondRow() {
        let row = []
        let len = Math.min(this.props.parts1, this.props.parts2);
        for (let i = 0; i < len; i++) {        
            if (this.props.selected1[i] != ' ') {
                if (this.props.selected1[i] && this.state.choosed == this.props.selected1[i]) {   
                    row.push(
                        <div id={'cell'+(i+1).toString()} className='cell' style={styles.cell}>
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
                        </div>
                    );
                } else {
                    row.push(
                        <div id={'cell'+(i+1).toString()} className='cell' style={styles.cell}>
                            <div id={'field1-'+(i+1).toString()} 
                                className='field'
                                style={styles.middleField}>
                                <div id={'creature' + this.props.selected1[i]} 
                                    className='creature1' 
                                    onMouseDown={this.select}
                                    style={styles.creatureBench}>
                                    <p id={'p' + this.props.selected1[i]} style={styles.creatureText}>
                                        {this.props.selected1[i]}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                }
            } else {
                row.push(
                    <div id='cellnull' className='cell' style={styles.cell}>
                        <div id={'field1-'+(i+1).toString()} 
                            onMouseDown = {this.select}
                            className='field'
                            style={styles.middleField}>
                            &nbsp;
                        </div>
                    </div>
                );
            }    
        }
        if (row.length == 0) {
            row.push(
                <div style={styles.empty}>&nbsp;</div>
            );
        }
        return row;
    }

    createThirdRow() {
        let row = [];
        let len = Math.min(this.props.parts1, this.props.parts2);
        for (let i = 0; i < len; i++) {  
            if (this.props.selected2[i] && this.props.selected2[i] != ' ') { 
                let value = this.props.selected2[i];
                let char = value.charCodeAt(0);
                if (char > 90) {
                    char += 6;
                    value = String.fromCharCode(char);
                }
                if (this.state.choosed == value) {    
                    row.push(
                        <div id={'cell'+(i+1).toString()} className='cell' style={styles.cell}>
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
                        </div>
                    );
                } else {
                    row.push(
                        <div id={'cell'+(i+1).toString()} className='cell' style={styles.cell}>
                            <div id={'field2-'+(i+1).toString()}
                                className='field'
                                style={styles.middleField}>
                                <div id={'creature' + value} 
                                    className='creature2' 
                                    onMouseDown={this.select}
                                    style={styles.creatureBench}>
                                    <p id={'p' + value} style={styles.creatureText}>
                                        {value}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                }
            } else {
                row.push(
                    <div id='cellnull' className='cell' style={styles.cell}>
                        <div id={'field2-'+(i+1).toString()} 
                            onMouseDown = {this.select}
                            className='field'
                            style={styles.middleField}>
                        </div>
                    </div>
                );
            }
        }
        if (row.length == 0) {
            row.push(
                <div style={styles.empty}>&nbsp;</div>
            );
        }
        return row;
    }

    createFourthRow() {
        let row = [];
        for (let i = 0; i < this.props.parts2; i++) {
            let idtext = '';
            let idtext1 = String.fromCharCode(i + 1 + 64);
            if (i + 1 + 64 >= 91) {
                idtext = String.fromCharCode(i  + 1 + 70);
            } else {
                idtext = idtext1;
            }

            if (this.props.selected2.indexOf(idtext1) < 0) {
                if (this.state.choosed == idtext) {
                    row.push(
                        <div id={'cell'+idtext} className='cell' style={styles.cell}>
                            <div id={'creature' + idtext} 
                                className='creature2' 
                                onMouseDown={this.select}
                                style={styles.creatureBench2}>
                                <p id={'p' + idtext} style={styles.creatureText}>
                                    {idtext}
                                </p>
                            </div>
                        </div>
                    );
                } else {
                    row.push(
                        <div id={'cell'+idtext} className='cell' style={styles.cell}>
                            <div id={'creature' + idtext}
                                className='creature2' 
                                onMouseDown={this.select}
                                style={styles.creatureBench}>
                                <p id={'p' + idtext} style={styles.creatureText}>
                                    {idtext}
                                </p>
                            </div>
                        </div>
                    );
                }
            }
        }
        if (row.length == 0) {
            row.push(
                <div id='cellnull' className='cell' style={styles.cell}>
                    <div style={styles.empty}>&nbsp;</div>
                </div>
            );
        }
        return row;
    }
     
    render() {     
        let h = ((this.props.fitHeight * 150 - 16) + 8 * (this.props.fitHeight - 1)).toString() + 'px';
        let w = ((this.props.fitWidth * 150 - 16) + 8 * (this.props.fitWidth - 1)).toString() + 'px';

        return (
            <div id='fit' className='fit' onMouseDown={ev => {if (ev) ev.stopPropagation();}} onTouchStart={ev => {if (ev) ev.stopPropagation();}} style={{position: 'relative', width: w, height: h, whiteSpace: 'no-wrap', overflow: 'auto'}}>
                <h2 className='title' style={styles.header}>
                    DOPASOWANIE
                </h2>

                <div key='rowsFields' onMouseDown = {this.select} className="rows" style={{display: 'table', borderCollapse: 'separate', borderSpacing: '15px'}}>
                    <div id='rowCreature1' onMouseDown = {this.select}>
                        <div id='rowField1' className='rowField' onMouseDown = {this.select} style={styles.row}>
                            {this.createSecondRow()}
                        </div>
                    </div>
                    <div id='rowCreature2'>
                        <div id='rowField2' className='rowField' onMouseDown = {this.select} style={styles.row}>
                            {this.createThirdRow()}
                        </div>
                        <div id='rowBench2' className='rowBench' onMouseDown = {this.select} style={styles.row}>
                            {this.createFourthRow()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FitViewer;