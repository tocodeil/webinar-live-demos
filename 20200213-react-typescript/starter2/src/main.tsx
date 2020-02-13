import React from "react";
import ReactDOM from "react-dom";

const App = () => {
    return (
        <p>Hello World</p>
    );
};

// main.js
const root = document.querySelector("main");
ReactDOM.render(<App />, root);
