import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

//testing the hello world wasm
import Hello from './external/Hello.js';
import HelloWASM from './external/Hello.wasm';

// NOW FOR FERNQUEST
import FernQuestInteract from './external/fernQuestOut/FernQuestInteract.js';
import FqInteractWASM from './external/fernQuestOut/FernQuestInteract.wasm';

// //assuming that this connects the wasm to the JS?
// const hello = Hello({
//     locateFile: () => {
//         return HelloWASM;
//     },
// });

// // again this connects the two?
const interact = FernQuestInteract({
    locateFile: () => {
        return FqInteractWASM;
    },
});

// // attempt to use the function outside of the "then" context
// interact.then((core) => {
//     const playerMove = core.playerMove();
//     console.log(playerMove);
// });


// // function operating as normal taking a string and outputting a result to console
// interact.then((core) => {
//     console.log(core.playerItemInteract("chest"));
// });

// // attempt to read the wasm file a dfferent way?
// FqInteractWASM().then(instance => {
//     const playerMove = instance.exports._z4facti;
//     console.log(playerMove());
// });
const theProgram = async () => {
    const interact = await FernQuestInteract({
        locateFile: () => {
            return FqInteractWASM;
        },
    });
    const playerMove = interact.playerMove();
    console.log('playerMove: ', playerMove);
}
let fq = {}
const fernQuest = async () => {
    const interact = await FernQuestInteract({
        locateFile: () => {
            return FqInteractWASM;
        },
    });
    console.log('interact: ', interact);
    return interact;
}


// // again this connects the two?
// const interact = await FernQuestInteract({
//     locateFile: () => {
//         return FqInteractWASM;
//     },
// });

// console.log('interact: ', interact);
// console.log('interact.playerMove(): ', interact.playerMove())

// fq = await fernQuest();
// console.log(fq)

theProgram();
// const playerMoved = fq.playerMove();

// console.log('interact: ', playerMoved);

//another attempt to lead
// WebAssembly.instantiateStreaming(fetch('/external/FernQuestInteract.wasm'))

ReactDOM.render(<App />, document.getElementById("root"))