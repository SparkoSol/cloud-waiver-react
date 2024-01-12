import Card from "./components/Card.jsx";
import {useEffect, useState} from "react";
import Button from "../../components/Button.jsx";
import {ClipboardIcon} from "@heroicons/react/24/solid";
import Modal from "../../components/modals/Modal.jsx";
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../components/Spinner.jsx";
import {selectCurrentUser, selectMember} from "../../redux/user/userSlice.js";
import {getMembers} from "../../redux/user/userThunk.js";
import {useNavigate} from "react-router-dom";
import {getRequest, postRequest} from "../../redux/cwAPI";
import toast from "react-hot-toast";
import SubmissionTable from "../../components/SubmissionTable";
import {allPermissions} from "../../redux/team/teamSlice";
import {getAllTeams} from "../../redux/team/teamThunk";

const Dashboard = () => {
  const currentUser = useSelector(selectCurrentUser);
  const currentMember = useSelector(selectMember);
  const permissions = useSelector(allPermissions);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(null);
  const [usage, setUsage] = useState([
    {
      id: 1, title: 'Usage', value: '00', icon: '/database.svg'
    }, {
      id: 2, title: 'Templates', value: '00', icon: '/wallet.svg'
    }, {
      id: 3, title: 'Signed', value: '00', icon: '/pulse.svg'
    },
    {
      id: 4, title: 'Customers', value: '00', icon: '/user.png'
    }
  ])

  function handleSubmit(name) {
    if(name==='cancel'){
      setOpenModal(false)
      setError(null)
      return
    }
    if(name.trim === ''){
      setError('Name is required.')
      return;
    }
    setLoading(true);
    setOpenModal(false)
    postRequest(`/waivers`, {name})
      .then(r => navigate(`/templates/${r.data._id}/builder`))
      .catch(e => setError(e.response.data.message))
      .finally(() => {
        setOpenModal(false)
        setLoading(false)
      })
  }

  useEffect(() => {
    if (currentUser && !currentMember) {
      dispatch(getMembers(currentUser._id))
    }
    dispatch(getAllTeams())
    // eslint-disable-next-line
  }, [currentUser]);

  useEffect(() => {
    setLoading(true)
    getRequest('/dashboard')
      .then(r => setUsage([
        {id: 1, title: 'Usage', value: r.data.usage, icon: '/database.svg'},
        {id: 2, title: 'Templates', value: r.data.templates, icon: '/wallet.svg'},
        {id: 3, title: 'Signed', value: r.data.signed, icon: '/pulse.svg'},
        {id: 4, title: 'Customers', value: r.data.customers, icon: '/user.png'}
      ]))
      .catch(e => toast.error(e.response.data.message))
      .finally(() => setLoading(false));

  }, []);


  return (
    <div>
      <div>
        <h1 className='text-xl font-semibold mb-5'>Dashboard</h1>
        <div
          className='grid gap-3 grid-cols-1 grid-rows-4 sm:grid-rows-2 sm:grid-cols-2 md:grid-rows-1 md:grid-cols-4 mb-5'>
          {usage.map((item, index) => {
            return (
              <Card key={index} item={item}/>
            )
          })}
        </div>
      </div>
      <div>
        <div className="flex justify-end">
          {permissions.includes("template_creation") && <Button BtnIcon={ClipboardIcon}
                                                                btnText='Create waivers'
                                                                onClick={() => setOpenModal(true)}
                                                                btnClasses='bg-btnBg border-btnBg px-5 py-2.5'
                                                                iconClasses='w-4 h-4 text-white inline-block ml-2'/>}
        </div>
        {permissions.includes(`waiver_submissions`) && <SubmissionTable title={'Recent waiver'}/>}
      </div>
      <Modal open={openModal} functionCall={handleSubmit} error={error}/>
      {loading && <Spinner/>}
    </div>
  );
};

export default Dashboard;