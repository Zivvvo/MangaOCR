import React, {useState, useEffect, useContext, createContext} from 'react'
import {Div, Image, Anchor} from 'atomize'
import {useLocation, useNavigate} from 'react-router-dom'
import { server } from '../proxy';
import { ChapterBrowser } from '../components/chapterBrowser';

import { PageBrowser } from '../components/pageBrowser';
import { OCRTool } from '../components/ocrTool';

export const PageContext = createContext();

function Reader() {

    const [pages, setPages] = useState(null)
    const [currentPage, setCurrentPage] = useState(1);
    
    //overlayBoolean
    const [overlay, setOverlay] = useState(false)

    //overlay layout
    const [layout, setLayout] = useState(null)

    const location = useLocation()

    useEffect(
        ()=>{
            fetch( server+'/read?' + new URLSearchParams({id: location.state.id}))
            .then(res => res.json() )
            .then(res => { 
                if (res.hasOwnProperty('message')) {
                    console.log("message exists")
                    setPages([]) 
                }
                else {
                    setPages(res.imgs)
                    //setSelectedPage(res.imgs[1])
                
                }
            })
            .then(()=> {
                console.log(pages)
            })
        }
    , [])

    return (
        <>
        <PageContext.Provider value = {{currentPage, setCurrentPage, overlay, setOverlay, layout, setLayout}}>
        <OCRTool img = {currentPage} data = {pages}/>
        <Div position="absolute">
        {pages?<PageBrowser data={pages}/>:null}
        </Div>
        
        </PageContext.Provider>
        
        </>
    )

    
}

export default Reader;