import React, { useState, useEffect } from "react";
import axios from "axios";

interface IData {
    name: string,
    height: string,
    birth_year: string,
    films: string[],
}

interface IDataFilm {
    title: string,
    release_date: string,
    characters: string,
}

// useRemoteData is called a Custom Hook
function useRemoteData<T>(endpoint: string, id: string) {
    const [data, setData] = useState<T|null>(null);

    useEffect(function() {
        setData(null);
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        const req = axios.get(`https://swapi.co/api/${endpoint}/${id}/`, {
            cancelToken: source.token,
        });
        req.then(function(response) {
            // when we get response
            setData(response.data);
        });

        return function cancel() {
            source.cancel();
        }
        // code continues here
    }, [id]);

    return data;
}

function FilmInfo(props: { id: string }) {
    const { id } = props;
    // Get character data ???
    const data = useRemoteData<IDataFilm>('films', id);

    if (data === null) {
        return <p>Loading, please wait...</p>
    }

    return (
        <div>
            <p>title: {data.title}</p>
            <p>release_date: {data.release_date}</p>
            { /* <p>characters: {data.characters}</p> */ }
            <hr />
        </div>
    )

}

function parse(filmUrl: string): string {
    const res = filmUrl.match(/(\d+)\/$/);
    if (res == null) {
        return "";
    }
    return res[1];
}

function CharacterInfo(props: { id: string }) {
    const { id } = props;
    const data = useRemoteData<IData>('people', id);

    // Get character data ???
    if (data === null) {
        return <p>Loading, please wait...</p>
    }

    return (
        <div>
            <p>Name: {data.name}</p>
            <p>Height: {data.height}</p>
            <p>Birth Year: {data.birth_year}</p>
            <p>Films:</p>
            {
                data.films.map(filmUrl => (
                    <FilmInfo id={parse(filmUrl)} />
                ))
            }
        </div>
    )
}

export default function DemoPage() {
    const [id, setId] = useState('1');

    return (
        <div>
            <p>Character id = {id}</p>
            <input type="number" value={id} onChange={(e) => setId(e.target.value)} />
            <CharacterInfo id={id} />
        </div>

    )
}
