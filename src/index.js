import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

//import our wasm and its ascociated js file
import Hello from './external/Hello.js'; // lader doesnt like this line lets fix
import HelloWASM from './external/Hello.wasm';

const hello = Hello({
    locateFile: () => {
        return HelloWASM;
    },
});

// fetch('./external/Hello.wasm').then(response => 
//     response.arrayBuffer()
//   ).then(bytes => 
//     WebAssembly.instantiate(bytes)
//   ).then(obj => {
//       console.log(obj.instance.exports.my_func());
//   });

hello.then((core) => {
    console.log(core.printHello());
});

ReactDOM.render(<App />, document.getElementById("root"))