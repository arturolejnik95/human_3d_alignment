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
        fontSize: '30px'
    },
    text: {
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
        
        this.download = this.download.bind(this);
    }

    download(type) {
        let file = new Blob([this.props.result], {type: type});
        let filename = this.props.userId + '.csv';
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        else { // Others
            let a = document.createElement("a"),
                    url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);  
            }, 1500); 
        }
    }    
     
    render() {

        return (
            <div id = 'end' style={styles.content}>
                <div style={styles.text}>Dziękujemy za udział w badaniu!</div>
                <div>
                    <button styles={styles.text} onClick={() => {this.download('text/plain')}}>Pobierz wyniki</button>
                </div>
            </div>
        );
    }
}                          

export default EndViewer;
