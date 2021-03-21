import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

//testing the hello world wasm
import Hello from './external/Hello.js';
import HelloWASM from './external/Hello.wasm';

//assuming that this connects the wasm to the JS?
const hello = Hello({
    locateFile: () => {
        return HelloWASM;
    },
});

// NOW FOR FERNQUEST
import FernQuestInteract from './external/fernQuestOut/FernQuestInteract.js';
import FqInteractWASM from './external/fernQuestOut/FernQuestInteract.wasm';

// again this connects the two?
const interact = FernQuestInteract({
    locateFile: () => {
        return FqInteractWASM;
    },
});

// attempt to use the function outside of the "then" context
interact.then((core) => {
    const playerMove = core.playerMove();
    return playerMove;
});

// function operating as normal taking a string and outputting a result to console
interact.then((core) => {
    console.log(core.playerItemInteract("chest"));
});

// attempt to read the wasm file a dfferent way?
FqInteractWASM().then(instance => {
    const playerMove = instance.exports._z4facti;
    console.log(playerMove());
});

WebAssembly.instantiateStreaming(fetch('/external/FernQuestInteract.wasm'))

ReactDOM.render(<App />, document.getElementById("root"))