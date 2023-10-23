import Heading from "../../components/Heading.jsx";
import DataTable from "../../components/DataTable.jsx";
import ManagementRow from "./component/ManagementRow.jsx";
import {managementData} from "../../utils/generalFunctions.js";

const Management = () => {
  return (
    <section className='p-6 space-y-6'>
      <Heading title='Team'
               subtitle='A list of all the users in your account including their name, title, email and role.'
               subTitleClasses='text-sm text-gray-900' titleClasses='font-semibold text-xl'/>

      <DataTable TableRow={ManagementRow} headers={['Name', 'Total Users', 'Action']} items={managementData}
                 colspan='0' bordered={true}/>
    </section>
  )
}

export default Management