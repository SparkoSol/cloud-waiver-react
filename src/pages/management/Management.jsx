import Heading from "../../components/Heading.jsx";
import DataTable from "../../components/DataTable.jsx";
import ManagementRow from "./component/ManagementRow.jsx";
import {useDispatch, useSelector} from "react-redux";
import {createTeam, getAllTeams} from "../../redux/team/teamThunk.js";
import {useEffect, useState} from "react";
import {selectAllTeams} from "../../redux/team/teamSlice.js";
import Spinner from "../../components/Spinner.jsx";
import Button from "../../components/Button";
import Modal from "../../components/modals/Modal";
import {useNavigate} from "react-router-dom";

const Management = () => {
  const teams = useSelector(selectAllTeams) || [];
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeams().then(() => {})
    // eslint-disable-next-line
  }, []);

  async function fetchTeams() {
    setLoading(true)
    await dispatch(getAllTeams());
    setLoading(false)
  }

  function handleCreateTeam(name, value) {
    if (name === 'cancel') {
      setOpen(false)
      return
    }
    if(name.trim() === ''){
      setError('Name is required.')
      return;
    }
    setLoading(true)
    dispatch(createTeam({
      name,
      permissions: []
    })).unwrap()
      .then((r) => {
        setOpen(false);
        navigate(`/management/team/${r._id}`);
      })
      .catch(e => setLoading(false)).finally(() => setLoading(false))
      .finally(() => setLoading(false));
  }
  return (
    <>
      <section className='p-6 space-y-6'>
        <div className='flex justify-between items-center gap-3 flex-wrap'>
          <Heading title='Team'
                   subtitle='A list of all the users in your account including their name, title, email and role.'
                   subTitleClasses='text-sm text-gray-900' titleClasses='font-semibold text-xl'/>

          <Button btnClasses='text-white font-bold bg-btnBg' btnText='Create Team' onClick={e=>setOpen(true)}>Create
            Team</Button>
        </div>

        <DataTable TableRow={ManagementRow} headers={['Name', 'Total Users', 'Action']} items={teams}
                   colspan='0' bordered={true}/>
        <Modal open={open} title='Create Team' btnText='Create' functionCall={handleCreateTeam} label='Team name' error={error}/>
      </section>
      {loading && <Spinner/>}
    </>
  )
}

export default Management