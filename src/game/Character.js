import * as PIXI from "pixi.js";

let playerSheet = {};
let speed = 2;
let direction = "";
let carrying = false;

export default class Character extends PIXI.AnimatedSprite {
    constructor(x = 0, y = 0, name = "phil", hp="100") {
        // like PIXI.texture.from to create sprite from texture
        //fromFrames(textures);
        createPlayerSheet();
        super(playerSheet.standSouth);
        //work with it set values
        this.animationSpeed = .2;
        this.anchor.set(0.5);
        this.loop = false;
        this.name = name;

        this.hp=hp;
        this.y = y;
        this.x = x;
        this.scale.x = 2;
        this.scale.y = 2;
    }

    moveNorth() {
        direction = "north";
        if(!this.playing){
            if(carrying){
                this.textures = playerSheet.carryNorth;
            }
            else this.textures = playerSheet.walkNorth;
            this.play();
        }
        this.y -= speed;
    }

    moveSouth() {
        direction = "south";
        if(!this.playing){
            if(carrying){
                this.textures = playerSheet.carrySouth;
            }
            else this.textures = playerSheet.walkSouth;
            this.play();
        }
        this.y += speed;
    }

    moveEast() {
        direction = "east";
        if(!this.playing){
            if(carrying){
                this.textures = playerSheet.carryEast;
            }
            else this.textures = playerSheet.walkEast;
            this.play();
        }
        this.x += speed;
    }

    moveWest() {
        direction = "west";
        if(!this.playing){
            if(carrying){
                this.textures = playerSheet.carryWest;
            }
            else this.textures = playerSheet.walkWest;
            this.play();
        }
        this.x -= speed;
    }

    itemPickPlace() {
        if(carrying){
            this.place();
        } 
        else this.pickup();
    }

    pickup() {
        if(!this.playing){
            switch(direction){
                case "north":
                    this.textures = playerSheet.pickupNorth;
                    this.play();
                    break;
                case "south":
                    this.textures = playerSheet.pickupSouth;
                    this.play();
                    break;
                case "east":
                    this.textures = playerSheet.pickupEast;
                    this.play();
                    break;
                case "west":
                    this.textures = playerSheet.pickupWest;
                    this.play();
                    break;
                default:
                    this.textures = playerSheet.pickupSouth;

            }
            carrying = true;
        }
    }

    place() {
        if(!this.playing){
            switch(direction){
                case "north":
                    this.textures = playerSheet.placeNorth;
                    this.play();
                    break;
                case "south":
                    this.textures = playerSheet.placeSouth;
                    this.play();
                    break;
                case "east":
                    this.textures = playerSheet.placeEast;
                    this.play();
                    break;
                case "west":
                    this.textures = playerSheet.placeWest;
                    this.play();
                    break;
                default:
                    this.textures = playerSheet.placeSouth;

            }
            carrying = false;
        }
    }
}

