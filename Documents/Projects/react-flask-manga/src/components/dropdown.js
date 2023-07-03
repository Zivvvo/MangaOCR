import { Div, Tag, Anchor, Icon, Button } from "atomize";
import React, {useState} from "react";
import SearchBar from "./searchbar";

function DropMenu({menuItems}) {
    
    const menuItemList = menuItems

    return (
        <Div 
        d="inline-block"
        justify="space-around"
        align="center"
        
        p="0rem"
        w="100vw"> 
        <SearchBar></SearchBar>
    {menuItems.map((curr) => (
            <Button w="100vw" d="flex" bg="gray400" hoverBg="gray500" justify="space-around" p="1rem" textColor="gray700">
            <Anchor href={curr.url}>{curr.name}</Anchor>
        </Button>))

        }
  </Div>
        
    )

}

export default DropMenu;