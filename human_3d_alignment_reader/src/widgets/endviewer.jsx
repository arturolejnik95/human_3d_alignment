/*global Module*/
"use strict";
import React from 'react';

const styles = {
    content: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        top: '50%',
        textAlign: 'center',
        fontSize: '30px',
        fontFamily: "'Fira Mono', Monaco, 'Andale Mono', 'Lucida Console', 'Bitstream Vera Sans Mono', 'Courier New', Courier, monospace"
    }
}

/**
 * Component for assesing genotypes matching.
 */
class EndViewer extends React.Component {
    /**
     * Basic constructor.
     * @param {any} props properties of Component
     */
    constructor(props) {
        super(props);
        this.props = props;
    }
    
     
    render() {

        return (
            <div id = 'end' style={styles.content}>
                <div style={{fontFamily: "'Fira Mono', Monaco, 'Andale Mono', 'Lucida Console', 'Bitstream Vera Sans Mono', 'Courier New', Courier, monospace"}}>Koniec</div>
            </div>
        );
    }
}                          

export default EndViewer;
