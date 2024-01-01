import {twMerge} from "tailwind-merge";
import Badge from "../../../components/Badge";
import Button from "../../../components/Button";
import ToggleButton from "../../../components/inputs/ToggleButton";
import React from "react";

const ConfigCard = ({
                      activeStatus,
                      deleteToken,
                      serviceImage,
                      toggleState,
                      serviceName,
                      serviceDescription
                    }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-6 w-full">
      <div className="bg-gray-50 border border-gray-300 rounded-xl flex items-center justify-between p-6">
        <div className='flex  gap-4'>
          <img
            src={serviceImage}
            alt={serviceImage}
          />
          <div className="text-start">
            <div className={twMerge(`mb-1 gap-4 flex`)}>
              <p>{serviceName}</p>
              {activeStatus ? <Badge text="Enabled"/> : <Badge text="Disabled"/>}
            </div>
            <div className={twMerge(`text-sm text-gray-600`)}>
              {serviceDescription}
            </div>
            <Button onClick={deleteToken} btnText='Delete' type='button'
                    btnClasses='border border-gray-400 py-2 text-gray-900 mt-4'
                    fullWidth='w-fit'/>
          </div>
        </div>
        <ToggleButton enabled={activeStatus} setEnabled={toggleState}/>
      </div>
    </div>
  );
};

export default ConfigCard;
