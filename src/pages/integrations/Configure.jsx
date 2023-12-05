import DataTable from "../../components/DataTable";
import ConfigureRow from "./components/ConfigureRow";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import GoogleDriveConfig from "./components/GoogleDriveConfig";

const Configure = () => {
    const {deletedDriveAccount} = useSelector(state => state.integration)
    const navigate = useNavigate()


    useEffect(() => {
        if (deletedDriveAccount) {
            navigate("/settings/integrations")
        }
    }, []);


    return (
        <>
            <GoogleDriveConfig/>
            <DataTable colspan={0} headers={["Template Name", "Choose Folder"]} TableRow={ConfigureRow}
                       items={[
                           {templateName: "template", Inputs: "Folders"},
                       ]}/>
        </>
    );
};

export default Configure;
