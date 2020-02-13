import React from 'react';
import logo from './logo.svg';
import './App.css';
import { twice } from "./utils";
import Focusable from "./06-ref-type-guards/focusable";

const App = () => {
    const x = twice(2);
    const stuff = ['one', 'two', 'three', 'four', 'five'];
    const u : IUser = { name: 'joe' };
    console.dir(u);

    return (
        <div className="App">
            <Focusable/>
        </div>
    );
};

export default App;
