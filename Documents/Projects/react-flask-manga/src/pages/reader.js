import React, {useState, useEffect} from 'react'
import {Div, Image, Anchor} from 'atomize'
import {useLocation, useNavigate} from 'react-router-dom'
import { server } from '../proxy';
import { ChapterBrowser } from '../components/chapterBrowser';

import { PageBrowser } from '../components/pageBrowser';


function Reader() {

    const [pages, setPages] = useState([])

    const location = useLocation()

    useEffect(
        ()=>{
            fetch( server+'/read?' + new URLSearchParams({id: location.state.id}))
            .then(res => res.json() )
            .then(res => setPages(res.imgs))
            .then(()=>console.log(pages))
        }
    )

    return (
        <PageBrowser data={pages}/>
    )

    
}

export default Reader;