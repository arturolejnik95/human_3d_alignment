/*global Module*/
"use strict";
import http from 'http';
import React from 'react';
import Genotypes from './utils/genotypes';
import TitlePanel from './viewskeleton/titlepanel';
import WidgetsContainer from './viewskeleton/widgetscontainer';
import TextViewer from './widgets/textviewer';
import ParmViewer from './widgets/parmviewer';
import SimilViewer from './widgets/similviewer';
import FitViewer from './widgets/fitviewer';
import SliderViewer from './widgets/sliderviewer';
import EndViewer from './widgets/endviewer';

const ROUNDS = 15;

const styles = {
    contentHeaderMenuLink: {
        textDecoration: 'none',
        color: 'white',
        padding: 8,
    },
    content: {
        padding: '16px',
    },
    sidebarLink: {
        display: 'block',
        padding: '16px 0px',
        color: 'gray',
        textDecoration: 'none',
    },
    divider: {
        margin: '8px 0',
        height: 1,
        backgroundColor: 'gray',
    },
};


/**
 * Main class running Framsticks.JS page.
 */
class MainView extends React.Component {
    /**
     * Basic constructor holding informations about sidebar states
     * @param {any} props component properties
     */
    constructor(props) {
        super(props);
        this.onLayoutChange = this.onLayoutChange.bind(this);

        window.genetics = new Module.PreconfiguredGenetics();
        this.layout = [
            {name:'0,textviewer', x: 0, y: 0, w: 9, h: 1},
            {name:'2,similviewer', x: 0, y: 1, w: 6, h: 4},
            {name:'3,fitviewer', x: 6, y: 1, w: 6, h: 2},
            {name:'4,sliderviewer', x: 6, y: 3, w: 6, h: 2},
            {name:'1,parmviewer', x: 9, y: 0, w: 3, h: 1}
        ];

        this.container = <WidgetsContainer onRef={ref => (this.widgetscontainer = ref)} onLayoutChange={this.onLayoutChange} />;

        this.state = {
            genotypes: 0,
            round: 0,
            genotype1: '',
            genotype2: '',
            pairs: [],
            id1: 0,
            id2: 0,
            parts1: 0,
            parts2: 0,
            selected1: [],
            selected2: [],
            position1: [0, 0, 0],
            position2: [0, 0, 0],
            rotation1: [0, 0, 0],
            rotation2: [0, 0, 0],
            userId: 0,
            userIp: 'localhost',
            timeStart: 0,
            selectedGender: {value: "empty", label: " "},
            selectedYear: {value: "empty", label: " "},
            percent: 0,
            sliderUpdated: true,
            isDisable: true,
            isFinished: false,
            fitHeight: 2,
            fitWidth: 6,
            controlMode: 'translate',
            blockView: true,
            result: ''
        };

        this.start = this.start.bind(this);
        this.getIp = this.getIp.bind(this);
        this.nextRound = this.nextRound.bind(this);
        this.saveRound = this.saveRound.bind(this);
        this.saveFit = this.saveFit.bind(this);
        this.refresh = this.refresh.bind(this);
        this.sendToServer = this.sendToServer.bind(this);
        this.finishApp = this.finishApp.bind(this);
        this.isReady = this.isReady.bind(this);
        this.isFitted = this.isFitted.bind(this);
        this.browserData = this.browserData.bind(this);
        this.loadNewGenotypes = this.loadNewGenotypes.bind(this);
        this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
        this.handleChangeId = this.handleChangeId.bind(this);
        this.handleChangeIp = this.handleChangeIp.bind(this);
        this.handleChangeGender =  this.handleChangeGender.bind(this);
        this.handleChangeYear = this.handleChangeYear.bind(this);
        this.handleChangePercent = this.handleChangePercent.bind(this);
        this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
        this.handleChangeFitHeight = this.handleChangeFitHeight.bind(this);
        this.handleChangeFitWidth = this.handleChangeFitWidth.bind(this);
        this.handleChangeControlMode = this.handleChangeControlMode.bind(this);
        this.handleChangePosition1 = this.handleChangePosition1.bind(this);
        this.handleChangePosition2 = this.handleChangePosition2.bind(this);
        this.handleChangeRotation1 = this.handleChangeRotation1.bind(this);
        this.handleChangeRotation2 = this.handleChangeRotation2.bind(this);
        this.handleChangeBlockView = this.handleChangeBlockView.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
        this.onClickFinish = this.onClickFinish.bind(this);
    }

