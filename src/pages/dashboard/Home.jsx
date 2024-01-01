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
import {toggleDropBoxState} from "../../redux/integration/integrationSlice";

const Dashboard = () => {
  const currentUser = useSelector(selectCurrentUser);
  const currentMember = useSelector(selectMember);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false);
  const [usage, setUsage] = useState([
    {
      id: 1, title: 'Usage', value: '50', icon: '/database.svg'
    }, {
      id: 2, title: 'Templates', value: '50', icon: '/wallet.svg'
    }, {
      id: 3, title: 'Signed', value: '50', icon: '/pulse.svg'
    },
    {
      id: 4, title: 'Customers', value: '50', icon: '/user.png'
    }
  ])

  function handleSubmit(name) {
    setLoading(true);
    setOpenModal(false)
    postRequest(`/waivers`, {name})
      .then(r => navigate(`/templates/${r.data._id}/builder`))
      .catch(e => toast.error(e.response.data.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (currentUser && !currentMember) {
      dispatch(getMembers(currentUser._id))
    }
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
    getRequest(`/integration/auth-token/${currentUser?._id}?integration_type=dropbox`).then((value) => {
      if (value) {
        dispatch(toggleDropBoxState(true))
      }
    })
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
          <Button BtnIcon={ClipboardIcon}
                  btnText='Create waivers'
                  onClick={() => setOpenModal(true)}
                  btnClasses='bg-btnBg border-btnBg px-5 py-2.5'
                  iconClasses='w-4 h-4 text-white inline-block ml-2'/>
        </div>
        <SubmissionTable title={'Recent waiver'}/>
      </div>
      <Modal open={openModal} setOpen={setOpenModal} functionCall={handleSubmit}/>
      {loading && <Spinner/>}
    </div>
  );
};

export default Dashboard;