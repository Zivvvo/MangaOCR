import React from 'react'
import {Div} from 'atomize'
import {useLocation} from 'react-router-dom'

function MangaDetails() {
    const location = useLocation();
    return ( <Div>{location.state.id}</Div> );
}

export default MangaDetails;