import React, { Component } from 'react';
import borderShadow from './images/shadow.png';
import grass from './images/tiles/grass0.png';
import water from './images/tiles/water0.png';
import bridgeStart from './images/tiles/bridge0_start.png';
import bridgeEnd from './images/tiles/bridge0_end.png';
import bridgeMid from './images/tiles/bridge0_mid.png';



const mapString =`
# # # # # # # # # # # # # # # # # # # #
# · · · · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · · · · · · · #
# W W W W W W W W W BE W W W W W W W W # 
# W W W W W W W W W W W W W W W W W W # 
# W W W W W W W W W BS W W W W W W W W # 
# · · · · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · · · · · · · #
# # # # # # # # # # # # # # # # # # # #
`

export default class DrawMap extends Component {

    Map(mapString) {
        for (tileChar in mapString) {
            switch(tileChar){
                case '#':
                    return <img src={borderShadow}></img>;
                case '·':
                    return <img src={grass}></img>;
                case 'w':
                    return <img src={water}></img>;
                case 'BS':
                    return <img src={bridgeStart}></img>;
                case 'BE':
                    return <img src={bridgeEnd}></img>;
                case 'BM':
                    return <img src={bridgeMid}></img>;
                default:
                    return null;           
            }
        }
    }

    myImage() {
        return (
        <div className="tile">
            <img src={grass}></img>
        </div>
        );
    }

    render() {
        return (
            <div classMap>
                <img src={grass}></img>
                </div>
        );
    }
} 