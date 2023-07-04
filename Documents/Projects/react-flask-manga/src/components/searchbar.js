import { Input, Button, Icon } from "atomize";
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'


function SearchBar () {

  const [query, setQuery] = useState("")

  const navigate = useNavigate()

  const handleChange = (event) => {
    console.log(event.target.value)
    setQuery(event.target.value)
  }

  const handleClick = (event) => {
    console.log("clicked")

    if (window.location.pathname == "/browse") {
      navigate(0)
    }
    navigate("/browse", {state:{title: query ,page:"1"}})

  }

  return (
    <Input
      placeholder="Search"
      onChange = {(e) => {handleChange(e)}}
      suffix={
        <Button
          pos="absolute"
          onClick={(e) => {handleClick(e)}}
          bg="info500"
          hoverBg="info600"
          top="0"
          right="0"
          rounded={{ r: "md" }}
        >
         Search
        </Button>
      }
    />
  );
}
export default SearchBar;