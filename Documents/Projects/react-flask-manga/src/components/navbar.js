import {Div, Dropdown, Anchor, Button, Icon} from 'atomize';
import  SearchBar  from "./searchbar";
import React, {useState} from 'react'
import DropMenu from './dropdown';

const display = { xs: 'None', md: "inline-block" }
const display2 = { xs: 'inline-block', md: 'None'}

function Navbar() {

    const [open, setOpen] = useState(false);

    const menuItems = [
        {name: "Home", url : "/home"},
        {name: "Scan", url: "/scan"},
        {name: "Contact", url: "/contact"}]

    const toggle = (event) => {
        if (open === true) {
            console.log(open)
            setOpen(false)
        }else{
            console.log(open)
            setOpen(true)
        }

    }
    return (
        <>
        <Div
        d={{xs:"flex", md:"flex"}}
        justify={{xs:"space-between", md:"space-around"}}
        bg="gray300"
        w="100vw"
        p={{ x: "2rem", y: "2rem" }}
    >
        <Div d = 'flex' justify={{xs:"space-between", md:"space-around"}} align="center" p={{ l: '0rem', r: '0rem', y: '0.3rem' }}  textColor="grey" textSize="heading">
            MangaOCR
        </Div>

        {menuItems.map((curr) => (
            <Div d = {display} p="1rem" textColor="grey">
            <Button p ={{ l: '0.6rem', r: '0.6rem', x :'0.5rem', y: '0.5rem' }} bg = "gray300" textColor="gray700" hoverBg="gray400"><Anchor href={curr.url}>{curr.name}</Anchor></Button>
        </Div>))

        }
        
        <Div d = {display } p={{ l: '0rem', r: '0rem', y: '1rem' }} textColor="grey">
            <SearchBar/>
        </Div>

        <Div d = {display2} p = {{ l: '0rem', r: '0rem', y: '0.7rem' }}>

        <Button
    h="2.5rem"
    w="2.5rem"
    bg="info300"
    hoverBg="info400"
    rounded="lg"
    m={{ r: "1rem" }}
   onClick = {e => toggle(e)}>
    <Icon name="Menu" size="20px" />
  </Button>
        </Div>
</Div>
<Div
        d={{md: "none"}}
        justify={{xs:"space-between", md:"space-around"}}
        w="100vw"
        p={{ x: "0rem", y: "0rem" }}>
        {open? (<DropMenu menuItems = {menuItems}/>) : null}
        
    </Div></>);
}

export default Navbar;