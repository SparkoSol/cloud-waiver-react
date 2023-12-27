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

const Configure = () => {

    const location = useLocation()
    const allWaivers = useSelector(selectAllWaivers)
    const dispatch = useDispatch()
    const [filteredWaivers, setFilteredWaivers] = useState([{templateName: "Customers", Inputs: "List"}]);

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

    return (
        <>
            {location?.state?.config === "googleDrive" ?
                <>
                    <GoogleDriveConfig/>
                    <DataTable colspan={0} headers={["Template Name", "Choose Folder", "Submission"]}
                               TableRow={GoogleDriveConfigRow}
                               items={filteredWaivers}/>
                </>
                : location?.state?.config === "dropbox" ?
                    <>
                        <DropBoxConfig/>
                        <DataTable colspan={0} headers={["Template Name", "Choose Folder", "Submission"]}
                                   TableRow={DropboxConfigRow}
                                   items={filteredWaivers}/>
                    </>
                    :
                    location?.state?.config === "mailchimp" ?
                        <>
                            <MailChimpConfig/>
                            <DataTable colspan={0} headers={["Template Name", "Choose List", "Submission"]}
                                       TableRow={MailChimpConfigRow}
                                       items={filteredWaivers}/>
                        </> : location?.state?.config === "constantContact" ?
                            <>
                                <ConstantContactConfig/>
                                <DataTable colspan={0} headers={["Template Name", "Choose List", "Submission"]}
                                           TableRow={ContactConfigRow}
                                           items={filteredWaivers}/>
                            </> :
                            <></>
            }

        </>
    );
};

export default Configure;
