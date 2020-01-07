"use strict";
import React from 'react';
import update from 'immutability-helper';

const styles = {
    root: {
        fontFamily: '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
        fontWeight: 300,
    },
    header: {
        width: '100%',
        backgroundColor: 'black',
        color: 'white',
        padding: '16px 0px 16px 0px',
        fontSize: '1.5em',
    }
};

/**
 * Class for rendering main top panel of Framsticks.JS site.
 */
class TitlePanel extends React.Component {
    /**
     * Basic constructor for TitlePanel
     * @param {any} props props for titlepanel
     */
    constructor(props) {
        super(props);
        this.rootStyle = props.style ? update(styles.root, {$merge: props.style}) : styles.root;
    }

    /**
     * Render method
     * @returns {JSX.Element} new title panel
     */
    render() {
        return (
        <div style={this.rootStyle}>
            <div style={styles.header}>{this.props.title}</div>
            {this.props.children}
        </div>
        );
    }
}

export default TitlePanel;