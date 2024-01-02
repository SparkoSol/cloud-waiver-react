import Button from "../../../components/Button";
import ToggleButton from "../../../components/inputs/ToggleButton";
import React from "react";
import {useNavigate} from "react-router-dom";
import Badge from "../../../components/Badge";

const SocialServiceCard = ({state, setState, item, width, showConfig = false}) => {
    const {title, subtitle, image} = item
    const navigate = useNavigate()
    return (
        <div
            className={`gap-4 bg-gray-50 border border-gray-300 rounded-xl flex items-center justify-between p-6 ${width}`}>
            <div className={'flex items-center gap-4'}>
                <div className={'h-10 w-10'}>
                    <img
                        src={`/integration-icons/${image}`}
                        alt={title}
                        className={'object-cover'}
                    />
                </div>
                <div className={'flex items-start flex-col'}>
                    <div className={`flex`}>
                        <p className={'mr-2'}>{title}</p>
                        {showConfig && <div>
                            {state ? <Badge text="Enabled"/> : <Badge text="Disabled"/>}
                        </div>}
                    </div>
                    <p className={`text-sm text-gray-600 mt-1`}>
                        {subtitle}
                    </p>
                    {!showConfig && <Button onClick={() => {
                        navigate("/settings/configure", {
                            state: {
                                service: item.id
                            }
                        })
                    }} btnText="Configure" btnClasses='border border-gray-400 py-2 text-gray-900 mt-4'/>}
                    {
                        showConfig && <Button onClick={() => {
                        }} btnText='Delete' type='button'
                                              btnClasses='border border-gray-400 py-2 text-gray-900 mt-4'
                                              fullWidth='w-fit'/>
                    }
                </div>
            </div>
            <ToggleButton enabled={state} setEnabled={setState}/>
        </div>
    )
};

export default SocialServiceCard;
