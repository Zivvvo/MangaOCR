import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Div, Anchor, Image} from 'atomize';
import { Row, Col } from "atomize";

import atomize from 'atomize';

function Browser({searchParams}) {

    const [results, setResults] = useState([]);

    const [images, setImages ] = useState([]);

    const navigate = useNavigate();

    const handleClick = (event) => {
        let currID = event.target.dataset.id
        console.log(currID)
        navigate("/mangaDetails", {state:{id: currID}})
    }

    useEffect(() => {
        fetch('/search?' + new URLSearchParams({title: 'demon', page: '2'})).then(res => res.json())
        .then(data => data.data)
        .then((data) => {

            //set up request arrays
            const promises = []
            

            for (let i = 0; i < data.length; i++) {

                promises.push(fetch('/getImage?' + new URLSearchParams({id: data[i].id}))
                .then(res => {
                    console.log("new requests made")
                    return res.json()
                }))
        
                }
            
            
            Promise.allSettled(promises).then(
                (res)=>{
                    setImages(res)
                    console.log(res)
                }
            )
            
            return data;
      })
        .then( async (input) => {

            let data = input

            const rows = []

            console.log(images)

            const columns = (data.map( (item, i)=> {
                return (
                    <Col size = "3">
                        <Image src={images[i]?images[i].value.url:""} alt={item.title}></Image>
                        <Anchor data-id = {item.id} onClick={(event)=>{handleClick(event)}}>{item.title}</Anchor>
                    </Col>
                    )
            }
                
                ))
            
            console.log(columns)


            for (let i = 0; i < 5; i++){
                rows.push(
                    <><Row>{columns.slice(i*4, i*4+4)}</Row><br></br></>
                )
            }
            
            setResults(rows)
            
                
        }
            
        )}, [])

    return ( 
    
    <>
    
    <Div>
        
        {results?
        results
        : (null)}
        

        


    </Div>
    
    
    </> );
}

export default Browser;