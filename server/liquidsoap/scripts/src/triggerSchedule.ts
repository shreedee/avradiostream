/*
Used to RUN schedules from the file
The last line of output is the result of this script

To DEBUG
npm run debug -- ./src/triggerSchedule.ts 2020-05-01T09:35:00.000Z

for prod 
npm run prod -- ./dist/triggerSchedule.js 

*/
import * as fs from 'fs';
import * as moment from 'moment';
import * as _ from 'lodash';

//import * as Telnet from 'telnet-client';

import { myConfig, loadStatusFile } from './myUtils';

import * as util from 'util';
import * as dns from 'dns';
const lookup = util.promisify(dns.lookup);


import * as net from 'net';

const _HOUR = 1000 * 60 * 60;
const TIMEFORMAT = 'YYYY-MM-DDTHH:mm:ss';

function pushToLiquid(ip: string, media: string) {
    return new Promise((resolve, reject) => {
        const client = new net.Socket();

        client.on('data', function (data) {
            console.log('telnet Received: ' + data);
            client.destroy(); // kill client after server's response
            resolve();
        });

        client.on('close', function () {
            console.log('telnet Connection closed');
        });


        client.connect(5000, ip, function () {
            const cmd = `request.push ${media}\n`;
            console.log(`running telnet ${cmd} `);
            client.write(cmd);
        });


    });

}

//we need to optimize hits on google cal elese they will block us
async function main() {
    if (!fs.existsSync(myConfig.calFileName))
        throw `status file ${myConfig.calFileName} doesn't exist`;

    debugger;


    //so that we can test with arbit dates
    //example node googleProgram.ts 2020-05-01T20:40:14Z
    while (true) {
        const liquidIP = await lookup('liquidsoap');
        if (!liquidIP)
            throw 'copuld not resolved liquidsoap IP';

        const schedules = _.orderBy(loadStatusFile(myConfig.calFileName), s => s.startTime);

        const timeNow = process.argv.length > 2 ?
            moment.utc(process.argv[2]) : moment.utc();

        console.log(`current time is : ${timeNow.format(TIMEFORMAT)}`);

        try {
            let delayMs = 1000 * 60 * 5; //5 min
            const nextSchedule = _.find(schedules,
                s => !!s.media && s.startTime.isSameOrAfter(timeNow));
            if (nextSchedule) {
                delayMs = (nextSchedule.startTime.diff(timeNow));
                console.log(`next schedule ${nextSchedule.summary} starts at ${nextSchedule.startTime.format(TIMEFORMAT)} media:${nextSchedule.media} waiting for ${delayMs} ms`);

                await new Promise(resolve => setTimeout(resolve, delayMs));

                /*
                const connection = new Telnet();
                await connection.connect({
                    host: 'liquidsoap',
                    port: 5000,
                    shellPrompt: '/ # ',
                    timeout: 1500
                });

                const cmd = `request.push ${nextSchedule.media}`;
                console.log(`running telnet ${cmd} `);
                let res = await connection.exec(cmd);
                */
                await pushToLiquid(liquidIP.address, nextSchedule.media);

                console.log(`pushed ${nextSchedule.summary}`);

            } else {
                console.log('no next schedule found will try again in 5 min');

                await new Promise(resolve => setTimeout(resolve, delayMs));

            }
        } catch (err) {
            console.error(`exception :${err}`);
            console.error(`exception :${JSON.stringify(err)}`);

            console.error('failed to in while loop waiting 1 sec');

            await new Promise(resolve => setTimeout(resolve, 1000));
        }


    }



}

main().then(() => {
    process.exit(0);
})
    .catch(err => {

        console.error(`exception :${err}`);
        console.error(`exception :${JSON.stringify(err)}`);
        process.exit(-1);
    });