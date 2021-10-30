import React, {useState, useEffect} from 'react';
import './styles.css';

export const Joke = () => {

    let [joke, setJoke] = useState(null)

    useEffect(()=>{
        if(!navigator.onLine){
            if(localStorage.getItem("joke") === null) {
                setJoke("Loading...")
            } else {
                setJoke(localStorage.getItem("joke"));
            }
        } else {
            const URL = "https://api.chucknorris.io/jokes/random";
            fetch(URL).then(res=>res.json()).then(res=>{
                setJoke(res.value);
                localStorage.setItem("joke", res.value);
            })
        }
    }, []);

    return (
        <div>
            <h1>Joke</h1>
            <p>{joke}</p>
        </div>
    )
}
