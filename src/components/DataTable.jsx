import CheckboxInput from "./inputs/CheckboxInput.jsx";
import {useDispatch, useSelector} from "react-redux";
import {addSelectedWaiver} from "../redux/waivers/waiverSlice";
import {useEffect} from "react";
import {useLocation} from "react-router-dom";

const excludedStatus = ['declined', 'approved']

const DataTable = ({
                     items,
                     headers,
                     TableRow,
                     colspan = 1,
                     bordered = false,
                     paginationDetails,
                     setSearchParam,
                     selectAll,
                     emptyMessage = 'Nothing here yet!',
                     setSelectAll,
                     setState,
                     setSelectedCount = () => {
                     },
                     ...otherProps
                   }) => {
  const dispatch = useDispatch();
  const clear = useSelector(state => state.waivers.selectedWaivers)
  const pathname = useLocation().pathname;

  useEffect(() => {
    if (clear === 'CLEAR') {
      setState(items.map(item => ({...item, checked: false})))
      setSelectAll(false)
      setSelectedCount(0)
    }

    // eslint-disable-next-line
  }, [clear])

  function selectRows(str) {
    //if no rows, do nothing on click
    if (items.length === 0) return setSelectAll(prev=>!prev);
    if (typeof str === "boolean") {
      if (!items[0].status) {
        let temp = items.map(item => ({...item, checked: str}));
        setSelectAll(str)
        setState(temp);
        return;
      }
      let count = 0;
      const selected = items.map(item => {
        if (!excludedStatus.includes(item.status)) {
          count++;
          return {
            ...item,
            checked: str
          }
        } else return item

      });
      setState(selected)
      setSelectAll(str)
      setSelectedCount(str ? count : 0);
      const selectedWaivers = selected.filter(item => item.checked)
      if (selectedWaivers.length > 0) dispatch(addSelectedWaiver(selectedWaivers))
    } else {
      let newData = [...items];
      if (!items[0].status) {
        newData[str] = {
          ...newData[str],
          checked: !newData[str].checked
        };
        setState(newData);
        return;
      }
      newData[str] = {
        ...newData[str],
        checked: !excludedStatus.includes(newData[str].status) ? !newData[str].checked : false
      };
      let isAnySelected = newData.filter(item => item.checked)
      if (!isAnySelected.length) {
        setSelectAll(false);
        setSelectedCount(0);
      } else {
        setSelectedCount(isAnySelected.length);
      }

      if (isAnySelected.length > 0)
        dispatch(addSelectedWaiver(isAnySelected))

      setState(newData)
    }
  }

  return (
    (<>
      <div className={`flex flex-col overflow-x-auto sm:rounded-lg py-2`}>
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="">
              <table
                className={`w-full text-sm text-left text-gray-500 ${colspan !== 1 ? 'border border-gray-300' : ''}`}>
                <thead
                  className={`text-sm font-semibold text-gray-600 bg-gray-50 ${colspan !== 1 ? 'border-b border-gray-300' : ''}`}>
                <tr>
                  {colspan === 1 && <th
                    scope="col"
                    className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center max-w-fit">
                      <CheckboxInput checked={selectAll}
                                     onChange={(e) => selectRows(e.target.checked)}/>
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
                  {colspan === 1 && pathname !== '/kiosk' && <th
                    key='Actions'
                    colSpan={colspan}
                    scope="col"
                    className={`py-3 text-center px-4 ${bordered ? 'border border-gray-300' : ''} whitespace-nowrap`}
                  >
                    <div className='text-sm'>
                      Actions
                    </div>
                  </th>}

                </tr>
                </thead>
                <tbody
                  className="divide-y divide-gray-300 sm:divide-transparent bg-white">
                {items.length > 0 ? items.map((item, index) => (
                  <TableRow key={(item._id || item.id) + index} functionCall={selectRows} item={item} {...otherProps}
                            index={index}
                  />)) : <tr>
                  <td colSpan={headers.length + 2}
                      className='py-4 pl-4 sm:pl-6 pr-3 text-sm text-center'>{emptyMessage}</td>
                </tr>
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>)
  )
}


export default DataTable;