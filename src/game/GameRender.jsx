import React from 'react';
import Map from './Map.js';


export default class extends React.Component {

    render() {
        return (
            <div id="game" className="game-container"> <Map/> </div>
        )
    }
}