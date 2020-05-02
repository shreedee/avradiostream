import * as moment from 'moment';
import * as fs from 'fs';
import * as _ from 'lodash';

export const myConfig ={
    calFileName: '/config/schedules.json'
};

export type ProgramProps={
    id:string;
    summary:string;
    location:string;
    startTime:moment.Moment;
    endTime:moment.Moment;
    media?:string;    
}

export async function asyncForEach<T>(
    array:Array<T>, 
    callback:(item:T,index:number,acc:Array<T>)=>PromiseLike<void>) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}

export function loadStatusFile(fileName:string){
    const schedules:ProgramProps[]  = JSON.parse( String(fs.readFileSync(fileName)));
        
     //we need to fix the times
     _.each(schedules,p=>{
        p.endTime=moment.utc(p.endTime);
        p.startTime=moment.utc(p.startTime);
    });

    return schedules;
}


