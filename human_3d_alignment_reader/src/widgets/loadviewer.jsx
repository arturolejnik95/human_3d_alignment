/*global Module*/
"use strict";
import React from 'react';

const styles = {
    content: {
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
        fontFamily: "'Fira Mono', Monaco, 'Andale Mono', 'Lucida Console', 'Bitstream Vera Sans Mono', 'Courier New', Courier, monospace",
        border: '1px dashed black',
        padding: '50px',
        textAlign: 'center',
        verticalAlign: 'middle',
        fontSize: '20px'
    },
    loadButton: {
        width: '250px',
        height: '50px',
        fontSize: '28px',
        fontFamily: "'Fira Mono', Monaco, 'Andale Mono', 'Lucida Console', 'Bitstream Vera Sans Mono', 'Courier New', Courier, monospace",
    },
    buttonContent: {
        position: 'absolute',
        top: '75%',
        left: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%, -75%)',
        verticalAlign: 'middle',
        textAlign: 'center'
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
        
        this.handleFileSelect = this.handleFileSelect.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.addResult = this.addResult.bind(this);
    }

    addResult(line) {
        let array = line.split('|');

        if (array.length == 14) {
            this.props.addNewResult(array);
        }
    }

    handleFileSelect(evt) {
        evt.stopPropagation();
        evt.preventDefault();
    
        let files = evt.dataTransfer.files; // FileList object.
    
        // files is a FileList of File objects. List some properties.
        for (let i = 0; i < files.length; i++) {
            let f = files[i];
            // Only process csv files.

            if (!f.type == '*csv*') {
                continue;
            }
            let reader = new FileReader();

            reader.onload = ((theFile) => {
                return (e) => {
                    let content = e.target.result;
                    let lines = content.split('\n');
                    let head = "'User ID'|'User IP'|'Gender'|'Year of born'|'Start time'|'Stop time'|'Position of 1st'|'Position of 2nd'|'Rotation of 1st'|'Rotation of 2nd'|'ID 1st'|'ID 2nd'|'Fit'|'Result'";
                    console.log(lines[0]);
                    if (lines[0] == head) {
                        for (let i = 1; i < lines.length; i++) {
                            this.addResult(lines[i]);
                        }
                    } else {
                        alert('Plik ' + f.name + ' nie jest prawidłowym plikiem!');
                    }

                };
            })(f);

            reader.readAsText(f);
        }
    }
    
    handleDragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    }
    
      // Setup the dnd listeners.
    
     
    render() {
        return (
            <div id = 'end' style={{textAlign: 'center', position: 'relative', float: 'left', verticalAlign: 'middle', width: '100%', height: '100%'}}>
                <div id = "drop_zone" style = {styles.content} onDragOver = {(e) => {this.handleDragOver(e)}} onDrop = {(e) => {this.handleFileSelect(e)}}>
                    <p>Upuść pliki z rezultatami tutaj</p>
                </div>
                <div id = 'button_content' style = {styles.buttonContent}>
                    <button type='button' onClick={this.disable = true, this.props.onClickLoad} style={styles.loadButton}>
                        Start
                    </button>
                </div>
            </div>
        );
    }
}                          

export default EndViewer;
