import React from 'react'
import {Div} from 'atomize'
import {useEffect, useState, useMemo} from 'react'
import {Row, Col, Button, Anchor, Icon, Image} from 'atomize'
import { useNavigate } from 'react-router-dom'
import Pagination from './pagination'

let PageSize = 1;

export function PageBrowser({data}){


const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [data, currentPage]);

  return (
    <> <Div d="flex" justify="center">

    <table margin-left="auto" margin-right="auto">
        
        <tbody>
          {currentTableData.map(item => {
            return (
              <tr>
                <td><Image src={item.img} alt="missing page"/></td>
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