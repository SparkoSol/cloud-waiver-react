import React, {useState} from 'react';
import SelectInput from "../../../components/inputs/SelectInput";
import {useDispatch} from "react-redux";
import {updateFolder} from "../../../redux/waivers/waiverSlice";
import {useLocation} from "react-router-dom";

const SocialServiceRow = ({item, folders, index}) => {
  const dispatch = useDispatch();
  const location = useLocation().pathname;
  const [selectedFolder, setSelectedFolder] = useState(item.folder_name || null)

  function handleChange(folder) {
    setSelectedFolder(folder.name)
    let pathName = folder.path_display || (location === '/settings/configure/GOOGLE_DRIVE' ? folder.id : null)
    dispatch(updateFolder({index, folder:folder.name, path:pathName}))
  }

  return (
    <tr>
      <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>{item.name}</td>
      <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>
        <SelectInput extraClasses='min-w-[140px]' options={folders} setState={handleChange}
                     state={selectedFolder}/>
      </td>
    </tr>
  );
};

export default SocialServiceRow;
