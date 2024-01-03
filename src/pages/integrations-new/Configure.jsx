import React, {useEffect, useState} from "react";

import DataTable from "../../components/DataTable";
import Button from "../../components/Button";
import SocialServiceCard from "./components/SocialServiceCard";
import SocialServiceRow from "./components/SocialServiceRow";
import {data} from "./const/services_data";
import {useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectAllWaivers} from "../../redux/waivers/waiverSlice";
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
    dispatch(getAllWaiver());
    getRequest(`/integration/${item.id}/folders`)
      .then(r => setFolders(r.data.map(item => item.name)))
      .catch(e => toast.error(e.response.data.message))
      .finally(() => setLoading(false))
  }, [dispatch, item]);

  const handleSubmit = async (id) => {
    const folders = allWaivers.reduce((acc, item) => {
      if (item.hasOwnProperty('folder_name')) {
        acc.push({ folder_name: item.folder, waiver_id: item._id });
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
      <DataTable colspan={0} headers={["Template Name", "Choose Folder"]}
                 TableRow={SocialServiceRow}
                 items={allWaivers || []}
                 folders={folders}
      />
      <Button btnClasses='bg-btnBg mt-4 ml-auto' onClick={() => handleSubmit(id)} btnText='Save Changes'></Button>
      {loading && <Spinner/>}
    </>
  );
};

export default Configure;
