import Heading from "../../../components/Heading";
import Button from "../../../components/Button";
import {FolderIcon, LinkIcon, MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import React, {useEffect, useState} from "react";
import Input from "../../../components/inputs/Input";
import DataTable from "../../../components/DataTable";
import SelectInput from "../../../components/inputs/SelectInput";
import {addCheck, DashBoardHeaders, filterWaivers, updateAllSubmission} from "../../../utils/generalFunctions";
import DashboardRow from "../../dashboard/components/DashboardRow";
import QRModal from "../../../components/modals/QRModal";
import {getRequest, patchRequest} from "../../../redux/cwAPI";
import toast from "react-hot-toast";
import Spinner from "../../../components/Spinner";
import {useParams} from "react-router-dom";

const Submissions = ({currentTab = ''}) => {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState('All');
    const [allWaivers, setAllWaivers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredWaivers, setFilteredWaivers] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [switchState, setSwitchState] = useState(false);
    const [search, setSearch] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [selectedCount, setSelectedCount] = useState(0);
    const {id} = useParams();

    useEffect(() => {
        setLoading(true)
        getRequest(`/submissions?waiverId=${id}`)
            .then(r => {
                setAllWaivers(addCheck(r.data));
                setFilteredWaivers(addCheck(r.data))
            })
            .catch(e => toast.error(e.response.data.message))
            .finally(() => setLoading(false));
    }, [id, switchState]);

    useEffect(() => {
        const data = filterWaivers(allWaivers, {
            status,
            search: search.toLowerCase()
        })
        setFilteredWaivers(addCheck(data))
        // eslint-disable-next-line
    }, [status, search])

    async function updateSubmissionStatus(id, status) {
        setLoading(true)
        await patchRequest(`/submissions/${id}`, {status})
        setSwitchState(prev => !prev)
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
            <div className='flex flex-wrap gap-4 justify-center'>
                <div className='grow flex items-center gap-3'>
                    <Input placeholder='Search' onChange={e => setSearch(e.target.value)} BtnIcon={MagnifyingGlassIcon}
                           extraClasses='w-fit inline-block grow sm:grow-0' inputClasses='rounded-md pl-11'/>
                    <SelectInput extraClasses='w-32 grow sm:grow-0' isRelative={false}
                                 options={['All','Submitted', 'Approved', 'Declined', 'Pending']}
                                 setState={setStatus}
                                 state={status}/>
                </div>
                <div className='flex gap-3 items-center'>
                    {selectedCount > 0 && <>
                        <Button btnText={`Approve (${selectedCount})`}
                                btnClasses='bg-green-700 text-xs whitespace-nowrap px-2.5 py-1.5 sm:text-sm px-4 py-2' fullWidth='w-fit'
                                onClick={() => updateAllSubmission('approved', setSwitchState, setSelectedCount, setLoading, filteredWaivers)}/>
                        <Button btnText={`Decline (${selectedCount})`}
                                btnClasses='bg-red-500 text-xs whitespace-nowrap px-2.5 py-1.5 sm:text-sm px-4 py-2' fullWidth='w-fit'
                                onClick={() => updateAllSubmission('declined', setSwitchState, setSelectedCount, setLoading, filteredWaivers)}/>
                    </>}
                </div>
            </div>
            {
                allWaivers.length > 0 ?
                    <DataTable
                        headers={DashBoardHeaders}
                        TableRow={DashboardRow} items={filteredWaivers} setSelectAll={setSelectAll}
                        selectAll={selectAll} deleteRow={updateSubmissionStatus} setSelectedCount={setSelectedCount}
                        setState={setFilteredWaivers}/> :
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