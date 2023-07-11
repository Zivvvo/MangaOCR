import React, { Component, useState, useContext } from 'react';

import {Div, Dropdown, Anchor, Button} from 'atomize';
import { server } from '../proxy';
import { PageContext } from '../pages/reader';


export function OCRTool({img, data}) {

    const [results, setResults] = useState({})
    const [currLanguage, setCurrLanguage] = useState("Current Language")
    const [toLanguage, setToLanguage] = useState("Translate to...")

    const {currentPage, setCurrentPage, overlay, setOverlay, layout, setLayout} = useContext(PageContext)

    const languages = ['English', 'Chinese', 'Japanese']
    const currLanguageList = languages.map((name, index) => (
        <Anchor onClick = {()=>{setCurrLanguage(name)}}d="block" p={{ y: "0.25rem" }}>
          {name}
        </Anchor>
      ))

    const toLanguageList = languages.map((name, index) => (
        <Anchor onClick = {()=>{setToLanguage(name)}}d="block" p={{ y: "0.25rem" }}>
          {name}
        </Anchor>
      ))

    const [showDropdown, setState] = useState(false)
    const [showDropdown2, setState2] = useState(false)

    const handleSubmit = async (e) => {
        
        if (currLanguage === "Current Language" || 
        toLanguage === "Translate to ...") {
            alert("You need pick the two languages for translation!")
        }
        else {
            console.log(data)
            console.log(currentPage)
            //await function has to return something
            const response = await fetch(server+'/scan?' + new URLSearchParams({img: data[currentPage-1].img, from: languages.indexOf(currLanguage), to: languages.indexOf(toLanguage)})).then((res)=>{return res}) 
            console.log(response)

            //generate overlay
            if (response.status === 200) {
                setOverlay(true)
                console.log(overlay)
                //make overlay jsx and set it to the context
                const res = await response.json()
                console.log(res.results.ParsedResults[0].TextOverlay.Lines)
                const sentenceList = res.results.ParsedResults[0].TextOverlay.Lines
                console.log(sentenceList)
                const coordList = sentenceList.map((item, i) => {
                    return [item.Words[0].Left, item.MinTop, item.MaxHeight]
                })

                const overlayList = sentenceList.map((item, i) => {
                    return (<div style = {{"padding":"0", "background": "rgba(255, 255, 255, .7)","font-size":item.MaxHeight, "left": item.Words[0].Left ,"position": "absolute", "top": item.MinTop, "background-color": "#EBEBEB"}}>{item.LineText}</div>)

                })

                setLayout(overlayList)
                
                //[<div style = {{"position": "absolute", "top": "0px", "background-color": "#EBEBEB"}}>OVERLAY</div>]
                
            }
            else {
                alert("OCR Failure")
            }
        }

    }

    const handleCancel = (e) => {

        setLayout(null)

    }

    return(
        <>
        <Div d= "flex" p = {{l: {md:"25rem"}, r: {md: "25rem"}}}>

            <Dropdown
                isOpen = {showDropdown}
                onClick = {()=>{ 
                    setState(!showDropdown)
                }}
                menu={currLanguageList}
            >

                {currLanguage}
            </Dropdown>

            <Dropdown
                isOpen = {showDropdown2}
                onClick = {()=>{ 
                    setState2(!showDropdown2)
                }}
                menu={toLanguageList}
            >

                {toLanguage}
            </Dropdown>

            <Button bg= "info700" hoverBg = "info500" onClick={(e)=>{handleSubmit(e)}}>Submit</Button>
            <Button bg="brand700" hoverBg = "brand500" onClick={(e)=>{handleCancel(e)}}>Cancel</Button>
        </Div>
        
        </>
    )

}