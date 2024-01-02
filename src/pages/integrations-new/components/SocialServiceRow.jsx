import React, {useState} from 'react';
import Spinner from "../../../components/Spinner";
import SelectInput from "../../../components/inputs/SelectInput";

const SocialServiceRow = ({item}) => {
    const [folders] = useState([])
    const [selected, setSelected] = useState(item.Inputs)
    const [loading] = useState(false)

    return (
        <>
            <tr>
                <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>{item.templateName}</td>
                <td className='py-4 px-6 text-sm text-gray-900 whitespace-nowrap'>
                    <div>
                        <SelectInput extraClasses='grow md:grow-0' options={folders} setState={setSelected}
                                     state={selected}/>
                    </div>
                </td>
            </tr>
            {loading && <Spinner/>}
        </>
    );
};

export default SocialServiceRow;
