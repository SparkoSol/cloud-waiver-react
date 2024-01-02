import React from 'react';
import Heading from "../../components/Heading";
import SocialServiceCard from "./components/SocialServiceCard";
import {data} from "./const/services_data";

const Integrations = () => {
    return (
        <div className="bg-white rounded-md p-6 w-full font-mulish">
            <Heading title='Integrations' subtitle='Lorem ipsum mit dollar' subTitleClasses='text-sm text-btnBg'
                     titleClasses='text-xl font-semibold'/>
            <div className="grid grid-cols-2 gap-4 mt-6">
                {data.map((item) => {
                    return (
                        <SocialServiceCard key={item.id} state={item.state} setState={item.functionCall}
                                           item={item}/>
                    )
                })}
            </div>
        </div>
    )
};

export default Integrations;