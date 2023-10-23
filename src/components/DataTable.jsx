import CheckboxInput from "./inputs/CheckboxInput.jsx";

const DataTable = ({
                     items,
                     headers,
                     TableRow,
                     colspan = 1,
                     pageSize: PageSize = 10,
                     paginationDetails,
                     setSearchParam,
                     setSelectAll,
                     emptyMessage = 'Nothing here yet!'
                   }) => {
  return (
    (<>
      <div className={`flex flex-col overflow-x-auto relative sm:rounded-lg py-2 font-mulish`}>
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table className={`w-full text-sm text-left text-gray-500 ${colspan !== 1 ? 'border border-gray-300' : ''}`}>
                <thead
                  className={`text-xs font-bold text-gray-600 uppercase bg-gray-50 ${colspan !== 1 ? 'border-b border-gray-300' : ''}`}>
                <tr>
                  {colspan === 1 && <th
                    scope="col"
                    className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center max-w-fit">
                      <CheckboxInput setState={setSelectAll} label='selectAll' extraClasses='hidden'/>
                    </div>
                  </th>}
                  {headers.map((item, index) => {
                    return (<th
                      colSpan={colspan}
                      key={index}
                      scope="col"
                      className="py-3 px-4 whitespace-nowrap"
                    >
                      <div className="flex items-center max-w-fit text-sm">
                        {item}
                      </div>
                    </th>)
                  })}
                  {colspan === 1 && <th
                    key='Actions'
                    scope="col"
                    className="px-3 py-3.5  whitespace-nowrap block  text-left font-chivo bg-white sm:pl-6 transition-colors duration-300"
                  >
                    <div className="flex items-center">
                      Actions
                    </div>
                  </th>}

                </tr>
                </thead>
                <tbody
                  className="divide-y divide-gray-300 sm:divide-transparent bg-white">
                {items.length > 0 ? items.map((item, index) => (
                  <TableRow key={item._id} item={item} index={index}/>)) : <tr>
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