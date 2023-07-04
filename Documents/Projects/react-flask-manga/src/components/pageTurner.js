import React from 'react'
import {Div} from 'atomize'
import {useEffect, useState} from 'react'
import {Row, Col, Button, Anchor, Icon} from 'atomize'
import { useNavigate } from 'react-router-dom'

export function PageIndex({query, nPages, currentPage}){

    console.log(nPages)
    console.log(currentPage)

    const [currPage, changePage] = useState(currentPage)

    const n = parseInt(nPages)

    const [btnList, setList] = useState([])

    const navigate = useNavigate()

    const flip = (event) => {
        let dir = event.target.dataset.id
        console.log(event.target.dataset.id)
        console.log(currentPage)
        if (dir === "left" && currPage > 0){
            if (window.location.pathname === "/browse") {
                navigate(0)
              }
              navigate("/browse", {state:{title: query ,page: currPage - 1}})

        }
        else if (dir === "right" && currPage < nPages) {
            if (window.location.pathname === "/browse") {
                navigate(0)
              }
              navigate("/browse", {state:{title: query , page: currPage + 1}})

        }
        
    }

    const handleClick =(event) => {
        
        const selectedPage = event.target.dataset.id
        console.log(selectedPage)
        console.log(query)
        if (window.location.pathname === "/browse") {
            navigate(0)
          }
          navigate("/browse", {state:{title: query , page: selectedPage}})
    } 

    useEffect(()=>{
        const l = []
        console.log(n)
        l.push(<Col size = "1"><Button data-id = "left" onClick = {(event)=>{flip(event)}} bg="info400" hoverBg="info600">{"<"}</Button></Col>)
        for (let i = 0; i<n; i++) {
            if (i+1 == currPage) {
                l.push(
                    <Col size = "1"><Button data-id = {i+1} onClick = {(event)=>{handleClick(event)}} bg="info700" hoverBg="info600">{i+1}</Button></Col>
                )
            }
            else {
                l.push(
                    <Col size = "1"><Button data-id = {i+1} onClick = {(event)=>{handleClick(event)}} bg="info400" hoverBg="info600">{i+1}</Button></Col>
                )
            }
            
        }
        l.push(<Col size = "1"><Button data-id = "right" onClick = {(event)=>{flip(event)}} bg="info400" hoverBg="info600">{">"}</Button></Col>)
        console.log(l)
        setList(l)
    },[])


    return (<Div
        
        textColor="gray600"
        position="fixed"
      >
        <Row justify="center">

            {btnList}

        </Row>
        
      </Div>)
}