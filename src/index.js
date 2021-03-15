import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

//import our wasm and its ascociated js file
import Hello from './external/Hello.js'; // lader doesnt like this line lets fix
import HelloWASM from './external/Hello.wasm';

const sample = Hello({
    locateFile: () => {
        return HelloWASM;
    },
});

// Hello.then((core) => {
//     console.log(core.printHello());
// });

ReactDOM.render(<App />, document.getElementById("root"))