import React, {useState} from "react";

import DataTable from "../../components/DataTable";
import Button from "../../components/Button";
import SocialServiceCard from "./components/SocialServiceCard";
import SocialServiceRow from "./components/SocialServiceRow";
import {data} from "./const/services_data";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectAllWaivers} from "../../redux/waivers/waiverSlice";

const Configure = () => {
    const location = useLocation()
    const [state, setState] = useState(true)
    const item = data.find((item) => item.id === location.state.service)

    const allWaivers = useSelector(selectAllWaivers)

    console.log(allWaivers, "Check")
    const handleSubmit = async () => {
    }
    return (
        <>
            <SocialServiceCard
                item={item}
                state={state}
                setState={setState}
                showConfig={true}
                width={'w-[500px]'}
            />
            <DataTable colspan={0} headers={["Template Name", "Choose Folder"]}
                       TableRow={SocialServiceRow}
                       items={[]}
            />
            <Button btnClasses='bg-btnBg mt-4 ml-auto' onClick={handleSubmit} btnText='Submit'></Button>
        </>
    );
};

export default Configure;
