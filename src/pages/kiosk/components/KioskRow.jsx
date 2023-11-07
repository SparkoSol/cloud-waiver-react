import {limitChars} from "../../../utils/generalFunctions.js";
import CheckboxInput from "../../../components/inputs/CheckboxInput.jsx";

const KioskRow = ({item, functionCall, index}) => {
  return (
    <tr>
      <td className='p-4 font-semibold text-sm text-gray-900 whitespace-nowrap'>
        <div className="flex items-center max-w-fit">
          <CheckboxInput label='selectAll' extraClasses='hidden' checked={item.checked} onChange={()=>functionCall(index)}/>
        </div>
      </td>
      <td className='p-4 font-semibold text-sm text-gray-900 whitespace-nowrap'>
        {limitChars(item._id, 6)}
      </td>
      <td className='p-4 font-semibold text-sm text-gray-900 whitespace-nowrap'>
        {item.name}
      </td>
    </tr>
  )
}

export default KioskRow