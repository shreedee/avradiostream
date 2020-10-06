/*
Used to get radio programs from google calander.

To DEBUG
npm run debug -- ./src/getFromWeb.ts 2020-05-01T09:35:00.000Z

for prod 
npm run prod -- ./dist/getFromWeb.js 

*/
import * as fs from 'fs';
import * as moment from 'moment';
import * as _ from 'lodash';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import * as path from 'path';
import * as url from 'url';
import {myConfig, ProgramProps, asyncForEach, loadStatusFile} from './myUtils';

const _dynamicStore = '/dynamicFiles';

const _HOUR = 1000 * 60 * 60;
const TIMEFORMAT= 'YYYY-MM-DDTHH:mm:ss';

//we need to optimize hits on google cal elese they will block us
async function main(){
    debugger;
    let schedules =fs.existsSync(myConfig.calFileName)?
        loadStatusFile(myConfig.calFileName):[];
    
    //so that we can test with arbit dates
    //example node googleProgram.ts 2020-05-01T20:40:14Z
    const timeNow = process.argv.length >2?
            moment.utc(process.argv[2]) : moment.utc();

    console.log(`using date : ${timeNow.format(TIMEFORMAT)}`);

    schedules = _.filter(schedules, p=>p.endTime.isAfter(timeNow));
    
    const fromGoogle = await readCalAsync(timeNow);

    schedules = _.reduce(fromGoogle,(acc,p)=>{
        const existingIndex = _.findIndex(acc, e=>e.id == p.id);

        if(-1 != existingIndex){

            const newMedia = acc[existingIndex].location == p.location?acc[existingIndex].media:null;
            acc[existingIndex]=p;

            if(acc[existingIndex].media != newMedia){
                console.log(`resting media for ${p.summary}`);
                acc[existingIndex].media = newMedia;
            }

        }else{
            acc= _.concat(acc,p);
        }

        return acc;
    },schedules);

    const needingMedia = _.filter(schedules,p=>!p.media);

    await asyncForEach(needingMedia,async p=>{
        try{
            p.media= await fromWordPress(p);
        }
        catch(err){
            console.error(`failed to get media for ${p.summary}, : ${JSON.stringify(err)}`);
        }
        
    });

    schedules = _.orderBy(schedules,s=>s.startTime);

    fs.writeFileSync(myConfig.calFileName, JSON.stringify(schedules,null,'\t'));

    await clearOldFiles(schedules);

    console.log('Schedules updated');
}

async function clearOldFiles(schedules: ProgramProps[]){

    const allMedia = _.map(fs.readdirSync(_dynamicStore),m=>path.join(_dynamicStore, m));

    const toDelete = _.filter(allMedia,m=>!_.find(schedules,s=>s.media == m));
    
    await asyncForEach(toDelete,async m=>{
        try{
            fs.unlinkSync(m);
            
        }
        catch(err){
            console.error(`Failed to delete media ${m} -> ${JSON.stringify(err)}`);
        }
    });
} 


async function download(uri:string) {
    
    if (!fs.existsSync(_dynamicStore)) {
        fs.mkdirSync(_dynamicStore);
    }

    const fileNameOnly = `media_${moment()}_` + _.last(uri.split('/'));
    const filename =  path.join(_dynamicStore, fileNameOnly);

    
    const allMedia = fs.readdirSync(_dynamicStore);
    
    if(fs.existsSync(filename))
        return filename;
   
    if(_.includes(allMedia,fileNameOnly)){
        console.log(`file ${filename} was not found but does exist`);
        
        return filename;
    }

    console.log(`Downloading ${uri}`);
    var protocol = url.parse(uri).protocol.slice(0, -1);

    return new Promise<string>((resolve,reject)=>{

        var onError = function (e) {
            fs.unlink(filename,()=>{});
            reject(e);
        }

        require(protocol).get(uri, function(response) {
            if (response.statusCode >= 200 && response.statusCode < 300) {
                console.log(` downloading to file ${filename}`);
                var fileStream = fs.createWriteStream(filename);
                fileStream.on('error', (err)=>{
                    fileStream.close();
                    onError(err);
                });
                fileStream.on('close', ()=> {
                    console.log(`finished downloading ${filename}`);
                    fileStream.close();
                    resolve(filename)
                });
                response.pipe(fileStream);
            } else if (response.headers.location) {
                resolve(download(response.headers.location));
            } else {
                reject(new Error(response.statusCode + ' ' + response.statusMessage));
            }
        }).on('error', onError);
    });

}

async function fromWordPress(program:ProgramProps){

    if(!program.location)
        throw `program ${program.summary} has no location`;

    console.log(`fetching ${program.location}`)
    const res = await fetch(program.location);
    if(200 != res.status)
        throw `failed to fecth data ${res.status}:${res.statusText}`;
    
    const html = await res.text();
    
    const dom = cheerio('a.playprogram.bgaudio',html);
    
    if(!dom || 1 != dom.length ){
        throw 'failed to find mp3 in the WP post';
    }

    //"javascript:initPlayer('audio','https://www.aurovilleradio.org/wp-content/uploads/import/2020_01_10_music_avff_3rd_day_emergence_live_english_ed.mp3', 'Emergence is the last concert held on the stage of the third day AV Film Festival 2020 at Town Hall. Krishna leaded his talented crew with great musical touch. Enjoy the concert! - Featured: Emergence')"
    const linkText =dom.attr('href');
    const matches  =linkText.match(/'audio','(.*?)\',/i);
    if(2!=matches.length)
        throw `failed to match post URL ${linkText}`;
    
    return await download(matches[1]);

}

async function readCalAsync(readTime:moment.Moment){

    const url = `https://www.googleapis.com/calendar/v3/calendars/${process.env.GOOGLE_CALID}/events?` +
        `key=${process.env.ENV_GOOGLE_APIKEY}` +
        `&timeMin=${readTime.format(TIMEFORMAT)}Z` +
        `&timeMax=${readTime.clone().add(8, 'hours').format(TIMEFORMAT)}Z` 
        ;

    console.log(`fetching -> ${url}`);
    const res = await fetch(url);
    if(200 != res.status)
        throw `failed to fecth data ${res.status}:${res.statusText}`;

    const data:{
        items:{
            id:string;
            summary:string;
            location:string;
            start:{
                dateTime:string;
            }
            end:{
                dateTime:string;
            }
            
        }[]
    } = await res.json();

    const schedules:ProgramProps[] = _.map(data.items,item=>{
        
        try{
            return {
                id:item.id,
                summary:item.summary,
                location:item.location,
                startTime:moment.utc(item.start.dateTime),
                endTime:moment.utc(item.end.dateTime)
            };
        }
        catch(err){
            console.error(`failed to read one calendar item :${JSON.stringify(item)}`);
            return undefined;
        }
        
        
    });
    
    return _.orderBy(_.filter(schedules, s=>!!s ), s=>s.startTime);
}


main().then(()=>{
    process.exit(0);
})
.catch(err => {

    console.error(`failed to Run exception ${err} :${JSON.stringify(err)}`);
    process.exit(-1);
});