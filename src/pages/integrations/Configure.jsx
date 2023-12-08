import DataTable from "../../components/DataTable";
import GoogleDriveConfigRow from "./components/GoogleDriveConfigRow";
import {useLocation} from "react-router-dom";
import GoogleDriveConfig from "./components/GoogleDriveConfig";
import DropBoxConfig from "./components/DropBoxConfig";
import DropboxConfigRow from "./components/DropboxConfigRow";
import MailChimpConfigRow from "./components/MailChimpConfigRow";
import MailChimpConfig from "./components/MailChimpConfig";
import ConstantContactConfig from "./components/ContactConfig";
import ContactConfigRow from "./components/ContactConfigRow";

const Configure = () => {

    const location = useLocation()

    return (
        <>
            {location?.state?.config === "googleDrive" ?
                <>
                    <GoogleDriveConfig/>
                    <DataTable colspan={0} headers={["Template Name", "Choose Folder"]} TableRow={GoogleDriveConfigRow}
                               items={[
                                   {templateName: "template", Inputs: "Folders"},
                               ]}/>
                </>
                : location?.state?.config === "dropbox" ?
                    <>
                        <DropBoxConfig/>
                        <DataTable colspan={0} headers={["Template Name", "Choose Folder"]} TableRow={DropboxConfigRow}
                                   items={[
                                       {templateName: "template", Inputs: "Folders"},
                                   ]}/>
                    </>
                    :
                    location?.state?.config === "mailchimp" ?
                        <>
                            <MailChimpConfig/>
                            <DataTable colspan={0} headers={["Template Name", "Choose List"]}
                                       TableRow={MailChimpConfigRow}
                                       items={[
                                           {templateName: "template", Inputs: "List"},
                                       ]}/>
                        </> : location?.state?.config === "constantContact" ?
                            <>
                                <ConstantContactConfig/>
                                <DataTable colspan={0} headers={["Template Name", "Choose List"]}
                                           TableRow={ContactConfigRow}
                                           items={[
                                               {templateName: "template", Inputs: "List"},
                                           ]}/>
                            </> :
                            <></>
            }

        </>
    );
};

export default Configure;
