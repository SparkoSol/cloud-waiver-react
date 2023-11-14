import CheckboxInput from "../../../components/inputs/CheckboxInput.jsx";
import {capitalize, formatDate, limitChars} from "../../../utils/generalFunctions.js";
import {EyeIcon} from "@heroicons/react/20/solid";
import {Link} from "react-router-dom";

const DashboardRow = ({item, functionCall, index, deleteRow}) => {
  return (
    <tr>
      <td className='p-4 font-semibold text-sm text-gray-900 whitespace-nowrap'>
        <div className="flex items-center max-w-fit">
          <CheckboxInput label='selectAll' extraClasses='hidden' checked={item.checked} onChange={()=>functionCall(index)}/>
        </div>
      </td>
      <td className='py-4 px-6 font-semibold text-sm text-gray-900 whitespace-nowrap'>{limitChars(item._id, 6)}</td>
      <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>{formatDate(item.updatedAt)}</td>
      <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>{item.firstName}</td>
      <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>{item.lastName}</td>
      <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>{limitChars(item.reference_no, 6)}</td>
      <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>{item.waiver?.name}</td>
      <td className='py-4 px-3 text-sm text-gray-900 whitespace-nowrap'>
        <span
          className='bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded '>{capitalize(item.status)}</span>
      </td>
      <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>
        <div className="flex items-center justify-center gap-3">
          <Link target='_black' to={`/submission/${item._id}/view`}>
            <EyeIcon className='w-5 h-5 text-iconGray'/>
          </Link>
          <button>
            <img
              src='/tick.svg'
              alt='Loading...'
            />
          </button>
          <button onClick={e=>deleteRow(item._id, index)}>
            <img
              src='/cross.svg'
              alt='Loading...'
            />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default DashboardRow