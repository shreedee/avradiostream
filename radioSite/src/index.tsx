import cssExports from './site.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

//import './bootstrapVariables.scss';
//import '../../node_modules/bootstrap/scss/bootstrap';
import 'bootstrap/scss/bootstrap.scss';
import './homepage.scss';




function TestMe() {
    return <p className="text-primary">
        Hello
        </p>;
}


ReactDOM.render(<TestMe />, document.getElementById('react_root'));



/*
function home() {
    return (
        <div className='home'>
            <div className='text'>
                MOST RECENT PODCASTS: Stay up to date on the latest news, music, art and culture in Auroville.
            </div>
        </div>

    )
}
*/
