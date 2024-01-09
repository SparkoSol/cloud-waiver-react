import React, {useEffect, useState} from "react";
import Button from "../../components/Button";
import SocialServiceCard from "./components/SocialServiceCard";
import SocialServiceRow from "./components/SocialServiceRow";
import {data} from "./const/services_data";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectAllWaivers, updateFolder} from "../../redux/waivers/waiverSlice";
import {getAllWaiver} from "../../redux/waivers/waiverThunk";
import {selectIntegrations} from "../../redux/integration-new/integrationSlice";
import {getRequest, patchRequest} from "../../redux/cwAPI";
import {toast} from 'react-hot-toast';
import Spinner from "../../components/Spinner";

const Configure = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const item = data.find((item) => item.id === id)
  const allWaivers = useSelector(selectAllWaivers)
  const integrationStatus = useSelector(selectIntegrations)
  const [loading, setLoading] = useState(false);
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    updateWaiverFolders().finally(() => setLoading(false))
  }, [item, dispatch]);

  const handleSubmit = async (id) => {
    setLoading(true)
    const folders = allWaivers.reduce((acc, item) => {
      if (item.hasOwnProperty('folder_name')) {
        acc.push({folder_name: item.folder_name, waiver_id: item._id});
      }
      return acc;
    }, []);
    patchRequest(`/integration/${id}`, {
      authenticated: true,
      waiver_folders: folders
    }).finally(() => setLoading(false));
  }

  async function updateWaiverFolders() {
    setLoading(true);
    try {
      const data = await dispatch(getAllWaiver()).unwrap()
      const foldersResponse = await getRequest(`/integration/${item.id}/folders`);
      setFolders(foldersResponse.data.map(item => item.name));
      const integrationResponse = await getRequest(`/integration`);
      const dropBox = integrationResponse.data.find(item => item.integration_type === id).waiver_folders;
      for (let index = 0; index < data.length; index++) {
        const item = data[index];
        const matchingDropboxItem = dropBox.find(dropboxItem => dropboxItem.waiver_id === item._id);
        if (matchingDropboxItem) dispatch(updateFolder({index, folder: matchingDropboxItem.folder_name}));
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <>
      <SocialServiceCard
        item={item}
        state={integrationStatus[item.id]}
        showConfig={true}
        width={'w-[500px]'}
      />

      {(allWaivers && allWaivers.length > 0) && <div>
        <table className={'w-full mt-2 border'}>
          <thead className='border h-12 text-sm text-left font-semibold text-gray-600 bg-gray-50'>
          <tr>
            <th className={'px-4'}>Template Name</th>
            <th className={'px-4'}>Choose Folder</th>
          </tr>
          </thead>
          <tbody className={'bg-white'}>
          {
            !loading && allWaivers?.map((item, index) => <SocialServiceRow key={index} item={item}
                                                                          folders={folders}
                                                                          index={index}/>)
          }
          </tbody>
        </table>
        <Button btnClasses='bg-btnBg mt-4 ml-auto' onClick={() => handleSubmit(id)}
                btnText='Save Changes'></Button>
      </div>
      }
      {loading && <Spinner/>}
    </>
  );
};

export default Configure;