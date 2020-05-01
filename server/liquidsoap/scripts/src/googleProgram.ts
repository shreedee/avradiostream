/*
Used to get radio programs from google calander.
we want the next mp3 to play in stdout. so any other logging in stderr please
*/
import * as fs from 'fs';
import * as moment from 'moment';
//import * as _ from 'lodash';

type ProgramProps={
    name:string;
    location:string;
    //startTime:moment;
    //endTime:moment;
}

type statFileSchema ={
    //readTime?:moment;
    programs?:ProgramProps[]
}

const _calFileName = '/config/shedules.json';
const _HOUR = 1000 * 60 * 60;

//we need to optimize hits on google cal elese they will block us
async function main(){

    let schedules:statFileSchema = {};
    if (fs.existsSync(_calFileName)) {
        schedules = JSON.parse( String(fs.readFileSync(_calFileName)));
    }
    
    const timeNow = moment();

    /*
    //read shcdule in 4 hour blocks
    if(!schedules.readTime || timeNow.isAfter(schedules.readTime.addHours(4, 'hours')) ){
        console.error('reading cal from google');
        //schedules = await readCalAsync();
    }

*/


    return 'ggg';
}



async function readCalAsync(){

    const minDate = new Date();
    

    
}




main().then(nextProgram=>{
    console.log(nextProgram);
    process.exit(0);
})
.catch(err => {
    debugger;
    console.error(`exception :${JSON.stringify(err)}`);
    process.exit(-1);
});