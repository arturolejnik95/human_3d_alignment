/*global Module*/
"use strict";
import React from 'react';
import Genotypes from './utils/genotypes';
import TitlePanel from './viewskeleton/titlepanel';
import WidgetsContainer from './viewskeleton/widgetscontainer';
import ParmViewer from './widgets/parmviewer';
import SimilViewer from './widgets/similviewer';
import FitViewer from './widgets/fitviewer';
import NextViewer from './widgets/nextviewer';
import LoadViewer from './widgets/loadviewer';
import EndViewer from './widgets/endviewer';

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
            {name:'5,loadviewer', x: 0, y: 0, w: 12, h: 5}
        ];

        this.container = <WidgetsContainer onRef={ref => (this.widgetscontainer = ref)} onLayoutChange={this.onLayoutChange} />;

        this.state = {
            userIds: [],
            userIps: [],
            genders: [],
            years: [],
            startTimes: [],
            stopTimes: [],
            positions1: [],
            positions2: [],
            rotations1: [],
            rotations2: [],
            ids1: [],
            ids2: [],
            fits: [],
            percents: [],
            genotypes: 0,
            genotype1: '',
            genotype2: '',
            id1: '',
            id2: '',
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
            timeStart: '',
            stopTime: '',
            gender: '',
            year: 0,
            percent: 0,
            isFinished: false,
            fitHeight: 5,
            blockView: true,
            result: 0
        };

        this.start = this.start.bind(this);
        this.loadNextGenotypes = this.loadNextGenotypes.bind(this);
        this.handleChangeValues = this.handleChangeValues.bind(this)
        this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
        this.handleChangeId = this.handleChangeId.bind(this);
        this.handleChangeIp = this.handleChangeIp.bind(this);
        this.handleChangeGender =  this.handleChangeGender.bind(this);
        this.handleChangeYear = this.handleChangeYear.bind(this);
        this.handleChangePercent = this.handleChangePercent.bind(this);
        this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
        this.handleChangeStopTime = this.handleChangeStopTime.bind(this);
        this.handleChangeFitHeight = this.handleChangeFitHeight.bind(this);
        this.handleChangePosition1 = this.handleChangePosition1.bind(this);
        this.handleChangePosition2 = this.handleChangePosition2.bind(this);
        this.handleChangeRotation1 = this.handleChangeRotation1.bind(this);
        this.handleChangeRotation2 = this.handleChangeRotation2.bind(this);
        this.handleChangePair = this.handleChangePair.bind(this);
        this.handleChangeBlockView = this.handleChangeBlockView.bind(this);
        this.addNewResult = this.addNewResult.bind(this);
        this.loadResults = this.loadResults.bind(this);
        this.loadResult = this.loadResult.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
        this.onClickFinish = this.onClickFinish.bind(this);
        this.onClickLoad = this.onClickLoad.bind(this);
        this.finishApp = this.finishApp.bind(this);
    }

    /** 
     * Uses default layout.
    */
    componentDidMount() {
        this.genotypes = new Genotypes(this, "https://raw.githubusercontent.com/arturolejnik95/human_3d_alignment/master/walking.gen"); //load text from file to this.genotypes
        console.log(this.genotypes);
        this.useLayout(this.layout);
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

        this.loadNextGenotypes();
        this.handleChangeBlockView(false);
        this.useLayout(this.layout);
    }

    addNewResult(result) {
        let temp1 = this.state.userIds;
        let temp2 = this.state.userIps;
        let temp3 = this.state.genders;
        let temp4 = this.state.years;
        let temp5 = this.state.startTimes;
        let temp6 = this.state.stopTimes;
        let temp7 = this.state.positions1;
        let temp8 = this.state.positions2;
        let temp9 = this.state.rotations1;
        let temp10 = this.state.rotations2;
        let temp11 = this.state.ids1;
        let temp12 = this.state.ids2;
        let temp13 = this.state.fits;
        let temp14 = this.state.percents;

        temp1.push(result[0]);
        temp2.push(result[1]);
        temp3.push(result[2]);
        temp4.push(result[3]);
        temp5.push(result[4]);
        temp6.push(result[5]);
        temp7.push(result[6]);
        temp8.push(result[7]);
        temp9.push(result[8]);
        temp10.push(result[9]);
        temp11.push(result[10]);
        temp12.push(result[11]);
        temp13.push(result[12]);
        temp14.push(result[13]);

        this.setState({ userIds: temp1, 
                        userIps: temp2, 
                        genders: temp3, 
                        years: temp4,
                        startTimes: temp5,
                        stopTimes: temp6,
                        positions1: temp7,
                        positions2: temp8,
                        rotations1: temp9,
                        rotations2: temp10,
                        ids1: temp11,
                        ids2: temp12,
                        fits: temp13,
                        percents: temp14},
            function() {
                console.log('Results: ', this.state.userIds, this.state.userIps, this.state.genders, this.state.years, this.state.startTimes, this.state.stopTimes, this.state.positions1, this.state.positions2, this.state.rotations1, this.state.rotations2, this.state.ids1, this.state.ids2, this.state.fits, this.state.percents)
        });
    }

    loadResults() {
        this.setState({ genotypes: this.genotypes.id.length }, function() {
            console.log(`Genotypes: `, this.state.genotypes);
        });
        this.results = this.state.userIds.length;
        if (this.results > this.state.result) {
            this.loadResult();
        }

        setTimeout(() => {
            this.handleChangeBlockView(false);
        }, 400);      


        this.layout = [
            {name:'1,similviewer', x: 0, y: 0, w: 6, h: 4},
            {name:'2,fitviewer', x: 6, y: 0, w: 2, h: 5},
            {name:'3,parmviewer', x: 8, y: 0, w: 4, h: 5},
            {name:'4,nextviewer', x: 0, y: 4, w: 6, h: 1}
        ];
        this.useLayout(this.layout);
        
    }

    loadResult() {
        let position1 = this.state.positions1[this.state.result].split(',');
        let position2 = this.state.positions2[this.state.result].split(',');
        let rotation1 = this.state.rotations1[this.state.result].split(',');
        let rotation2 = this.state.rotations2[this.state.result].split(',');

        position1[0] = position1[0].substr(1);
        position2[0] = position2[0].substr(1);
        rotation1[0] = rotation1[0].substr(1);
        rotation2[0] = rotation2[0].substr(1);

        position1[2] = position1[2].substr(0, position1[2].length - 1);
        position2[2] = position2[2].substr(0, position2[2].length - 1);
        rotation1[2] = rotation1[2].substr(0, rotation1[2].length - 1);
        rotation2[2] = rotation2[2].substr(0, rotation2[2].length - 1);

        let sel1 = [];
        let sel2 = [];
        if (this.state.fits[this.state.result].length > 0) {
            let fitArray = this.state.fits[this.state.result].split(';');

            for (let i = 0; i < fitArray.length; i++) {
                let fit = fitArray[i].split(':')
                sel1.push(fit[0]);
                sel2.push(String.fromCharCode(parseInt(fit[1])+64));
            }
        }

        this.handleChangeValues(this.state.userIds[this.state.result],
                                this.state.userIps[this.state.result],
                                this.state.genders[this.state.result],
                                this.state.years[this.state.result],
                                this.state.startTimes[this.state.result],
                                this.state.stopTimes[this.state.result],
                                position1, position2, rotation1, rotation2,
                                this.state.ids1[this.state.result], this.state.ids2[this.state.result],
                                sel1, sel2, this.state.percents[this.state.result]);
        
        setTimeout(() => {
            this.loadNextGenotypes(); 
        
            this.handleChangeResult(this.state.result + 1); 
        }, 100)
    }

    /**
     * Load new genotypes to simulator viewer 
     */
    loadNextGenotypes() {
        let index1 = 0, index2 = 0;
        for (let i = 0; i < this.state.genotypes; i++) {
            if (this.genotypes.id[i] == this.state.id1) {
                index1 = i;
            }
            if (this.genotypes.id[i] == this.state.id2) {
                index2 = i;
            }
        }

        let gen1 = this.genotypes.genotype[index1];
        let gen2 = this.genotypes.genotype[index2];


        this.setState({ genotype1: gen1, genotype2: gen2 }, function() {
            console.log(`Genotypes: `, index1, index2, this.state.genotype1, this.state.genotype2);
        });

        
        //Read genotypes to calculate amounts of 'X' that means amounts of parts in visualization - 1
        let amount1 = gen1.split('').filter(function(sign){return sign === 'X'}).length;
        let amount2 = gen2.split('').filter(function(sign){return sign === 'X'}).length;

        //Must check is amount > 0, if it's not that means it's not any part in this model
        //if it is amount means joints so we have to add 1 to have amounts of parts
        if (amount1 > 0) {
            amount1++;
        }

        if (amount2 > 0) {
            amount2++
        }

        this.setState({parts1: amount1, parts2: amount2}, function() {
            console.log(this.state.parts1 + ' ' + this.state.parts2);
        });
    }

    /**
     * Allow to change gender in state
     * @param {string} gen choosed gender by user in listbox 
     */
    handleChangeGender(gen) {
        this.setState({ gender: gen }, function() {
            console.log(`Gender selected:`, this.state.gender);
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
     * Allow to change stop time
     * @param {number} time time of begging fitting framsticks
     */
    handleChangeStopTime(time) {
        this.setState({ timeStop: time }, function() {
            console.log(`Stop time:`, this.state.timeStop);
        });
    }

    handleChangePair(indeks1, indeks2) {
        this.setState({ id1: indeks1, id2: indeks2 }, function() {
            console.log('Pair: ' + this.state.id1 + ' ' + this.state.id2);
        });
    }

    /**
     * Allow to change birth year in state
     * @param {number} y choosed birth year by user in listbox
     */
    handleChangeYear(y) {
        this.setState({ year: y }, function() {
            console.log(`Birth year selected:`, this.state.year);
        });
    }

    /**
     * Allow to change percent in state
     * @param {Integer} per choosed similarity of framsticks by user in percentage
     */
    handleChangePercent(per) {
        this.setState({ percent: per }, function() {
            console.log('Percent selected: ' + this.state.percent);
        });
    }

    /**
     * Allow to change selected arrays in state
     * @param {Array} arr1 array of selected parts of 1st genotype by user
     * @param {Array} arr2 array of selected parts of 2nd genotype by user
     */
    handleChangeSelected(arr1, arr2) {
        this.setState({ selected1: arr1, selected2: arr2 }, function() {
            console.log('Selected: ' + this.state.selected1 + ' ' + this.state.selected2);
        });
    }
    
    /**
     * Function to inform fitviewer about change of height to update scrollbar (for firefox)
     * @param {number} h user ID
     */
    handleChangeFitHeight(h) {
        this.setState({ fitHeight: h }, function() {
            console.log(`Fit Height:`, this.state.fitHeight);
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
     * Allow to save all data needed for this pair in state
     * @param {number} id Id of user
     * @param {string} ip IP of user's computer
     * @param {string} gen gender
     * @param {number} y year of born
     * @param {date} start time of start this fit
     * @param {date} stop time of end this fit
     * @param {Array} pos1 position of genotype1
     * @param {Array} pos2 position of genotype2
     * @param {Array} rot1 rotation of genotype1
     * @param {Array} rot2 rotation of genotype2
     * @param {string} id1 id/name of genotype1
     * @param {string} id2 id/name of genotype2
     * @param {Array} s1 array of fitted parts of genotype1
     * @param {Array} s2 array of fitted parts of genotype2
     * @param {number} res user's result in percent
     */
    handleChangeValues(id, ip, gen, y, start, stop, pos1, pos2, rot1, rot2, id1, id2, s1, s2, res) {
        this.setState({ userId: id, userIp: ip, gender: gen, year: y, timeStart: start, timeStop: stop, position1: pos1, position2: pos2, 
            rotation1: rot1, rotation2: rot2, id1: id1, id2: id2, selected1: s1, selected2: s2, percent: res}, function() {
                console.log('Loaded: ', this.state.userId, this.state.userIp, this.state.gender, this.state.year, this.state.timeStart, this.state.timeStop, 
                    this.state.position1, this.state.position2, this.state.rotation1, this.state.rotation2, this.state.id1, this.state.id2, this.state.selected1,
                    this.state.selected2, this.state.percent);
            });
    }

    /**
     * Next button function
     */
    onClickNext() {
        this.handleChangeBlockView(true);
        if (this.state.result == this.results) {
            this.setState({ isFinished: true }, function() {
                console.log('Finish state: ' + this.state.isFinished);
    
                if (this.state.isFinished) {
                    this.finishApp();
                }
            });
        } else {
            this.loadResult();
        }
        this.handleChangeBlockView(false);
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
     * Load button function
     */
    onClickLoad() {
        if (this.state.userIds.length > 0) {
            this.loadResults();
        } else {
            alert('Nie załadowano żadnego prawidłowego pliku!');
        }
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
            }
        }
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
     * Passes layout to widgetscontainer.
     * @param {any} layout layout to be used
     */
    useLayout(layout) {
        let items = [];
        for (let i = 0; i < layout.length; i++) {
            let name = layout[i].name.split(',')[1];
            switch (name) {
                case 'similviewer':
                    items.push({content: <SimilViewer
                            genotype1 = {this.state.genotype1}
                            genotype2 = {this.state.genotype2}
                            selected1 = {this.state.selected1}
                            selected2 = {this.state.selected2}
                            position1 = {this.state.position1}
                            position2 = {this.state.position2}
                            rotation1 = {this.state.rotation1}
                            rotation2 = {this.state.rotation2}
                            blockView = {this.state.blockView}
                            result = {this.state.result}/>, 
                        i: "" + i + 'similviewer',
                        x: layout[i].x, y: layout[i].y, w: layout[i].w, h: layout[i].h});
                    break;
                case 'parmviewer':
                    items.push({content: <ParmViewer 
                            userId = {this.state.userId}
                            userIp = {this.state.userIp}
                            gender = {this.state.gender}
                            year = {this.state.year}
                            timeStart = {this.state.timeStart}
                            timeStop = {this.state.timeStop}
                            id1 = {this.state.id1}
                            id2 = {this.state.id2}
                            percent = {this.state.percent}
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
                            fitHeight = {this.state.fitHeight}/>,
                        i: "" + i + 'fitviewer',
                        x: layout[i].x, y: layout[i].y, w: layout[i].w, h: layout[i].h});
                    break;
                case 'nextviewer':
                    items.push({content: <NextViewer 
                            onClickNext = {() => {this.onClickNext()}}
                            onClickFinish = {() => {this.onClickFinish()}}/>,
                        i: "" + i + 'nextviewer',
                        x: layout[i].x, y: layout[i].y, w: layout[i].w, h: layout[i].h});
                    break;
                case 'loadviewer':
                    items.push({content: <LoadViewer
                            addNewResult = {(arr) => this.addNewResult(arr)} 
                            onClickLoad = {() => {this.onClickLoad()}}
                            loadResults = {() => this.loadResults()} />,
                        i: "" + i + 'loadviewer',
                        x: layout[i].x, y: layout[i].y, w: layout[i].w, h: layout[i].h});
                    break;
                case 'endviewer':
                    items.push({content: <EndViewer />,
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
                    Wyniki ankiety
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