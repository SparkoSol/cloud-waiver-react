import Heading from "../../components/Heading.jsx";
import DataTable from "../../components/DataTable.jsx";
import ManagementRow from "./component/ManagementRow.jsx";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getAllTeams} from "../../redux/team/teamThunk.js";
import {useEffect, useState} from "react";
import {selectAllTeams} from "../../redux/team/teamSlice.js";
import Spinner from "../../components/Spinner.jsx";

const Management = () => {
  const teams = useSelector(selectAllTeams) || [];
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchTeams().then(() => {
    })
  }, []);

  async function fetchTeams() {
    setLoading(true)
    await dispatch(getAllTeams());
    setLoading(false)
  }

  return (
    <>
      <section className='p-6 space-y-6'>
        <div className='flex justify-between items-center'>
          <Heading title='Team'
                   subtitle='A list of all the users in your account including their name, title, email and role.'
                   subTitleClasses='text-sm text-gray-900' titleClasses='font-semibold text-xl'/>

          <Link className='text-white text-sm rounded-full font-bold bg-btnBg px-6 py-2' to={'/management/team/create'}>Create
            Team</Link>
        </div>

        <DataTable TableRow={ManagementRow} headers={['Name', 'Total Users', 'Action']} items={teams}
                   colspan='0' bordered={true}/>
      </section>
      {loading && <Spinner/>}
    </>
  )
}

export default Management