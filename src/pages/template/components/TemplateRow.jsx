import {Link} from "react-router-dom";
import {capitalize, limitChars} from "../../../utils/generalFunctions";
import {
  ArrowPathIcon,
  DocumentDuplicateIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  UsersIcon
} from "@heroicons/react/24/outline";
import CheckboxInput from "../../../components/inputs/CheckboxInput";
import toast from 'react-hot-toast';
import {useSelector} from "react-redux";
import {allPermissions} from "../../../redux/team/teamSlice";

const TemplateRow = ({item, functionCall, index, deleteRow, customOpenModal}) => {
  const permissions = useSelector(allPermissions);
  return (
    <tr>
      {item.status !== 'archived' && <td className='p-4 font-semibold text-sm text-gray-900 whitespace-nowrap'>
        <div className="flex items-center max-w-fit">
          <CheckboxInput label='selectAll' extraClasses='hidden' checked={item.checked}
                         onChange={() => functionCall(index)}/>
        </div>
      </td>}
      <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>{limitChars(item.name, 30)}</td>
      <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>{item.total_submissions}</td>
      <td className='py-4 px-3 text-sm text-gray-900 whitespace-nowrap'>
        <span
          className='bg-yellow-100 text-yellow-800 text-xs font-bold px-2.5 py-0.5 rounded '>{capitalize(item.status)}</span>
      </td>
      <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>
        <div className="flex items-center justify-center gap-3">
          <abbr title='View Template' className='pt-1'>
            {item.status === 'draft' ?
              <button onClick={e => toast.error('Template not published!')}><EyeIcon className='w-5 h-5 text-gray-600'/>
              </button> :
              <Link target='_blank' to={`/template/${item._id}/public`}>
                <EyeIcon className='w-5 h-5 text-gray-600'/>
              </Link>}
          </abbr>
          <Link to={`/customers?template=${item._id}`}>
            <abbr title='Template Customers'>
              <UsersIcon className='w-5 h-5 text-gray-600'/>
            </abbr>
          </Link>
          {/*window.location.assign(`/templates/${item._id}/builder`)*/}
          {permissions.includes("template_editing") &&
            <Link to={`/templates/${item._id}/builder`} className='cursor-pointer'>
              <abbr title='Edit Template'>
                <PencilSquareIcon className='w-5 h-5 text-gray-600'/>
              </abbr>
            </Link>}
          {permissions.includes("template_creation") && <button onClick={e => customOpenModal(true, index)}>
            <abbr title='Duplicate Template'><DocumentDuplicateIcon className='w-5 h-5 text-gray-600'/></abbr>
          </button>}

          {item.status === 'archived' ?
            <button onClick={e => deleteRow(item._id, index, 'draft')}><abbr title='Un-archive Template'>
              <ArrowPathIcon className='w-5 h-5 text-gray-600'/>
            </abbr></button> :
            <button onClick={e => deleteRow(item._id, index, 'archived')}>
              <abbr title='Delete Template'>
                <TrashIcon className='w-5 h-5 text-gray-600'/>
              </abbr></button>}
        </div>
      </td>
    </tr>
  )
}

export default TemplateRow;