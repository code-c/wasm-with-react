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
            resolution: window.devicePixelRatio || 2,
            width: 800,
            height: 600,
        });
        
        // declare variables being used
        let stage;
        let tilemap;
        let frame = 0;

        //characters in this map
        let player;
        let playerSheet;
        let stumpy;
        
        // append to the body
        document.body.appendChild(renderer.view);
        
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
            createPlayerSheet();
            loadPlayer();
            // // createCharacter();
            // // console.log(player)
            //stage.addChild(player);
        
            // Setup rendering loop
            PIXI.Ticker.shared.add(() => renderer.render(stage));

        
            makeTilemap();
            //createCharacter();
        });

        function createPlayerSheet() {
            let styleSheet = loader.resources['character'].textures;

            // playerSheet["standSouth"] = [
            //     new PIXI.Texture(styleSheet['player-south-0'])
            // ];
            // playerSheet["standWest"] = [
            //     new PIXI.Texture(styleSheet['player-west-0'])
            // ];
            // playerSheet["standEast"] = [
            //     new PIXI.Texture(styleSheet['player-east-0'])
            // ];
            // playerSheet["standNorth"] = [
            //     new PIXI.Texture(styleSheet['player-north-0'])
            // ];

            playerSheet = styleSheet;
            
            console.log(typeof(playerSheet.standSouth));
        }

        function loadPlayer() {
            let styleSheet = loader.resources['character'].textures;
            player = new PIXI.AnimatedSprite(styleSheet.animations["player-west-0"]);
            player.anchor.set(0.5);
            player.animationSpeed = .5;
            player.loop = false;
            player.x = renderer.view.width/2;
            player.y = renderer.view.height/2;
            stage.addChild(player);
            //player.play();
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
            tilemap.tile('player-south-0', 0, 0);
        }

        // create character function
        function createCharacter() {
            const resources = loader.resources;
            let charSheet = resources['character'].textures;
            console.log('player textures', resources['character'].textures);
            console.log('south', charSheet['player-south-0'])
            player = new Character(
                renderer.screen.width/2, 
                renderer.screen.height/2, 
                charSheet, 
                "Player", 
                100
            )
            //player.play()
        }
    
    };
    render() {
        return (
            <div></div>
        )
    }
}