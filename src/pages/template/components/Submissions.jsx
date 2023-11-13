import Heading from "../../../components/Heading";
import Button from "../../../components/Button";
import {FolderIcon, LinkIcon, MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {useEffect, useRef, useState} from "react";
import Input from "../../../components/inputs/Input";
import DataTable from "../../../components/DataTable";
import SelectInput from "../../../components/inputs/SelectInput";
import {addCheck, DashBoardHeaders} from "../../../utils/generalFunctions";
import DashboardRow from "../../dashboard/components/DashboardRow";
import QRModal from "../../../components/modals/QRModal";
import {getRequest} from "../../../redux/cwAPI";
import toast from "react-hot-toast";
import Spinner from "../../../components/Spinner";
import {useParams} from "react-router-dom";

const Submissions = ({currentTab = ''}) => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('Status');
  const [allWaivers, setAllWaivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectAll, setSelectAll] = useState(false)
  const searchRef = useRef();
  const {id} = useParams();

  useEffect(() => {
    setLoading(true)
    getRequest(`/submissions/waiver/${id}`)
      .then(r => setAllWaivers(addCheck(r.data)))
      .catch(e => toast.error(e.response.data.message))
      .finally(() => setLoading(false));
  }, []);

  function deleteRow() {

  }

  return (
    <section>
      {currentTab !== 'Submissions' &&
        <Heading title='Recent Waivers' titleClasses='text-xl text-gray-800 py-2'/>}
      {currentTab === 'Submissions' && <div className='flex justify-between items-center pt-6 pb-4'>
        <p className='text-sm text-gray-700'>List of all submissions received for waiver 102.</p>
        <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
          <Button btnText='Share' BtnIcon={LinkIcon} btnClasses='px-5 py-2.5 border text-gray-900 font-medium'
                  onClick={e => setOpen(true)}/>
          <QRModal setOpen={setOpen} open={open}/>
        </div>
      </div>}
      <div className='flex gap-3 flex-wrap'>
        <Input placeholder='Search' inputRef={searchRef} BtnIcon={MagnifyingGlassIcon}
               extraClasses='w-fit inline-block grow sm:grow-0'/>
        <SelectInput extraClasses='w-1/4 grow sm:grow-0'
                     options={['Submitted', 'Approved', 'Declined', 'Pending', 'Status']} setState={setStatus}
                     state={status}/>
      </div>
      {
        allWaivers.length > 0 ?
          <DataTable headers={DashBoardHeaders} TableRow={DashboardRow} items={allWaivers} setSelectAll={setSelectAll}
                     selectAll={selectAll} deleteRow={deleteRow}
                     setState={setAllWaivers}/> :
          <div className='text-center mt-4'>
            <FolderIcon className='w-40 h-40 text-gray-400 mx-auto'/>
            <span className='text-gray-500 mb-10 text-base'>No Waivers Found. Get started by creating a waiver</span>
          </div>
      }
      {loading && <Spinner/>}
    </section>
  )
}

export default Submissions