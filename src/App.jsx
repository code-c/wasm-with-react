import React from 'react';
import './App.css';
//import DrawMap from './DrawMap';
import GameRender from './game/GameRender';
// load fernQuest backend
import FernQuestInteract from './external/fernQuestOut/FernQuestInteract.js';
import FqInteractWASM from './external/fernQuestOut/FernQuestInteract.wasm';

const App = () => {
    const[gameEngine, setGameEngine] = React.useState({})
    const[gameEngineLoaded, setGameEngineLoaded] = React.useState(false)


    React.useEffect(() => {
        const interact = FernQuestInteract({
            locateFile: () => {
                return FqInteractWASM;
            },
        });
        interact.then((core) => {
            setGameEngine(core)
            setGameEngineLoaded(true)
        })
    }, [])

    return (
    <div className="container">
        {gameEngineLoaded && <h1>{gameEngine.playerMove()}</h1>}
        {!gameEngineLoaded && <h1>Hello World, React!</h1>}
        <GameRender/>
    </div>
    )
}

export default App;
