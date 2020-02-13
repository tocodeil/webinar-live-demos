import React from 'react';
import logo from './logo.svg';
import './App.css';
import { twice } from "./utils";

const App = () => {
    const x = twice(2);
    const stuff = ['one', 'two', 'three', 'four', 'five'];
    const u : IUser = { name: 'joe' };
    console.dir(u);

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    There are {x} candies in the box
                </p>
            </header>
        </div>
    );
};

export default App;
