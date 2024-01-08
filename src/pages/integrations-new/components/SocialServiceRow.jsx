import React, {useState} from 'react';
import SelectInput from "../../../components/inputs/SelectInput";
import {useDispatch} from "react-redux";
import {updateFolder} from "../../../redux/waivers/waiverSlice";

const SocialServiceRow = ({item, folders, index}) => {
  const dispatch = useDispatch();
  const [selectedFolder, setSelectedFolder] = useState(item.folder_name || null)

  // useEffect(() => {
  //   if (item.folder_name) setSelectedFolder(item.folder_name);
  //   else setSelectedFolder(null)
  // }, [item.folder_name]);

  function handleChange(folder) {
    setSelectedFolder(folder)
    dispatch(updateFolder({index, folder}))
  }

  return (
    <tr>
      <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>{item.name}</td>
      <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>
        <SelectInput extraClasses='grow md:grow-0' options={folders} setState={handleChange}
                     state={selectedFolder}/>
      </td>
    </tr>
  );
};

export default SocialServiceRow;
