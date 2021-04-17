import React from 'react';
import * as PIXI from "pixi.js";
import { Loader } from '@pixi/loaders';
import { CompositeTilemap, Tilemap } from '@pixi/tilemap';
import grass from "./images/tiles/grass2.png";
import shadow from "./images/shadow.png";
import tileSheet from './images/StaticTiles.json';
// fernQuest WebAssembly
import FernQuestInteract from '../external/fernQuestOut/FernQuestInteract.js';
import FqInteractWASM from '../external/fernQuestOut/FernQuestInteract.wasm';
// Sprite Classes
import Character from "./Character.js";

// a map component
export default class Map extends React.Component {

    //using componenet did mount for PIXI
    componentDidMount() {
        // PIXI renderer and settings
        const renderer = PIXI.autoDetectRenderer({
            antialias: true,
            autoDensity: true,
            resolution: window.devicePixelRatio || 1,
            width: 800,
            height: 600,
        });
        
        // declare variables being used
        let stage;
        let tilemap;
        let frame = 0;
        let keys = {};

        //characters in this map
        let player;
        let player2;
        let playerSheet = {};
        let stumpy;
        
        // append to the body
        document.body.appendChild(renderer.view);

        // listen for keys pressed
        window.addEventListener("keydown", keysDown);
        window.addEventListener("keyup", keysUp);
        
        //create the PIXI loader
        const loader = new PIXI.Loader();
        
        // add resources to the loader to use later
        loader.add('atlas', './src/game/images/StaticTiles.json'); //tiles
        loader.add('character', './src/game/images/character.json'); //character


        // on the load of the loader do the following
        loader.load((_, resources) => {
            // Setup tilemap scene
            stage = new PIXI.Container();
            tilemap = new CompositeTilemap();
            stage.addChild(tilemap);

            // create player
            loadPlayer();
        
            // Setup rendering loop
            PIXI.Ticker.shared.add(() => renderer.render(stage));
            PIXI.Ticker.shared.add(gameLoop);
        
            makeTilemap();
        });

        function keysDown(keyEvent) {
            keys[keyEvent.keyCode] = true;
        }

        function keysUp(keyEvent) {
            keys[keyEvent.keyCode] = false;
        }

        function gameLoop() {
    
            // W (north)
            if(keys["87"]) {
                player2.moveNorth();
            }

            // A (west)
            if(keys["65"]) {
                player2.moveWest();
            }

            // S (south)
            if(keys["83"]) {
                player2.moveSouth();
            }

            // D (east)
            if(keys["68"]) {
                player2.moveEast();
            }

            // shift (pickUp)
            if (keys["16"]) {
                player2.itemPickPlace();
            }
        }

        function loadPlayer() {
            const pxW = renderer.screen.width;
            const pxH = renderer.screen.height;
            player2 = new Character(
                pxW/2,
                pxH/2,
                "mainDude",
                "100"
            );
            console.log("playerSheet: ", player2);
            stage.addChild(player2);
            //player2.play();
        }
        
        function makeTilemap() {
            // Clear the tilemap, in case it is being reused.
            tilemap.clear();
        
            const size = 16;
        
            // Calculate the dimensions of the tilemap to build
            const pxW = renderer.screen.width;
            const pxH = renderer.screen.height;
            const tileW = pxW / size;
            const tileH = pxH / size;
        
            // Fill the scene with grass
            for (let i = 0; i < tileW; i++) {
                for (let j = 0; j < tileH; j++) {
                    tilemap.tile(
                        (j < tileH) && (i % 2 === 1) && (j % 2 === 1)
                            ? 'grass-0'
                            : 'grass-2',
                        i * size,
                        j * size,
                    );
                }
            }
            // Button does not appear in the atlas, but @pixi/tilemap won't surrender
            // - it will create second layer for special for buttons and they will
            // appear above all the other tiles.
            //tilemap.tile('player-south-0', 0, 0);
        }
    
    };
    render() {
        return (
            <div></div>
        )
    }
}