import CSVFile from '../Assets/test.csv'
import csv from "csvtojson";
import { EWSMessageType } from '../Enums/EWSMessageType';
import Papa from 'papaparse';
export default class ScheduleManager {
    screen_actions: any[];
    screen_one_index;
    current_time;
    clock;
    performAction;
    constructor() {
        this.screen_actions = [];

        this.screen_one_index = 0;
        this.current_time = 0;
    }

    loadCSV() {
        if(this.screen_actions.length == 0) {
            Papa.parse(CSVFile, {
                download: true,
                header: true,
                delimiter: ",",
                newline: "",
                complete: this.mapCSV
            })
        }

    }

    mapCSV(response) {
        let screenActions = response.data;
        this.screen_actions = screenActions.map(function (screenAction, index) {
            let action = screenAction;

            if(action.ACTION === "STOP_VIDEO") {
                action = {
                    ...action,
                    PAYLOAD: '782b91f0-28a2-41a0-8289-8ca8de9ba077',
                    ACTION: EWSMessageType.START_VIDEO
                }
            }
            return {
                ...action,
                TIMECODE: (parseInt(screenAction.TIMECODE)) + 1000
            }
        })


        let timeCodes = this.screen_actions.map((action) => {
            return parseInt(action.TIMECODE)
        })

        this.screen_actions.push({
            ACTION: EWSMessageType.STOP_SCHEDULE,
            RPI_ID: 1,
            PAYLOAD: null,
            TIMECODE: Math.max(...timeCodes) + 1000
        })

        console.log('SCHEDULE MANAGER mapCSV', this.screen_actions);

    }

    setCallback = (callback) => {
        this.performAction = callback;

    }

    start(callback) {
        // this.loadCSV();
        console.log('SCHEDULE MANAGER START', this.screen_actions);
        // this.performAction = callback;
        // this.clock = setInterval(this.sendCalls.bind(this), 40)
    }


    sendCalls() {
        // console.log('XXX SEND CALLs', this.screen_actions)
        let currentActions = this.screen_actions.filter((action) => {
            return action.TIMECODE == this.current_time 
        })

        if(currentActions.length > 0) {
            currentActions.forEach((action) => {
                console.log('ACTION', action.RPI_ID)
                console.log('TIME', this.current_time)
                this.performAction(action);
                if(action.ACTION === EWSMessageType.STOP_SCHEDULE) {
                    this.stop();
                }
            })
        }
        this.current_time = this.current_time + 40;
    }

    stop() {
        clearInterval(this.clock);
        this.clock = null;
        this.current_time = 0;
    }
}