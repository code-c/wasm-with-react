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
        
        // append to the body
        document.body.appendChild(renderer.view);
        
        //create the PIXI loader
        const loader = new PIXI.Loader();
        
        // add resources to the loader to use later
        loader.add('atlas', './src/game/images/StaticTiles.json');
        //loader.add('shadow', shadow);

        // on the load of the loader do the following
        loader.load((_, resources) => {
            // Setup tilemap scene
            stage = new PIXI.Container();
            tilemap = new CompositeTilemap();
            stage.addChild(tilemap);
        
            // Setup rendering loop
            PIXI.Ticker.shared.add(() => renderer.render(stage));

            makeTilemap();
        
            // setInterval(() => {
            //     // Animate the chest tile textures. Since they are placed in 1 row
            //     // only, we only need to update tileAnim[0] (for x) and not
            //     // tileAnim[1] (for y).
            //     renderer.plugins.tilemap.tileAnim[0] = frame++;
            // }, 400);
        });
        
        function makeTilemap() {
            // Clear the tilemap, in case it is being reused.
            tilemap.clear();
        
            const resources = loader.resources;
            const size = 16;
        
            // Calculate the dimensions of the tilemap to build
            const pxW = renderer.screen.width;
            const pxH = renderer.screen.height;
            const tileW = pxW / size;
            const tileH = pxH / size;
        
            // Fill the scene with grass and sparse rocks on top and chests on
            // the bottom. Some chests are animated between two tile textures
            // (so they flash red).
            for (let i = 0; i < tileW; i++) {
                for (let j = 0; j < tileH; j++) {
                    tilemap.tile(
                        (j < tileH / 2) && (i % 2 === 1) && (j % 2 === 1)
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
            //tilemap.tile(tileSheet.grass, 0, 0);
        }
    };


    render() {
        return (
            <div></div>
        )
    }
}