/*global Module*/
"use strict";

/**
 * Static class containing tools for genotype parsing.
 */
class GenotypeParser {
    /**
     * Methods for checking if the given genotype is valid
     * @param {string} genotype input genotype
     * @returns {boolean} true if genotype is valid, false otherwise
     */
    static parseGeno(genotype) {
        //let genetics = new Module.PreconfiguredGenetics();
        let stringObj = new Module.SString();
        stringObj.set(genotype);
    
        let genoObj = new Module.Geno(stringObj);
        let result = genoObj.isValid();
        Module.destroy(genoObj);
        Module.destroy(stringObj);
        //Module.destroy(genetics);
        return result;
    }

    /**
     * HTML-ize genotype for syntax highlighting. The generated genotype is ready to use.
     * Based on Genman::HTMLize method from Framsticks SDK.
     * @param {string} genotype input genotype
     * @returns {string} HTML code that displays highlighted genotype code
     */
    static generateHighlights(genotype) {
        //let genetics = new Module.PreconfiguredGenetics();
        //let stringObj = new Module.SString();
        //stringObj.set(genotype);
        let resultObj = window.genetics.get_genman().HTMLize(genotype);
        let result = resultObj.c_str();
        //Module.destroy(resultObj);
        //Module.destroy(stringObj);
        //Module.destroy(genetics);
        return result;
    }

    /**
     * Method that parse genotype and returns Framsticks Model.
     * @param {string} genotype string code for Framsticks creature
     * @returns {Module.Model} Model from genotype, or undefined if genotype is not valid
     */
    static getModelFromGenotype(genotype) {
        //let genetics = new Module.PreconfiguredGenetics();
        let stringObj = new Module.SString();
        stringObj.set(genotype);
        let genoObj = new Module.Geno(stringObj);
        if (!genoObj.isValid()) {
            Module.destroy(stringObj);
            Module.destroy(genoObj);
            //Module.destroy(genetics);
            return; //undefined
        }
        let model = new Module.Model(genoObj, true);
        Module.destroy(stringObj);
        Module.destroy(genoObj);
        //Module.destroy(genetics);
        return model;
    }
}

export default GenotypeParser;