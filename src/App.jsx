import React from 'react';
import './App.css';
import DrawMap from './DrawMap';

const App = () => {
    const[gameEngine, setGameEngine] = React.useState({})
    const[gameEngineLoaded, setGameEngineLoaded] = React.useState(false)


    React.useEffect(() => {
        // load fq
        //fq.then((core) => {
            //setGameEngine(core)
            //setGameEngineLoaded(true)
        //})
    }, [])

    return (
    <div className="container">
        {gameEngineLoaded && <h1>{gameEngine.playerMove()}</h1>}
        {!gameEngineLoaded && <h1>Hello World, React!</h1>}
        <DrawMap/>
    </div>
    )
}

export default App;
