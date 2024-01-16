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
import DataTable from "../../components/DataTable";

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
    // eslint-disable-next-line
  }, [item, dispatch]);

  const handleSubmit = async (id) => {
    setLoading(true)
    const folders = allWaivers.reduce((acc, item) => {
      if (item.hasOwnProperty('folder_name')) {
        acc.push({folder_name: item.folder_name, waiver_id: item._id, path: item.path});
      }
      return acc;
    }, []);
    patchRequest(`/integration/${id}`, {
      authenticated: true,
      waiver_folders: folders
    })
      .then(() => toast.success('Saved successfully'))
      .finally(() => setLoading(false));
  }

  async function updateWaiverFolders() {
    setLoading(true);
    try {
      const data = await dispatch(getAllWaiver()).unwrap()
      const {data: foldersResponse} = await getRequest(`/integration/${item.id}/folders`);
      setFolders(foldersResponse);
      const integrationResponse = await getRequest(`/integration`);
      const dropBox = integrationResponse.data.find(item => item.integration_type === id).waiver_folders;
      for (let index = 0; index < data.length; index++) {
        const item = data[index];
        const matchingDropboxItem = dropBox.find(dropboxItem => dropboxItem.waiver_id === item._id);
        if (matchingDropboxItem) dispatch(updateFolder({
          index,
          folder: matchingDropboxItem.folder_name,
          path: matchingDropboxItem.path
        }));
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

      {(allWaivers && allWaivers.length > 0 && !loading) &&
        <>
          <DataTable items={allWaivers} headers={['Template Name', 'Choose Folder']} TableRow={SocialServiceRow}
                     folders={folders} colspan={0}/>
          <Button btnClasses='bg-btnBg mt-4 ml-auto' onClick={() => handleSubmit(id)}
                  btnText='Save Changes'></Button>
        </>
      }

      {loading && <Spinner/>}
    </>
  );
};

export default Configure;
