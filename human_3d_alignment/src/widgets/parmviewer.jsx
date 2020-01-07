/*global Module*/
"use strict";

import React from 'react';
import Select from 'react-select';

const genders = [
    { value: 'empty', label: ' ' },
    { value: 'man', label: 'Mężczyzna' },
    { value: 'woman', label: 'Kobieta' }
];

const currentYear = new Date().getFullYear();

const years = [];
years.push({value: 'empty', label: ' '})
    
for (let i = 0; i < 120; i += 1) {
    years.push({ value: currentYear - i, label: currentYear - i });
}

const styles = {
    header: {
        display: 'table',
        width: '100%',
        height: '20px'
    },
    row: {
        display: 'table',
        width: '100%',
        tableLayout: 'fixed'
    },
    desc: {
        display: 'table-cell',
        textAlign: 'right',
        fontFamily: "'Fira Mono', Monaco, 'Andale Mono', 'Lucida Console', 'Bitstream Vera Sans Mono', 'Courier New', Courier, monospace", 
        webkitUserSelect : 'none', 
        mozUserSelect: 'none', 
        msUserSelect: 'none', 
        userSelect: 'none'
    },
    ind: {
        display: 'table-cell',
        width: '20px',
        webkitUserSelect : 'none', 
        mozUserSelect: 'none', 
        msUserSelect: 'none', 
        userSelect: 'none'
    },
    select: {
        fontFamily: "'Fira Mono', Monaco, 'Andale Mono', 'Lucida Console', 'Bitstream Vera Sans Mono', 'Courier New', Courier, monospace"
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
        
        return (
            <div>
                <div style={styles.header}/>
                <div className='age' style={styles.row}>
                    <span htmlFor="age" style={styles.desc}>Wiek</span>
                    <Select 
                        options={years}
                        onChange={this.props.handleChangeYear}
                        placeholder={'Wybierz rok urodzenia'}
                        display={'table-cell'}
                        height={'20px'} 
                        styles={styles.select}
                        noValidate
                    />
                    <div style={styles.ind}/>
                </div>
                <div className='gender' style={styles.row}>
                    <span htmlFor="gender" style={styles.desc}>Płeć</span>
                    <Select
                        options={genders}
                        onChange={this.props.handleChangeGender}
                        placeholder='Wybierz płeć'
                        display={'table-cell'}
                        height={'20px'}
                        styles={styles.select}
                        noValidate
                    />
                    <div style={styles.ind}/>
                </div>
            </div>
        );
    }
}                   

export default ParmViewer;
