/*global Module*/
"use strict";

import React from 'react';

const styles = {
    header: {
        display: 'table',
        letterSpacing: '5px',
        width: '100%',
        height: '20px',
        textAlign: 'center',
        fontFamily: "'Fira Mono', Monaco, 'Andale Mono', 'Lucida Console', 'Bitstream Vera Sans Mono', 'Courier New', Courier, monospace"
    },
    desc: {
        display: 'table-cell',
        textAlign: 'right'
    },
    ind: {
        display: 'table-cell',
        width: '20px'
    }, 
    small_interval: {
        display: 'table',
        width: '100%',
        height: '5px'
    },
    interval: {
        display: 'table',
        width: '100%',
        height: '20px'
    },
    big_interval: {
        display: 'table',
        width: '100%',
        height: '30px'
    },
    text1: {
        fontFamily: "'Fira Mono', Monaco, 'Andale Mono', 'Lucida Console', 'Bitstream Vera Sans Mono', 'Courier New', Courier, monospace", 
        fontSize: '16px',
        marginLeft: '50px',
        width: '30%'
    },
    text2: {
        fontFamily: "'Fira Mono', Monaco, 'Andale Mono', 'Lucida Console', 'Bitstream Vera Sans Mono', 'Courier New', Courier, monospace", 
        fontSize: '16px',
        width: '30%',
    },
    row: {
        width: '100%',
        display: 'flex'
    }
}

/**
 * Component for adding user parameters
 */
class ParmViewer extends React.Component {
    /**
     * Basic constructor.
     * @param {any} props properties of Component
     */
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {};
    }
     
    render() {
        let gender = '';

        if (this.props.gender == "man") {
            gender = 'Mężczyzna';
        } else if (this.props.gender == "woman") {
            gender = "Kobieta";
        }

        let genotypes = this.props.id1 + '\t' + this.props.id2;
        let percent = this.props.percent + '%'


        
        return (
            <div onMouseDown={ev => {if (ev) ev.stopPropagation();}} onTouchStart={ev => {if (ev) ev.stopPropagation();}}>
                <div style={styles.interval}/>
                <h2 className='title' style={styles.header}>
                    INFORMACJE
                </h2>
                <div style={styles.big_interval}/>
                <div style={styles.row}>
                    <div style={styles.text1}>
                        Genotypy: 
                    </div>
                    <div style={styles.text2}>
                        {genotypes}
                    </div>
                </div>
                <div style={styles.interval}/>
                <div style={styles.row}>
                    <div style={styles.text1}>
                        ID: 
                    </div>
                    <div style={styles.text2}>
                        {this.props.userId}
                    </div>
                </div>
                <div style={styles.small_interval}/>
                <div style={styles.row}>
                    <div style={styles.text1}>
                        IP: 
                    </div>
                    <div style={styles.text2}>
                        {this.props.userIp}
                    </div>
                </div>
                <div style={styles.interval}/>
                <div style={styles.row}>
                    <div style={styles.text1}>
                        Płeć: 
                    </div>
                    <div style={styles.text2}>
                        {gender}
                    </div>
                </div>
                <div style={styles.small_interval}/>
                
                <div style={styles.row}>
                    <div style={styles.text1}>
                        Rok urodzenia: 
                    </div>
                    <div style={styles.text2}>
                        {this.props.year}
                    </div>
                </div>
                <div style={styles.interval}/>
                <div style={styles.row}>
                    <div style={styles.text1}>
                        Czas startu: 
                    </div>
                    <div style={styles.text2}>
                        {this.props.timeStart}
                    </div>
                </div>
                <div style={styles.small_interval}/>
                <div style={styles.row}>
                    <div style={styles.text1}>
                        Czas końca: 
                    </div>
                    <div style={styles.text2}>
                        {this.props.timeStop}
                    </div>
                </div>
                <div style={styles.interval}/>
                <div style={styles.row}>
                    <div style={styles.text1}>
                        Podobieństwo: 
                    </div>
                    <div style={styles.text2}>
                        {percent}
                    </div>
                </div>
            </div>
        );
    }
}                   

export default ParmViewer;
