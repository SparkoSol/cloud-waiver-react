import React, {useState} from 'react';
import SelectInput from "../../../components/inputs/SelectInput";
import {useDispatch} from "react-redux";
import {updateFolder} from "../../../redux/waivers/waiverSlice";

const SocialServiceRow = ({item, folders, index}) => {
    const dispatch = useDispatch();
    const [selectedFolder, setSelectedFolder] = useState(null)

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