    /** 
     * Uses default layout.
    */
    componentDidMount() {
        window.addEventListener( 'keydown', ( event ) => {
            switch ( event.keyCode ) {
                case 84: // T
                    this.handleChangeControlMode( "translate" );
                    break;
                case 82: // R
                    this.handleChangeControlMode( "rotate" );
                    break;
            }
        } );
        let timeStart = new Date();
        this.handleChangeStartTime(timeStart); //set time start
        this.handleChangeId(  Math.round(timeStart.getTime() / 1000).toString() +  (Math.floor(Math.random() * (9999999 - 1000000 + 1) ) + 1000000).toString() + this.browserData().toString() ); //set user id = time + random + browserData_hash
        this.getIp();   //set user ip
        this.genotypes = new Genotypes(this, "https://raw.githubusercontent.com/arturolejnik95/human_3d_alignment/master/walking.gen");   //load text from file to this.genotypes
        let head = "'User ID'|'User IP'|'Gender'|'Year of born'|'Start time'|'Stop time'|'Position of 1st'|'Position of 2nd'|'Rotation of 1st'|'Rotation of 2nd'|'ID 1st'|'ID 2nd'|'Fit'|'Result'\n"
        this.handleChangeResult(head);
    }

    /** 
     * Calls resize event in order to properly set layout
    */
    componentDidUpdate() {
        //window.dispatchEvent(new Event('resize'));
        if (this.state.genotype1 != '' && this.state.genotype2 != '') {
            this.useLayout(this.layout);
        }
    }


    /**
     * Start questionnaire if genotypes are loaded
     */
    start() {
        this.setState({ genotypes: this.genotypes.id.length }, function() {
            console.log(`Genotypes: `, this.state.genotypes);
        });

        this.loadNewGenotypes();
        this.handleChangeBlockView(false);
        this.useLayout(this.layout);
    }

