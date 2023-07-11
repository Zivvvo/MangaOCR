import React, { useContext } from 'react'
import {Div} from 'atomize'
import {useEffect, useState, useMemo} from 'react'
import {Row, Col, Button, Anchor, Icon, Image} from 'atomize'
import { useNavigate } from 'react-router-dom'
import Pagination from './pagination'
import { PageContext } from '../pages/reader'

let PageSize = 1;

export function PageBrowser({data}){

    //console.log(data)


const {currentPage, setCurrentPage, overlay, setOverlay, layout, setLayout} = useContext(PageContext);

//const OverlayLayout = [<div style = {{"position": "absolute", "top": "0px", "background-color": "#EBEBEB"}}>OVERLAY</div>]

useEffect(()=>{
  console.log(currentPage)
})


  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [data, currentPage]);

  return (
    <> <Div className="parent" d="flex" justify="center">

    
    
    
    <table margin-left="auto" margin-right="auto">
        
        <tbody>
          {currentTableData.map(item => {
            return (
              <tr>
                <td><div style = {{"position": "relative"}}><Image src={item.img} alt="missing page"/>{layout? layout:null}</div></td>
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
        onPageChange={page => {
          setCurrentPage(page)
          setLayout(null)
        }}
      />
      </Div>

    
      
    </>
  );
}