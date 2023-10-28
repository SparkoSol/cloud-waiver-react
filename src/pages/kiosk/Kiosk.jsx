import Heading from "../../components/Heading.jsx";
import {useRef} from "react";
import Input from "../../components/inputs/Input.jsx";
import FileInput from "../../components/inputs/FileInput.jsx";
import DataTable from "../../components/DataTable.jsx";
import KioskRow from "./components/KioskRow.jsx";
import {KioskData} from "../../utils/generalFunctions.js";
import Button from "../../components/Button.jsx";

const Kiosk = () => {
  const titleRef = useRef();
  const descriptionRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <section>
      <Heading title='Kiosk' titleClasses='text-xl font-semibold'
               subtitle='Manage your kiosk setting.' subTitleClasses='text-sm text-gray-900'/>
      <form onSubmit={handleSubmit} className='mt-8 space-y-6 w-3/5'>
        <Input inputRef={titleRef} inputClasses='' label='Kiosk Title' placeholder='Kiosk Title'/>
        <Input inputRef={descriptionRef} inputClasses='' label='Kiosk Description' placeholder='Kiosk Description'/>
        <FileInput label='Kiosk Logo'/>
        <DataTable TableRow={KioskRow} headers={['Id', 'Template Name']} items={KioskData}/>
        <div className='flex items-center gap-2 justify-end'>
          <Button btnText='Cancel' btnClasses='border border-gray-400 py-2 text-gray-900' fullWidth='w-fit'/>
          <Button btnText='Save Changes' btnClasses='bg-btnBg border border-btnBg py-2' fullWidth='w-fit'/>
        </div>
      </form>
    </section>
  )
}

export default Kiosk