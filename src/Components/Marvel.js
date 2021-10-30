import React, {useState, useEffect} from 'react';
import md5 from 'md5';

let ts = new Date().getTime();
let apiKey = '2c2549fc939a9967eafbca1eac727105';
let privateKey = 'c73e1da899cb71e0d29696c686623704d408d9f3';
let hash = md5(ts+privateKey+apiKey)


export const Marvel = () => {

    let [personaje, setpersonaje] = useState(null)

    useEffect(()=>{
        if(!navigator.onLine){
            if(localStorage.getItem("charactersMarvel") === null) {
                setpersonaje("Loading...")
            } else {
                setpersonaje( JSON.parse( localStorage.getItem( "charactersMarvel" ) ) );
            }
        } else {
            const URL = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${apiKey}&hash=${hash}`;
            fetch(URL).then(res=>res.json())
            .then(res=>{
                setpersonaje(res.data.results);

                localStorage.setItem("charactersMarvel",   JSON.stringify(res.data.results) );

            })
        }
    }, []);

    return (
        <div>
            
            {personaje && personaje.map( (element) => (

                <div>
                    <h2>{element.name}</h2>
                    <img  src={element.thumbnail.path+'.'+element.thumbnail.extension} alt={element.name} />
                    <p>{element.description}</p>
                    <br></br>
                </div>
            ))}
        </div>
    )
}
