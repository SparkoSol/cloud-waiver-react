import {Link} from "react-router-dom";
import {capitalize} from "../../../utils/generalFunctions";
import {DocumentDuplicateIcon, EyeIcon, PencilSquareIcon, TrashIcon, UsersIcon} from "@heroicons/react/24/outline";
import CheckboxInput from "../../../components/inputs/CheckboxInput";
import toast from 'react-hot-toast';
import {useSelector} from "react-redux";
import {allPermissions} from "../../../redux/team/teamSlice";

const TemplateRow = ({item, functionCall, index, deleteRow, customOpenModal}) => {
  const permissions = useSelector(allPermissions);
  return (
    <tr>
      <td className='p-4 font-semibold text-sm text-gray-900 whitespace-nowrap'>
        <div className="flex items-center max-w-fit">
          <CheckboxInput label='selectAll' extraClasses='hidden' checked={item.checked}
                         onChange={() => functionCall(index)}/>
        </div>
      </td>
      <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>{item.name}</td>
      <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>{item.total_submissions}</td>
      <td className='py-4 px-3 text-sm text-gray-900 whitespace-nowrap'>
        <span
          className='bg-yellow-100 text-yellow-800 text-xs font-bold px-2.5 py-0.5 rounded '>{capitalize(item.status)}</span>
      </td>
      <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>
        <div className="flex items-center justify-center gap-3">
          {item.status === 'draft' ?
            <button onClick={e => toast.error('Template not published!')}><EyeIcon className='w-5 h-5 text-gray-600'/>
            </button> :
            <Link target='_blank' to={`/template/${item._id}/public`}>
              <EyeIcon className='w-5 h-5 text-gray-600'/>
            </Link>}
          <Link to={`/customers?template=${item._id}`}>
            <UsersIcon className='w-5 h-5 text-gray-600'/>
          </Link>
          {permissions.includes("template_editing") && <Link target='_blank' to={`/templates/${item._id}/builder`}>
            <PencilSquareIcon className='w-5 h-5 text-gray-600'/>
          </Link>}
          {permissions.includes("template_creation") && <button onClick={e => customOpenModal(true, index)}>
            <DocumentDuplicateIcon className='w-5 h-5 text-gray-600'/>
          </button>}
          <button onClick={e => deleteRow(item._id, index)}>
            <TrashIcon className='w-5 h-5 text-gray-600'/>
          </button>
        </div>
      </td>
    </tr>
  )
}

export default TemplateRow;