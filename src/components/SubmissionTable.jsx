import React, {useEffect, useRef, useState} from 'react';
import Input from "./inputs/Input";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import SelectInput from "./inputs/SelectInput";
import DataTable from "./DataTable";
import {addCheck, DashBoardHeaders, filterWaivers, generateMonths, generateYears} from "../utils/generalFunctions";
import DashboardRow from "../pages/dashboard/components/DashboardRow";
import {FolderIcon} from "@heroicons/react/20/solid";
import {getRequest, patchRequest} from "../redux/cwAPI";
import toast from "react-hot-toast";

const SubmissionTable = ({setSelectedCount, setLoading, refetch}) => {
    const [template, setTemplate] = useState('Template');
    const [month, setMonth] = useState('Month');
    const [year, setYear] = useState('Year');
    const [status, setStatus] = useState('Status');
    const [templateMenu, setTemplateMenu] = useState(
        {
            options: ['Template'], state: template, setState: setTemplate
        });

    const selectData = [
        {
            options: ['Submitted', 'Approved', 'Declined', 'Status'], state: status, setState: setStatus
        },
        {
            options: generateMonths(12), state: month, setState: setMonth
        },
        {
            options: generateYears(2005), state: year, setState: setYear
        }]


    const [allWaivers, setAllWaivers] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [filteredWaivers, setFilteredWaivers] = useState([]);
    const [search, setSearch] = useState('');
    const searchRef = useRef();

    useEffect(() => {
        setLoading(true)
        getRequest('/submissions')
            .then(r => {
                const data = addCheck(r.data)
                setAllWaivers(data)
                setFilteredWaivers(data)
                const templateNames = [...new Set(data.map(item => item.waiver.name))]
                setTemplateMenu({options: ['Template', ...templateNames], state: template, setState: setTemplate})
                setLoading(false)
            })
            .catch(e => {
                setLoading(false);
                toast.error(e.response.data.message)
            })
        // eslint-disable-next-line
    }, [refetch]);

    useEffect(() => {
        const data = filterWaivers(allWaivers, {
            status,
            month,
            year,
            template,
            search: searchRef.current?.value
        })
        setFilteredWaivers(addCheck(data))
        // eslint-disable-next-line
    }, [status, template, search])


    const updateSubmissionStatus = async (id, status) => {
        setLoading(true)
        await patchRequest(`/submissions/${id}`, {status})

        getRequest('/submissions')
            .then(r => {
                const data = addCheck(r.data)
                setAllWaivers(data)
                setFilteredWaivers(data)
                setLoading(false)
            })
            .catch(e => {
                setLoading(false);
                toast.error(e.response.data.message)
            })
    }

    return (
        <>
            <div className='flex gap-2 mb-4 flex-wrap'>
                <Input placeholder='Search' inputRef={searchRef} BtnIcon={MagnifyingGlassIcon}
                       inputClasses='rounded-md pl-11'
                       extraClasses='w-fit inline-block'
                       onChange={(e) => {
                           setSearch(e.target.value)
                       }}
                />
                <SelectInput extraClasses='grow md:grow-0 w-32' options={templateMenu.options} state={template}
                             setState={setTemplate}/>
                {selectData.map((item, index) => {
                    return <SelectInput extraClasses='grow md:grow-0 w-28' key={index} options={item.options}
                                        state={item.state}
                                        setState={item.setState}/>
                })}
            </div>
            <div>
                {filteredWaivers.length > 0 ?
                    <DataTable headers={DashBoardHeaders} TableRow={DashboardRow} items={filteredWaivers}
                               setState={setFilteredWaivers} selectAll={selectAll} setSelectAll={setSelectAll}
                               deleteRow={updateSubmissionStatus} setSelectedCount={setSelectedCount}
                    /> : <div className='text-center mt-4'>
                        <FolderIcon className='w-40 h-40 text-gray-400 mx-auto'/>
                        <span className='text-gray-500 mb-10 text-base'>No Waivers Found. Get started by creating a waiver</span>
                    </div>}
            </div>
        </>
    );
};

export default SubmissionTable;