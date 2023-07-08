import React, {useState, useEffect} from 'react'
import {Div, Image, Anchor} from 'atomize'
import {useLocation, useNavigate} from 'react-router-dom'
import { server } from '../proxy';

function MangaDetails() {
    const location = useLocation();

    const navigate = useNavigate();

    const [mangaDetails, setDetails] = useState(
        {
            title: null,
            description: null,
            genres: null,
            image: null,
            chapterList: [],
        }
    );

    const [chapterList, setChapterList] = useState(
        []
    )

    const handleClick = (event) => {
        console.log(event.target)

        const data =event.target.dataset

        navigate("/reader", {state: {id: data.id}})
    }

    useEffect(()=> {

        fetch(server+'/info?' + new URLSearchParams({id: location.state.id})).then(res => res.json())
        .then((res)=>{
            console.log(res)
            setDetails(res)
            console.log(mangaDetails)
            return res.chapters
        })
        .then(res=>{
            console.log(res)
            setChapterList(res.map((item, i )=>{
                return (
                    <li columns= "100px 3"><Anchor data-id = {item.id} onClick={(event)=>{handleClick(event)}}>{item.chapterNumber}: {item.title}</Anchor></li>
                )
            }))

        })
    }, [])



    return ( <><Div textAlign="center">

        <Image  src={mangaDetails.image} rounded="md" h = "auto" w={{xs:"10rem",md:"25rem"}} alt="missing image"></Image>
        <br/>
        <h1>{mangaDetails.title}</h1>
        <p>{mangaDetails.description}</p>

        
        
    </Div>
    <ul>{chapterList?chapterList:null}</ul>
    
    </> );
}

export default MangaDetails;