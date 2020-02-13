import React, {ReactHTMLElement, useRef} from 'react';

export default function Focusable(props) {
    const myText = useRef(null);

    function focus() {
        myText.current.focus();
    }

    return (
        <div>
            <input type="text" ref={myText} />
            <button onClick={focus}>Focus</button>
        </div>
    )
}