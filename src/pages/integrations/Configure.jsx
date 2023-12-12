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
import Button from "../../components/Button";
import React from "react";

const Configure = () => {

    const location = useLocation()

    return (
        <>
            {location?.state?.config === "googleDrive" ?
                <>
                    <GoogleDriveConfig/>
                    <DataTable colspan={0} headers={["Template Name", "Choose Folder"]} TableRow={GoogleDriveConfigRow}
                               items={[
                                   {templateName: "template", Inputs: "Folders"}, {
                                       templateName: "template",
                                       Inputs: "Folders"
                                   }, {templateName: "template", Inputs: "Folders"}, {
                                       templateName: "template",
                                       Inputs: "Folders"
                                   }, {templateName: "template", Inputs: "Folders"},
                               ]}/>
                    <div className="w-full flex justify-end">
                        <Button btnText='Submit' type='button'
                                btnClasses='border border-gray-400 py-2 text-gray-900 mx-4 my-4'
                                fullWidth='w-fit'/>
                    </div>
                </>
                : location?.state?.config === "dropbox" ?
                    <>
                        <DropBoxConfig/>
                        <DataTable colspan={0} headers={["Template Name", "Choose Folder"]} TableRow={DropboxConfigRow}
                                   items={[
                                       {templateName: "template", Inputs: "Folders"},
                                   ]}/>
                        <div className="w-full flex justify-end">
                            <Button btnText='Submit' type='button'
                                    btnClasses='border border-gray-400 py-2 text-gray-900 mx-4 my-4'
                                    fullWidth='w-fit'/>
                        </div>
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
                            <div className="w-full flex justify-end">
                                <Button btnText='Submit' type='button'
                                        btnClasses='border border-gray-400 py-2 text-gray-900 mx-4 my-4'
                                        fullWidth='w-fit'/>
                            </div>
                        </> : location?.state?.config === "constantContact" ?
                            <>
                                <ConstantContactConfig/>
                                <DataTable colspan={0} headers={["Template Name", "Choose List"]}
                                           TableRow={ContactConfigRow}
                                           items={[
                                               {templateName: "template", Inputs: "List"},
                                           ]}/>
                                <div className="w-full flex justify-end">
                                    <Button btnText='Submit' type='button'
                                            btnClasses='border border-gray-400 py-2 text-gray-900 mx-4 my-4'
                                            fullWidth='w-fit'/>
                                </div>
                            </> :
                            <></>
            }

        </>
    );
};

export default Configure;
