import CheckboxInput from "../../../components/inputs/CheckboxInput.jsx";
import {capitalize, formatDate, limitChars} from "../../../utils/generalFunctions.js";
import {EyeIcon} from "@heroicons/react/20/solid";
import {Link} from "react-router-dom";

const statusColors = {
  submitted: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  declined: 'bg-red-100 text-red-800',
  pending: 'bg-blue-100 text-blue-800',
}

const CustomerSubmissionRow = ({item, functionCall, index, deleteRow}) => {
  return (
    <tr>
      <td className='p-4 font-semibold text-sm text-gray-900 whitespace-nowrap'>
        <div className="flex items-center max-w-fit">
          <CheckboxInput label='selectAll' extraClasses='hidden' checked={item.checked}
                         onChange={() => functionCall(index)} disabled={item.status !== "submitted"}/>
        </div>
      </td>
      {/*<td className='py-4 px-6 font-semibold text-sm text-gray-900 whitespace-nowrap'>{limitChars(item._id, 6)}</td>*/}
      <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>{limitChars(item.reference_no, 6)}</td>
      <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>{formatDate(item.updatedAt)}</td>
      <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>{item.waiver?.name}</td>
      <td className='py-4 px-3 text-sm text-gray-900 whitespace-nowrap'>
        <span
          className={`${statusColors[item.status]} text-xs font-semibold px-2.5 py-0.5 rounded`}>{capitalize(item.status)}</span>
      </td>
      <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>
        <div className="flex items-center justify-center gap-6">
          <Link target='_black' to={`/submission/${item._id}/view`}>
            <EyeIcon className='w-5 h-5 text-iconGray'/>
          </Link>
          {item.status === "submitted" && <>
            <button onClick={() => deleteRow(item._id, "approved")}>
              <img
                src='/tick.svg'
                alt='Loading...'
              />
            </button>
            <button onClick={() => deleteRow(item._id, "declined")}>
              <img
                src='/cross.svg'
                alt='Loading...'
              />
            </button>
          </>}
        </div>
      </td>
    </tr>
  )
}

export default CustomerSubmissionRow