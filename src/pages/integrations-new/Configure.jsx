import React, {useEffect, useState} from "react";
import Button from "../../components/Button";
import SocialServiceCard from "./components/SocialServiceCard";
import SocialServiceRow from "./components/SocialServiceRow";
import {data} from "./const/services_data";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectAllWaivers} from "../../redux/waivers/waiverSlice";
import {getAllWaiver} from "../../redux/waivers/waiverThunk";
import {selectIntegrations} from "../../redux/integration-new/integrationSlice";
import {getRequest, patchRequest} from "../../redux/cwAPI";
import {toast} from 'react-hot-toast';

const Configure = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const item = data.find((item) => item.id === id)
    const allWaivers = useSelector(selectAllWaivers)
    const integrationStatus = useSelector(selectIntegrations)
    const [loading, setLoading] = useState(false);
    const [folders, setFolders] = useState([]);


    useEffect(() => {
        dispatch(getAllWaiver());
        setLoading(true)
        getRequest(`/integration/${item.id}/folders`)
            .then(r => setFolders(r.data.map(item => item.name)))
            .catch(e => toast.error(e.response.data.message))
            .finally(() => setLoading(false))
    }, [dispatch, item]);

    const handleSubmit = async (id) => {
        const folders = allWaivers.reduce((acc, item) => {
            if (item.hasOwnProperty('folder_name')) {
                acc.push({folder_name: item.folder, waiver_id: item._id});
            }
            return acc;
        }, []);
        patchRequest(`/integration/${id}`, {
            authenticated: true,
            waiver_folders: folders
        });
    }
    return (
        <>
            <SocialServiceCard
                item={item}
                state={integrationStatus[item.id]}
                showConfig={true}
                width={'w-[500px]'}
            />

            {(allWaivers && allWaivers.length > 0) ? <div>
                    <table className={'w-full mt-2 border'}>
                        <thead className='border h-12 text-sm text-left font-semibold text-gray-600 bg-gray-50'>
                        <tr>
                            <th className={'px-4'}>Template Name</th>
                            <th className={'px-4'}>Choose Folder</th>
                        </tr>
                        </thead>
                        <tbody className={'bg-white'}>
                        {
                            allWaivers?.map((item, index) => <SocialServiceRow key={index} item={item}
                                                                               folders={folders}
                                                                               index={index}/>)
                        }
                        </tbody>
                    </table>
                    <Button btnClasses='bg-btnBg mt-4 ml-auto' onClick={() => handleSubmit(id)}
                            btnText='Save Changes'></Button>
                </div> :
                <div className={'flex justify-center mt-28'}>
                    <div
                        className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-sky-500 border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            }
        </>
    );
};

export default Configure;
