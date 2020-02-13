import React, {ReactHTMLElement, useRef} from 'react';

export default function Focusable() {
    const myText = useRef<HTMLInputElement>(null);

    function focus() {
        // Already in typescript, not yet in JavaScript
        // myText?.current?.focus();

        // type guard
        if (!myText.current) return;
        // HERE myText.current is never null

        myText.current.focus();

    }

    return (
        <div>
            <input type="text" ref={myText} />
            <button onClick={focus}>Focus</button>
        </div>
    )
}