function createPlayerSheet() {
    const loader = new PIXI.Loader();
        
    // add resources to the loader to use later
    loader.add('character', './src/game/images/character.json'); //character

    // load standing directions from stylesheet
    playerSheet["standNorth"] = [
        new PIXI.Texture.from('player-north-0.png')
    ];
    playerSheet["standSouth"] = [
        new PIXI.Texture.from('player-south-0.png')
    ];
    playerSheet["standEast"] = [
        new PIXI.Texture.from('player-east-0.png')
    ];
    playerSheet["standWest"] = [
        new PIXI.Texture.from('player-west-0.png')
    ];

    //load walking directions from stylesheet
    playerSheet["walkNorth"] = [
        new PIXI.Texture.from('player-north-0.png'),
        new PIXI.Texture.from('player-north-1.png'),
        new PIXI.Texture.from('player-north-2.png'),
        new PIXI.Texture.from('player-north-3.png'),
        new PIXI.Texture.from('player-north-0.png')
    ];
    playerSheet["walkSouth"] = [
        new PIXI.Texture.from('player-south-0.png'),
        new PIXI.Texture.from('player-south-1.png'),
        new PIXI.Texture.from('player-south-2.png'),
        new PIXI.Texture.from('player-south-3.png'),
        new PIXI.Texture.from('player-south-0.png')
    ];
    playerSheet["walkEast"] = [
        new PIXI.Texture.from('player-east-0.png'),
        new PIXI.Texture.from('player-east-1.png'),
        new PIXI.Texture.from('player-east-2.png'),
        new PIXI.Texture.from('player-east-3.png'),
        new PIXI.Texture.from('player-east-0.png')
    ];
    playerSheet["walkWest"] = [
        new PIXI.Texture.from('player-west-0.png'),
        new PIXI.Texture.from('player-west-1.png'),
        new PIXI.Texture.from('player-west-2.png'),
        new PIXI.Texture.from('player-west-3.png'),
        new PIXI.Texture.from('player-west-0.png')
    ];

    //load pickup directions from stylesheet
    playerSheet["pickupNorth"] = [
        new PIXI.Texture.from('player-pickup-north-0.png'),
        new PIXI.Texture.from('player-pickup-north-1.png'),
        new PIXI.Texture.from('player-pickup-north-2.png')
    ];
    playerSheet["pickupSouth"] = [
        new PIXI.Texture.from('player-pickup-south-0.png'),
        new PIXI.Texture.from('player-pickup-south-1.png'),
        new PIXI.Texture.from('player-pickup-south-2.png')
    ];
    playerSheet["pickupEast"] = [
        new PIXI.Texture.from('player-pickup-east-0.png'),
        new PIXI.Texture.from('player-pickup-east-1.png'),
        new PIXI.Texture.from('player-pickup-east-2.png')
    ];
    playerSheet["pickupWest"] = [
        new PIXI.Texture.from('player-pickup-west-0.png'),
        new PIXI.Texture.from('player-pickup-west-1.png'),
        new PIXI.Texture.from('player-pickup-west-2.png')
    ];

    //load placing directions from stylesheet
    playerSheet["placeNorth"] = [
        new PIXI.Texture.from('player-pickup-north-2.png'),
        new PIXI.Texture.from('player-pickup-north-1.png'),
        new PIXI.Texture.from('player-pickup-north-0.png'),
        new PIXI.Texture.from('player-north-0.png')
    ];
    playerSheet["placeSouth"] = [
        new PIXI.Texture.from('player-pickup-south-2.png'),
        new PIXI.Texture.from('player-pickup-south-1.png'),
        new PIXI.Texture.from('player-pickup-south-0.png'),
        new PIXI.Texture.from('player-south-0.png')
    ];
    playerSheet["placeEast"] = [
        new PIXI.Texture.from('player-pickup-east-2.png'),
        new PIXI.Texture.from('player-pickup-east-1.png'),
        new PIXI.Texture.from('player-pickup-east-0.png'),
        new PIXI.Texture.from('player-east-0.png')
    ];
    playerSheet["placeWest"] = [
        new PIXI.Texture.from('player-pickup-west-2.png'),
        new PIXI.Texture.from('player-pickup-west-1.png'),
        new PIXI.Texture.from('player-pickup-west-0.png'),
        new PIXI.Texture.from('player-west-0.png')
    ];

    //carrying directions from stylesheet
    playerSheet["carryNorth"] = [
        new PIXI.Texture.from('player-carry-north-0.png'),
        new PIXI.Texture.from('player-carry-north-1.png'),
        new PIXI.Texture.from('player-carry-north-2.png'),
        new PIXI.Texture.from('player-carry-north-3.png'),
        new PIXI.Texture.from('player-carry-north-0.png')
    ];
    playerSheet["carrySouth"] = [
        new PIXI.Texture.from('player-carry-south-0.png'),
        new PIXI.Texture.from('player-carry-south-1.png'),
        new PIXI.Texture.from('player-carry-south-2.png'),
        new PIXI.Texture.from('player-carry-south-3.png'),
        new PIXI.Texture.from('player-carry-south-0.png')
    ];
    playerSheet["carryEast"] = [
        new PIXI.Texture.from('player-carry-east-0.png'),
        new PIXI.Texture.from('player-carry-east-1.png'),
        new PIXI.Texture.from('player-carry-east-2.png'),
        new PIXI.Texture.from('player-carry-east-3.png'),
        new PIXI.Texture.from('player-carry-east-0.png')
    ];
    playerSheet["carryWest"] = [
        new PIXI.Texture.from('player-carry-west-0.png'),
        new PIXI.Texture.from('player-carry-west-1.png'),
        new PIXI.Texture.from('player-carry-west-2.png'),
        new PIXI.Texture.from('player-carry-west-3.png'),
        new PIXI.Texture.from('player-carry-west-0.png')
    ];

    playerSheet["acquire"] = [
        new PIXI.Texture.from("player-acquire-0.png")
    ];
    
    console.log(playerSheet);
}
