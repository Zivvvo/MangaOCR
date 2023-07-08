import React from 'react'
import {Div} from 'atomize'
import {useEffect, useState, useMemo} from 'react'
import {Row, Col, Button, Anchor, Icon} from 'atomize'
import { useNavigate } from 'react-router-dom'
import Pagination from './pagination'

let PageSize = 10;

export function ChapterBrowser({data}){

    console.log(data)


    const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [data, currentPage]);

  return (
    <> <Div textAlign="center">

<table>
        <thead>
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
                <td>{item.title}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
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