/*global Module*/
"use strict";
import React from 'react';

const styles = {
    content: {
        position: 'absolute',
        margin: '10px 10px 10px 10px',
        height: '100%',
        verticalAlign: 'sub',
        textAlign: 'justify'
    }
}

/**
 * Component for assesing genotypes matching.
 */
class TextViewer extends React.Component {
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
            <div style={styles.content}>
                Dopasuj (nałóż na siebie) oba modele jak najlepiej, wedle własnej opinii, przesuwając je i obracając za pomocą myszy. Potem po prawej stronie okienka przypisz każdy wierzchołek jednego modelu (cyferki) najlepiej odpowiadającemu (wedle własnej opinii) wierzchołkowi drugiego modelu (literki).
            </div>
        );
    }
}                          

export default TextViewer;
