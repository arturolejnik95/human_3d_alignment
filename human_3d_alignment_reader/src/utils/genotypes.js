/*global Module*/
"use strict";

/**
 * Class to keep genotypes data
 */
class Genotypes {

    /**
     * Default constructor for genotypes object
     * @param {string} path path to .gen file with genotypes
     */
    constructor(obj, path) {
        this.parent = obj;
        this.loaded = false;
        this.id = [];
        this.name = [];
        this.genotype = [];
        this.readGenotypesFromFile(path);
        
    }

    /**
     * Read genotypes from genotypes.gen file
     * @param {string} file path to genotypes.gen
     */
    readGenotypesFromFile(file) {
        let rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, true);
        rawFile.onload = (e) => {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200) {
                    this.readGenotypesFromText(rawFile.responseText);
                } else {
                    console.error(rawFile.statusText);
                }
            }
        };
        rawFile.onerror = (e) => {
            console.error(rawFile.statusText);
        };
        rawFile.send(null);
    }

    /**
     * Read genotypes from readed text from genotypes.gen
     * @param {string} text 
     */
    readGenotypesFromText(text) {
        let textTable = text.split('org:\n');
        let i = 1;
        while (i < textTable.length) {
            let lines = textTable[i].split('\n');
            if (lines[0].includes('name:')) {
                let j = 0;
                let gen = '';
                let name = '';
                let id = '';
                while (j < lines.length) {
                    if (lines[j].includes('name:')) {
                        name += lines[j].split(':')[1];
                    } else if (lines[j].includes('genotype:')) {
                        gen += lines[j].replace('genotype:', '');
                        let k = j + 1;
                        while (!lines[k].includes('info_timestamp:')) {
                            if (lines[k] != '\n') {
                                gen += ' ' + lines[k];
                            } else {
                                gen += ' '
                            }
                            k++;
                        }
                        gen = gen.split('~').join('');
                    } else if (lines[j].includes('num:')) {
                        id += lines[j].split(':')[1];
                    }
                    j++;
                }
                if (!gen.includes('//0')) {
                    this.name.push(name);
                    this.genotype.push(gen);
                    this.id.push(id);
                }
            }

            i++;
        }
        this.loaded = true;
        this.parent.start();
    }

}


export default Genotypes;