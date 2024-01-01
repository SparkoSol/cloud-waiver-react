import DataTable from "../../components/DataTable";
import GoogleDriveConfigRow from "./components/GoogleDriveConfigRow";
import {useLocation} from "react-router-dom";
import GoogleDriveConfig from "./components/GoogleDriveConfig";
import DropBoxConfig from "./components/DropBoxConfig";
import MailChimpConfig from "./components/MailChimpConfig";
import ConstantContactConfig from "./components/ContactConfig";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectAllWaivers} from "../../redux/waivers/waiverSlice";
import {getAllWaiver} from "../../redux/waivers/waiverThunk";
import MailChimpConfigRow from "./components/MailChimpConfigRow";
import ContactConfigRow from "./components/ContactConfigRow";
import DropboxConfigRow from "./components/DropboxConfigRow";
import Button from "../../components/Button";

const Configure = () => {

  const location = useLocation()
  const allWaivers = useSelector(selectAllWaivers)
  const dispatch = useDispatch()
  const [filteredWaivers, setFilteredWaivers] = useState([]);

  useEffect(() => {
    dispatch(getAllWaiver())
  }, []);

  useEffect(() => {
    if (allWaivers) {
      const filterWaiversForSelection = allWaivers?.map((waiver) => {
        return {
          name: waiver.name,
          inputs: "folders"
        }
      })
      setFilteredWaivers(filterWaiversForSelection)
    }
  }, [allWaivers]);

  const handleSubmit = async () => {
    console.log(filteredWaivers)
    // try {
    //   const data = {
    //     folder_name: selected,
    //     customers: customers
    //   }
    //   setLoading(true)
    //   const res = await axios.post(`http://localhost:3000/Integration/save-file/${user._id}?integration_type=google_drive`, data)
    //   setLoading(false)
    //   toast.custom(res.data.message)
    //   navigate(-1)
    // } catch (e) {
    //   setLoading(false)
    //   toast.error(e.response.data.message)
    // }
  }

  return (
    <>
      {location?.state?.config === "googleDrive" &&
        <>
          <GoogleDriveConfig/>
          <DataTable colspan={0} headers={["Template Name", "Choose Folder"]}
                     TableRow={GoogleDriveConfigRow}
                     items={filteredWaivers}/>
        </>}
      {location?.state?.config === "dropbox" &&
        <>
          <DropBoxConfig/>
          <DataTable colspan={0} headers={["Template Name", "Choose Folder"]}
                     TableRow={DropboxConfigRow}
                     items={filteredWaivers}/>
        </>}
      {
        location?.state?.config === "mailchimp" &&
        <>
          <MailChimpConfig/>
          <DataTable colspan={0} headers={["Template Name", "Choose List"]}
                     TableRow={MailChimpConfigRow}
                     items={filteredWaivers}/>
        </>}
      {location?.state?.config === "constantContact" &&
        <>
          <ConstantContactConfig/>
          <DataTable colspan={0} headers={["Template Name", "Choose List"]}
                     TableRow={ContactConfigRow}
                     items={filteredWaivers}/>
        </>}
      <Button btnClasses='bg-btnBg mt-4 ml-auto' onClick={handleSubmit} btnText='Submit'></Button>
    </>
  );
};

export default Configure;