    getIp() {
        http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, (resp) => {
            resp.on('data', ip => {
                this.handleChangeIp(ip)
            });
        });
    }

    /**
     * Save data about this round
     */
    saveRound() {
        this.setState({ sliderUpdated: false }, function() {
            console.log('Slider Updated: ' + this.state.sliderUpdated);
        });
        this.isReady();
    }

    /**
     * Preset result as:
     * user ID - IP - gender - year of born - start : end - position of 1. : position of 2.
     * - rotation of 1. : rotation of 2. - id of 1. : id of second - pairs (1. mesh : 2. mesh) - fit result (0 - 100) ;
     */
    saveFit() {
        let min = Math.min(this.state.parts1, this.state.parts2);
        let timeStop = new Date();
        let start = this.state.timeStart;
        let stop = timeStop;
        start = ("0" + start.getDate()).slice(-2) + '.' + ("0" + (start.getMonth() + 1)).slice(-2) + '.' + start.getFullYear() + ' ' + String(start.getHours()).padStart(2, '0') + ':' + String(start.getMinutes()).padStart(2, '0') + ':' + String(start.getSeconds()).padStart(2, '0');
        stop = ("0" + stop.getDate()).slice(-2) + '.' + ("0" + (stop.getMonth() + 1)).slice(-2) + '.' + stop.getFullYear() + ' ' + String(stop.getHours()).padStart(2, '0') + ':' + String(stop.getMinutes()).padStart(2, '0') + ':' + String(stop.getSeconds()).padStart(2, '0');

        let fit =   this.state.userId + '|' +
                    this.state.userIp + '|' +
                    this.state.selectedGender.value + '|' +
                    this.state.selectedYear.value + '|' +
                    start + '|' +
                    stop + '|' +
                    '(' + this.state.position1[0] + ',' + this.state.position1[1] + ',' + this.state.position1[2] + ')|' +  
                    '(' + this.state.position2[0] + ',' + this.state.position2[1] + ',' + this.state.position2[2] + ')|' +  
                    '(' + this.state.rotation1[0] + ',' + this.state.rotation1[1] + ',' + this.state.rotation1[2] + ')|' +  
                    '(' + this.state.rotation2[0] + ',' + this.state.rotation2[1] + ',' + this.state.rotation2[2] + ')|';  
                    
        
        let pair = this.state.pairs[this.state.pairs.length - 1];
        fit = fit + this.genotypes.id[pair[0]] + '|' + this.genotypes.id[pair[1]] + '|';

        for (let i = 0; i < min; i++) {
            fit = fit + this.state.selected1[i] + ':' + (this.state.selected2[i].charCodeAt(0) - 65 + 1);
            if (i < min - 1) {
                fit = fit + ';';
            }
        }
        fit = fit + '|' + this.state.percent + '\n';

        this.sendToServer(fit);

        this.handleChangeResult(this.state.result + fit);
        this.handleChangeStartTime(timeStop);
    }



    sendToServer(fit) {
        let rawFile = new XMLHttpRequest();
        rawFile.addEventListener('load', () => {
            console.log(rawFile.responseText);
        });
        rawFile.addEventListener('error', () => {
            console.log('Błąd wysyłania na serwer');
        });
        
        rawFile.open("POST", 'https://ptsv2.com/t/b7nhq-1578108725/post');
        rawFile.setRequestHeader("Content-type", 'text/plain');
        rawFile.send(fit);
    }

    /**
     * Load next pair of genotypes
     */
    nextRound() {
        this.loadNewGenotypes();
        this.handleChangeBlockView(false);
    }

    /**
     * Refresh used default layout
     */
    refresh() {
        this.useLayout(this.layout);
    }

    /**
     * Load new genotypes to simulator viewer 
     */
    loadNewGenotypes() {
        //Firstly it chooses pair of genotypes that user doesnt used before
        let rand1, rand2, amount1, amount2, gen1, gen2;

        do {
            rand1 = 0, rand2 = 0;
            do  {
                while (rand1 == rand2) {
                    rand1 = Math.floor(Math.random() * this.state.genotypes);
                    rand2 = Math.floor(Math.random() * this.state.genotypes);
                }
            } while (this.state.pairs.includes([rand1, rand2]) || this.state.pairs.includes([rand2, rand1]));

            //This part load genotypes to the state
            gen1 = this.genotypes.genotype[rand1];
            gen2 = this.genotypes.genotype[rand2];
            amount1 = gen1.split('').filter(function(sign){return sign === 'X'}).length;
            amount2 = gen2.split('').filter(function(sign){return sign === 'X'}).length;
            if (amount1 > 0) {
                amount1++;
            }
            if (amount2 > 0) {
                amount2++
            }
        } while (amount1 > 52 || amount2 > 52);

        let newpairs = this.state.pairs;
        if (amount1 <= amount2) {
            newpairs.push([rand1, rand2]);
            this.setState({ genotype1: gen1, genotype2: gen2 }, function() {
                console.log(`Genotypes: `, this.state.genotype1, this.state.genotype2);
            });
            this.setState({parts1: amount1, parts2: amount2}, function() {
                console.log(this.state.parts1 + ' ' + this.state.parts2);
            });
        } else {
            newpairs.push([rand2, rand1]);
            this.setState({ genotype1: gen2, genotype2: gen1 }, function() {
                console.log(`Genotypes: `, this.state.genotype1, this.state.genotype2);
            });
            this.setState({parts1: amount2, parts2: amount1}, function() {
                console.log(this.state.parts1 + ' ' + this.state.parts2);
            });
        }
        this.setState({ pairs: newpairs }, function() {
            console.log(`Pairs: `, this.state.pairs);
        });

        //Load tables of selected parts in fitviewer
        let min = Math.min(amount1, amount2);
        let s1 = [];
        let s2 = [];
        for (let i = 0; i < min; i++) {
            s1.push((i+1).toString());
            s2.push(' ');
        }

        //Start new round and load to state tables of selected and round
        let r = this.state.round + 1;
        this.setState({ round: r, selected1: s1, selected2: s2}, function() {
            console.log(`Round and state `, this.state.round + '. ' + this.state.selected1 + ' ' + this.state.selected2);
        });
    }

    /**
     * Check is user ready to go to the next question by checking choosed gender, birth year and percent of similarity
     */
    isReady() {
        if (this.state.selectedGender.value != 'empty' && this.state.selectedYear.value != 'empty' && this.state.sliderUpdated) {
            this.setState({isDisable: false}, function() {
                console.log(this.state.isDisable);
            });
        } else {
            if (!this.state.isDisable) {
                this.setState({isDisable: true}, function() {
                    console.log(this.state.isDisable);
                });
            }
        }
    }

    /**
     * Check is user matched all needed sticks
     */
    isFitted() {
        let index1 = this.state.selected1.indexOf(' ');
        let index2 = this.state.selected2.indexOf(' ');

        if (index1 < 0 && index2 < 0 && this.state.sliderUpdated) {
            this.setState({sliderUpdated: false}, function() {
                console.log(this.state.sliderUpdated);
                this.isReady();
            });
        }
    }

    /**
     * Return hash data of browser
     */
    browserData() {
        let data = navigator.userAgent;
        let hash = 0;
        for (let i = 0; i < data.length; i++) {
            let character = data.charCodeAt(i);
            hash = ((hash<<5)-hash)+character;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }

    /**
     * Performed at the end of the survey
     */
    finishApp() {
        this.layout = [
            {name:'5,endviewer', x: 0, y: 0, w: 12, h: 4}
        ];
        this.useLayout(this.layout);
    }

    /**
     * Allow to change gender in state
     * @param {string} gen choosed gender by user in listbox 
     */
    handleChangeGender(gen) {
        this.setState({ selectedGender: gen }, function() {
            console.log(`Gender selected:`, this.state.selectedGender);
            console.log(this.genotypes.id.length)
            this.isReady();
        });
    };
    
    /**
     * Allow to change IP
     * @param {number} ip user IP
     */
    handleChangeIp(ip) {
        this.setState({ userIp: ip }, function() {
            console.log(`IP:`, this.state.userIp);
        });
    }
    
    /**
     * Allow to change user ID
     * @param {number} id user ID
     */
    handleChangeId(id) {
        this.setState({ userId: id }, function() {
            console.log(`ID:`, this.state.userId);
        });
    }
    
    /**
     * Allow to change start time
     * @param {number} time time of begging fitting framsticks
     */
    handleChangeStartTime(time) {
        this.setState({ timeStart: time }, function() {
            console.log(`Start time:`, this.state.timeStart);
        });
    }

    /**
     * Allow to change birth year in state
     * @param {number} year choosed birth year by user in listbox
     */
    handleChangeYear(year) {
        this.setState({ selectedYear: year }, function() {
            console.log(`Birth year selected:`, this.state.selectedYear);
            this.isReady();
        });
    }

    /**
     * Allow to change percent in state and mark this in state.sliderUpdated
     * @param {Integer} per choosed similarity of framsticks by user in percentage
     */
    handleChangePercent(per) {
        this.setState({ percent: per, sliderUpdated: true }, function() {
            console.log('Percent selected: ' + this.state.percent + ' ' + this.state.sliderUpdated);
            this.isReady();
        });
    }

    /**
     * 
     * @param {number} nr framstick id
     * @param {number} pos position on the match map
     * @param {*} val id of choosed stick
     */
    handleChangeSelected(nr, pos, val) {
        if (nr == 1) {
            this.setState(state => {
                const selected1 = state.selected1.map((item, i) => {
                    if (pos === i) {
                        return val;
                    } else {
                        return item;
                    }
                });

                return {
                    selected1,
                };
            },  function() {
                console.log(this.state.selected1);
                this.isFitted();
            });
        } else {
            this.setState(state => {
                const selected2 = state.selected2.map((item, i) => {
                    if (pos === i) {
                        let v = val.charCodeAt(0);
                        if (v > 90) {
                            v = v - 6;
                        }
                        let res = String.fromCharCode(v);
                        return res;
                    } else {
                        return item;
                    }
                });

                return {
                    selected2,
                };
            }, function() {
                console.log(this.state.selected2);
                this.isFitted();
            });
        }
    }
    
    /**
     * Function to inform fitviewer about change of height to update scrollbar (for firefox)
     * @param {number} h height
     */
    handleChangeFitHeight(h) {
        this.setState({ fitHeight: h }, function() {
            console.log(`Fit Height:`, this.state.fitHeight);
        });
    }
    
    /**
     * Function to inform fitviewer about change of width to update scrollbar (for firefox)
     * @param {number} w width
     */
    handleChangeFitWidth(w) {
        this.setState({ fitWidth: w }, function() {
            console.log(`Fit Width:`, this.state.fitWidth);
        });
    }

    /**
     * Allow to change transform controler mode
     * @param {number} mode translate or rotation
     */
    handleChangeControlMode(mode) {
        this.setState({ controlMode: mode }, function() {
            console.log(`Control mode:`, this.state.controlMode);
        });
    }

    /**
     * Allow to save actural position of first genotype
     * @param {Array} pos position [x, y, z] of first genotype
     */
    handleChangePosition1(pos) {
        this.setState({ position1: pos}, function() {
            console.log('Position1: ', this.state.position1);
        });
    }

    /**
     * Allow to save actural position of second genotype
     * @param {Array} pos position [x, y, z] of second genotype
     */
    handleChangePosition2(pos) {
        this.setState({ position2: pos}, function() {
            console.log('Position2: ', this.state.position2);
        });
    }

    /**
     * Allow to save actural rotation of first genotype
     * @param {Array} rot rotation [x, y, z] of first genotype
     */
    handleChangeRotation1(rot) {
        this.setState({ rotation1: rot}, function() {
            console.log('Rotation1: ', this.state.rotation1);
        });
    }

    /**
     * Allow to save actural rotation of second genotype
     * @param {Array} rot rotation [x, y, z] of second genotype
     */
    handleChangeRotation2(rot) {
        this.setState({ rotation2: rot}, function() {
            console.log('Rotation2: ', this.state.rotation2);
        });
    }

    /**
     * Allow to block view in simviewer
     * @param {Array} rot rotation [x, y, z] of second genotype
     */
    handleChangeBlockView(bool) {
        this.setState({ blockView: bool}, function() {
            console.log('Block View: ', this.state.blockView);
        });
    }

    /**
     * Allow to change finish result that will be save in the file at the end
     * @param {string} res text to be save in file
     */
    handleChangeResult(res) {
        this.setState({ result: res }, function() {
            console.log('Result: ', this.state.result);
        });
    }

    /**
     * Next button function
     */
    onClickNext() {
        this.handleChangeBlockView(true);
        this.saveFit();
        if (this.state.round == ROUNDS) {
            this.setState({ isFinished: true }, function() {
                console.log('Finish state: ' + this.state.isFinished);
    
                if (this.state.isFinished) {
                    this.finishApp();
                }
            });
        } else {
            this.nextRound();
        }
    }

    /**
     * Close button function
     */
    onClickFinish() {
        this.setState({ isFinished: true }, function() {
            console.log('Finish state: ' + this.state.isFinished);

            if (this.state.isFinished) {
                this.finishApp();
            }
        });
    }

    /**
     * Stores layout, for LocalStorage layout saving
     * @param {any} layout layout to be saved
     */
    onLayoutChange(layout) {
        let newlayout = [];
        for (let i = 0; i < layout.length; i++) {
            newlayout.push({name: layout[i].i, x: layout[i].x, y: layout[i].y, w: layout[i].w, h: layout[i].h});
            if (newlayout[i].name == '2fitviewer') {
                this.handleChangeFitHeight(newlayout[i].h);
                this.handleChangeFitWidth(newlayout[i].w);
            }
        }
    }
    /**
     * Passes layout to widgetscontainer.
     * @param {any} layout layout to be used
     */
    useLayout(layout) {
        let items = [];
        for (let i = 0; i < layout.length; i++) {
            let name = layout[i].name.split(',')[1];
            switch (name) {
                case 'textviewer':
                    items.push({content: <TextViewer/>, i: "" + i + 'textviewer',
                        x: layout[i].x, y: layout[i].y, w: layout[i].w, h: layout[i].h});
                    break;
                case 'similviewer':
                    items.push({content: <SimilViewer
                            genotype1 = {this.state.genotype1}
                            genotype2 = {this.state.genotype2}
                            selected1 = {this.state.selected1}
                            selected2 = {this.state.selected2}
                            blockView = {this.state.blockView}
                            handleChangePosition1 = {(pos) => this.handleChangePosition1(pos)}
                            handleChangePosition2 = {(pos) => this.handleChangePosition2(pos)}
                            handleChangeRotation1 = {(rot) => this.handleChangeRotation1(rot)}
                            handleChangeRotation2 = {(rot) => this.handleChangeRotation2(rot)}
                            controlMode = {this.state.controlMode}
                            round = {this.state.round}/>, 
                        i: "" + i + 'similviewer',
                        x: layout[i].x, y: layout[i].y, w: layout[i].w, h: layout[i].h});
                    break;
                case 'parmviewer':
                    items.push({content: <ParmViewer 
                            handleChangeYear = {(year) => {this.handleChangeYear(year)}} 
                            handleChangeGender = {(gen) => {this.handleChangeGender(gen)}}
                        />, 
                        i: "" + i + 'parmviewer',
                        x: layout[i].x, y: layout[i].y, w: layout[i].w, h: layout[i].h});
                    break;
                case 'fitviewer':
                    items.push({content: <FitViewer 
                            selected1 = {this.state.selected1} 
                            selected2 = {this.state.selected2} 
                            parts1 = {this.state.parts1} 
                            parts2 = {this.state.parts2}
                            fitHeight = {this.state.fitHeight}
                            fitWidth = {this.state.fitWidth}
                            handleChangeSelected = {(nr, pos, val) => {this.handleChangeSelected(nr, pos, val)}}/>,
                        i: "" + i + 'fitviewer',
                        x: layout[i].x, y: layout[i].y, w: layout[i].w, h: layout[i].h});
                    break;
                case 'sliderviewer':
                    items.push({content: <SliderViewer 
                            isDisable = {this.state.isDisable}
                            parts1 = {this.state.parts1}
                            parts2 = {this.state.parts2}
                            selected1 = {this.state.selected1}
                            selected2 = {this.state.selected2}
                            onClickNext = {() => {this.onClickNext()}}
                            onClickFinish = {() => {this.onClickFinish()}}
                            handleChangePercent = {(per) => {this.handleChangePercent(per)}}/>,
                        i: "" + i + 'sliderviewer',
                        x: layout[i].x, y: layout[i].y, w: layout[i].w, h: layout[i].h});
                    break;
                case 'endviewer':
                    items.push({content: <EndViewer 
                            userId = {this.state.userId}
                            result = {this.state.result}/>,
                        i: "" + i + 'endviewer',
                        x: layout[i].x, y: layout[i].y, w: layout[i].w, h: layout[i].h});
                    break;
            }
        }
        this.widgetscontainer.addMultipleItems(items);
    }

    /**
     * Render function.
     * @returns {JSX.Element} main page of Framsticks.JS
     */
    render() {
        
        const contentHeader = (
            <span>   
                <span style={{marginLeft: '20px', fontFamily: "'Fira Mono', Monaco, 'Andale Mono', 'Lucida Console', 'Bitstream Vera Sans Mono', 'Courier New', Courier, monospace"}}>
                    Ankieta
                </span> 
            </span>
        );

        return (
            <TitlePanel 
                title={contentHeader}
            >
                <div style={styles.content}>
                    {this.container}
                </div>
            </TitlePanel>
        );
    }
}

export default MainView;