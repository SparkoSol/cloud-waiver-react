import CheckboxInput from "./inputs/CheckboxInput.jsx";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

const DataTable = ({
                     items,
                     headers,
                     TableRow,
                     colspan = 1,
                     bordered = false,
                     pageSize: PageSize = 10,
                     paginationDetails,
                     setSearchParam,
                     selectAll,
                     functionCall,
                     emptyMessage = 'Nothing here yet!'
                   }) => {
  const location = useLocation().pathname;
  return (
    (<>
      <div className={`flex flex-col overflow-x-auto relative sm:rounded-lg py-2 font-mulish`}>
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table
                className={`w-full text-sm text-left text-gray-500 ${colspan !== 1 ? 'border border-gray-300' : ''}`}>
                <thead
                  className={`text-sm font-semibold text-gray-600 bg-gray-50 ${colspan !== 1 ? 'border-b border-gray-300' : ''}`}>
                <tr>
                  {colspan === 1 && location!=='/kiosk' && <th
                    scope="col"
                    className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center max-w-fit">
                      <CheckboxInput checked={selectAll} onChange={(e) => functionCall(e.target.checked)}/>
                    </div>
                  </th>}
                  {headers.map((item, index) => {
                    return (<th
                      colSpan={colspan}
                      key={index}
                      scope="col"
                      className={`py-3 px-4 ${bordered ? 'border border-gray-300' : ''} whitespace-nowrap`}
                    >
                      <div className="flex items-center max-w-fit">
                        {item}
                      </div>
                    </th>)
                  })}
                  {colspan === 1 && <th
                    key='Actions'
                    colSpan={colspan}
                    scope="col"
                    className={`py-3 text-center px-4 ${bordered ? 'border border-gray-300' : ''} whitespace-nowrap`}
                  >
                    <div className='font-semibold text-sm'>
                      Actions
                    </div>
                  </th>}

                </tr>
                </thead>
                <tbody
                  className="divide-y divide-gray-300 sm:divide-transparent bg-white">
                {items.length > 0 ? items.map((item, index) => (
                  <TableRow key={item._id} functionCall={functionCall} item={item} index={index}/>)) : <tr>
                  <td colSpan={headers.length} className='py-4 pl-4 sm:pl-6 pr-3 text-sm'>{emptyMessage}</td>
                </tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/*<Pagination*/}
      {/*  currentPage={Number(paginationDetails.currentPage)}*/}
      {/*  totalCount={paginationDetails.totalCount}*/}
      {/*  pageSize={PageSize}*/}
      {/*  onPageChange={(page) => {*/}
      {/*    setSearchParam({page});*/}
      {/*  }}*/}
      {/*/>*/}
    </>)
  )
}


export default DataTable;