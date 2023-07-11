import React from 'react'
import {Div} from 'atomize'
import {useEffect, useState, useMemo} from 'react'
import {Row, Col, Button, Anchor, Icon} from 'atomize'
import { useNavigate } from 'react-router-dom'
import Pagination from './pagination'

let PageSize = 10;

export function ReadingPanel({data}){

    console.log(data)

    const navigate = useNavigate()

    const handleClick = (event) => {
        let currID = event.target.dataset.id

        console.log(currID)
        navigate("/reader", {state:{id: currID}})
    }


const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [data, currentPage]);

  return (
    <> <Div d="flex" justify="center">

    <table margin-left="auto" margin-right="auto">
        <thead >
          <tr>
            <th>Chapter Number</th>
            <th>Title</th>

          </tr>
        </thead>
        <tbody>
          {currentTableData.map(item => {
            return (
              <tr>
                <td>{item.chapterNumber}</td>
                <td><Anchor data-id = {item.id} onClick={(event)=>{handleClick(event)}}>{item.title}</Anchor></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </Div>
      <Div d="flex" justify="center">
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
      </Div>

    
      
    </>
  );
}