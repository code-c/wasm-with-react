import * as PIXI from "pixi.js";


export default class Character extends PIXI.AnimatedSprite {
    constructor(x = 0, y = 0, texture, name = "phil", hp="100") {
        // like PIXI.texture.from to create sprite from texture
        //fromFrames(textures);
        super(texture);
        console.log('character texture', this.textures)
        //work with it set values
        //this.animationSpeed = .5;
        this.anchor.set(0.5);
        //this.loop = true;
        this.name = name;

        this.hp=hp;
        this.y = y;
        this.x = x;
    }
}