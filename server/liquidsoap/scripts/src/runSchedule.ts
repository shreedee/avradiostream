/*
Used to RUN schedules from the file
The last line of output is the result of this script

To DEBUG
npm run debug -- ./src/runSchedule.ts 2020-05-01T09:35:00.000Z

for prod 
npm run prod -- ./dist/runSchedule.js 2020-05-01T09:35:00.000Z

*/
import * as fs from 'fs';
import * as moment from 'moment';
import * as _ from 'lodash';

import {myConfig, loadStatusFile} from './myUtils';

const _HOUR = 1000 * 60 * 60;
const TIMEFORMAT= 'YYYY-MM-DDTHH:mm:ss';

//we need to optimize hits on google cal elese they will block us
async function main(){
    if(!fs.existsSync(myConfig.calFileName))
        throw `status file ${myConfig.calFileName} doesn't exist`;

        

    const schedules = loadStatusFile(myConfig.calFileName);
    
    //so that we can test with arbit dates
    //example node googleProgram.ts 2020-05-01T20:40:14Z
    const timeNow = process.argv.length >2?
            moment.utc(process.argv[2]) : moment.utc();

    console.log(`using date : ${timeNow.format(TIMEFORMAT)}`);
    
    const found = _.find(schedules,
        p=>{
            const endiIsafater = p.endTime.isAfter(timeNow) ;
            const startisBefore = p.startTime.isBefore(timeNow);
            
            if(! (endiIsafater && startisBefore))
                return false;

            if(!p.media){
                console.error(`program :${p.summary} has no media skipping`);
                return false;
            }

            return true;

        });


    if(!found){
        throw 'no programs found'
    }

    /*****************  DEE Next two lines tell LIC what to do don't change without changing test.liq      *****************/
    console.log(`[Found schedule] -> ${found.summary}`);

    //this is THE real outPUT
    //as the lic file takes this file from std output and streams it
    console.log(found.media);

    /************ TILL here  *****************/
    
}

main().then(()=>{
    process.exit(0);
})
.catch(err => {
    
    console.error(`exception :${err}`);
    console.error(`exception :${JSON.stringify(err)}`);
    process.exit(-1);
});