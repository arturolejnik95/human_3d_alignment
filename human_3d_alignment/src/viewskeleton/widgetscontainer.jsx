"use strict";
import React from 'react';
import { WidthProvider, Responsive} from 'react-grid-layout';
import _ from 'lodash';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

/**
 * Component holding all widgets of Framsticks-JS. It bases on 'react-grid-layout'
 * component, making it possible to create mini-windows within website.
 */
class WidgetsContainer extends React.Component {
    /**
     * Creates instance of WidgetsContainer. It starts in the beginning with no 
     * items. To add items you need to explicitly call object method addItem 
     * with React.Component.
     * @param {any} props Basic props for React Components
     */
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            widgetCounter: 0,
        };
        this.props = props;
        //this.onAddItem = this.onAddItem.bind(this);
        this.onBreakpointChange = this.onBreakpointChange.bind(this);
        this.onLayoutChange = this.onLayoutChange.bind(this);
    }

    /**
     * Initializes references.
     */
    componentDidMount() {
        this.props.onRef(this);
    }

    /**
     * Unmounts references
     */
    componentWillUnmount() {
        this.props.onRef(void 0);
    }

    /**
     * Creates widgets in Framsticks-JS. It is strictly internal method for
     * this Component and should not be called outside. It is used in
     * render() function. It holds default styles for widgets windows.
     * @param {React.Component} el widget to be added to board
     * @returns {JSX.Element} new widget
     */
    createElement(el) {
        const headerStyle = {
            right: "2px",
            marginRight: "10px",
            top: 0,
            cursor: "pointer",
        };
        const content = el.content ? el.content : "none";
        let gridStyle = {
            backgroundColor: '#AAAAAA',
            display: 'table',
            padding: 0,
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        };
        return (
            <div key={el.i} data-grid={el} style={gridStyle}>
                {/* <span className="text" style={gridStyle}>{el.content}</span> */}
                <div style={{display: 'table-row', textAlign: 'right'}}>
                <span
                    className="header"
                    style={headerStyle}
                > </span>
                </div>
                <div style={{display: 'table-row', height: '100%'}}>
                    {content}
                </div>
            </div>
        );
    }

    /**
     * Adds new React.Component to Framsticks-JS board. This method should
     * be used externally instead of createElement to add new element. It
     * holds and remembers newly added components.
     * @param {React.Component} item new widget to be added to board
     * @param {string} name name of used component, useful for remembering layout
     * @param {number} x OX position of widget
     * @param {number} y OY position of widget
     * @param {number} w width of widget
     * @param {number} h height of widget
     * @example <caption>Example of using addItem with GenoChecker widget</caption>
     * this.widgetscontainer.addItem(<GenoChecker />);
     */
    addItem(item, name, x=0, y=Infinity, w=2, h=2) {
        this.setState({
            items: this.state.items.concat({
                i: ""+this.state.widgetCounter+","+name,
                content: item,
                //x: (this.state.items.length) % (this.state.cols || 12),
                //y: Infinity,
                x: x,
                y: y,
                w: w,
                h: h
            }),
            widgetCounter: this.state.widgetCounter+1,
        });
    }

    /**
     * Uses list of layout items to be distributed on site.
     * @param {any} layoutitems list of items.
     */
    addMultipleItems(layoutitems) {
        this.setState({
            items: layoutitems,
            widgetCounter: layoutitems.length
        });
    }

    /**
     * Method implemented for responsive behaviour of 'react-grid-layout'.
     * @param {any} breakpoint new breakpoint for layout
     * @param {any} cols new number of columns in grid
     */
    onBreakpointChange(breakpoint, cols) {
        this.setState({
            breakpoint: breakpoint,
            cols: cols
        });
    }

    /**
     * Event running on change of 'react-grid-layout' Component.
     * @param {any} layout layout which should be selected next
     */
    onLayoutChange(layout) {
        if (this.props.onLayoutChange) this.props.onLayoutChange(layout);
        //this.props.onLayoutChange(layout);
        this.setState({layout: layout});
    }

    /**
     * This events run on removing i-th item in 'react-grid-layout'.
     * @param {number} i id of item to be removed
     */
    onRemoveItem(i) {
        this.setState({items: _.reject(this.state.items, {i:i})});
    }

    /**
     * WidgetsContainer render method.
     * @returns {JSX.Element} WidgetsContainer
     */
    render() {
        return (
            <div>
                <ResponsiveReactGridLayout
                    layout={this.state.layout}
                    onLayoutChange={this.onLayoutChange}
                    onBreakpointChange={this.onBreakpointChange}
                    cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                    rowHeight={150}
                    className="layout"
                    {...this.props}
                >
                    {_.map(this.state.items, el=>this.createElement(el))}
                </ResponsiveReactGridLayout>
            </div>
        );
    }
}

export default WidgetsContainer;