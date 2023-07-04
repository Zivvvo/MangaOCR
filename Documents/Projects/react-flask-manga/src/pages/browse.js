import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Div, Anchor, Image} from 'atomize';
import { Row, Col, Icon} from "atomize";
import {useLocation} from 'react-router-dom';
import {server} from '../proxy'
import {PageIndex} from '../components/pageTurner'

import atomize from 'atomize';

function Browser() {


    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false)

    const location = useLocation();
    

    const navigate = useNavigate();

    const handleClick = (event) => {
        let currID = event.target.dataset.id

        console.log(currID)
        navigate("/mangaDetails", {state:{id: currID}})
    }

    useEffect(() => {
        console.log(location.state)
        setLoading(true)
        fetch(server+'/search?' + new URLSearchParams({title: location.state.title, page: location.state.page})).then(res => res.json())
        .then(data => {
            //setData(data.data)
            return data.data})
        .then((data) => {

            //set up request arrays
            const promises = []
            

            for (let i = 0; i < data.length; i++) {

                promises.push(fetch(server+'/getImage?' + new URLSearchParams({id: data[i].id}))
                .then(res => {
                    console.log("new requests made")
                    return res.json()
                }))
        
                }
            
            
            return Promise.allSettled(promises).then(
                (res)=>{
                    console.log(res)
                    return [data, res]
                }
            );
      })
        .then( (input) => {

            let data = input[0]
            let imgs = input[1]

            const rows = []


            const columns = (data.map( (item, i)=> {
                return (
                    <Col size = "3">
                        <Image hoverShadow="4" cursor="pointer" rounded="md"  data-id = {item.id} src={imgs[i]?imgs[i].value.url:null } onClick={(event)=>{handleClick(event)}} alt={item.title}></Image>
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
            setLoading(false)
            
                
        }
            
        )}, [])

    return ( 
    
    <>
    {loading?<Div p = {{x: "1rem", y: "2rem"}} textAlign="center" justify="space-around">
         <Icon name="Loading" size="40px" /></Div>:
        null}
    

    <Div justify="center">

        
        
        {results?
        results
        : null}
        

        <PageIndex query={location.state.title} nPages={10} currentPage={location.state.page}></PageIndex>


    </Div>
    
    
    </> );
}

export default Browser;