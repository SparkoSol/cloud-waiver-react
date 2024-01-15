import {TrashIcon} from "@heroicons/react/24/outline";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {selectCurrentTeam} from "../../../redux/team/teamSlice.js";

const TeamRow = ({item, index, setOpen}) => {
  const {id} = useParams();
  const selectedTeam = useSelector(selectCurrentTeam);
  const deleteMember = (index) => {
    setOpen({teamId: id, memberId: item._id, index, isOpen: true})
  }

  return (
    <tr>
      <td className='p-4 font-semibold text-sm text-gray-900 whitespace-nowrap'>
        {`${item.first_name} ${item.last_name}`}
      </td>
      <td className='p-4 font-semibold text-sm text-gray-900 whitespace-nowrap'>
        {item.username}
      </td>
      <td className='p-4 font-semibold text-sm text-gray-900 whitespace-nowrap'>
        {(selectedTeam?.admin !== item._id) &&
          <button onClick={() => deleteMember(index)}><TrashIcon className='w-5 h-5 text-red-400'/></button>}
      </td>
    </tr>
  )
}

export default TeamRow