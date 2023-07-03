import { Input, Button, Icon } from "atomize";
import React, { useState } from 'react';


function SearchBar () {

  const [query, setQuery] = useState("")

  const handleChange = (event) => {
    console.log(event.target.value);
    

  }

  const handleClick = (event) => {
    setQuery(event.target.value);
    console.log("clicked");
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