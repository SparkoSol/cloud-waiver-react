import Heading from "../../components/Heading.jsx";
import {useEffect, useRef, useState} from "react";
import Input from "../../components/inputs/Input.jsx";
import FileInput from "../../components/inputs/FileInput.jsx";
import DataTable from "../../components/DataTable.jsx";
import KioskRow from "./components/KioskRow.jsx";
import Button from "../../components/Button.jsx";
import {getRequest, patchRequest, postRequest} from "../../redux/cwAPI";
import {toast} from "react-hot-toast";
import Spinner from "../../components/Spinner";
import {addCheck, isEmptyObject} from "../../utils/generalFunctions";
import {Link} from "react-router-dom";

const Kiosk = () => {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const fileInputRef = useRef(null);
  const [kioskData, setKioskData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [kiosk, setKiosk] = useState({});
  const [state, setState] = useState({
    saved: false, _id: ''
  });
  // eslint-disable-next-line no-unused-vars
  const [selectedCount, setSelectedCount] = useState(0);
  useEffect(() => {
    setLoading(true)
    getRequest('/waivers?status=published')
      .then(r => setKioskData(addCheck(r.data)))
      .catch(e => toast.error(e.response.data.message))
      .finally(() => setLoading(false))

    getRequest(`/kiosk`)
      .then(r => setKiosk(r.data))
      .catch(e => toast.error(e.response.data.message))
      .finally(() => setLoading(false))
  }, []);

  useEffect(() => {
    if (!isEmptyObject(kiosk)) {
      let markedRows = kioskData?.map(item => {
        if (kiosk.waivers.includes(item._id)) {
          item.checked = true;
        }
        return item
      })
      setKioskData(markedRows)
    }
    //eslint-disable-next-line
  }, [kiosk]);


  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const checkedTemplates = kioskData.reduce((ids, item) => {
      if (item.checked) {
        ids.push(item._id);
      }
      return ids;
    }, []);
    setLoading(true);

    let resp;
    if (fileInputRef.current.files[0]) {
      let formData = new FormData();
      formData.append('file', fileInputRef.current.files[0])

      resp = await postRequest('/upload',
        formData
      )
    }
    const body = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      logo: resp?.data.url || kiosk.logo,
      waivers: checkedTemplates
    }
    patchRequest(`/kiosk`, body)
      .then(r => {
        toast.success('Saved Successfully.');
        setState({
          _id: r.data._id,
          saved: true
        })
      })
      .catch(e => toast.error(e.response.data.message))
      .finally(() => setLoading(false))
  }

  return (
    <section>
      {loading && <Spinner/>}
      <div className='flex gap-3 items-end'>
        <Heading title='Kiosk' titleClasses='text-xl font-semibold'
                 subtitle='Manage your kiosk setting.' subTitleClasses='text-sm text-gray-900'/>
        {state.saved && <Link to={`/kiosk-preview?id=${state._id}`}
                              className='rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
          Preview Splash Page
        </Link>}
      </div>
      <form onSubmit={handleSubmit} className='mt-8 space-y-6 w-3/5'>
        <Input inputRef={titleRef} inputClasses='pl-2.5' label='Kiosk Title' placeholder='Kiosk Title'
               defaultValue={kiosk.title}/>
        <Input inputRef={descriptionRef} inputClasses='pl-2.5' label='Kiosk Description'
               defaultValue={kiosk.description}
               placeholder='Kiosk Description'/>
        <FileInput label='Kiosk Logo' fileInputRef={fileInputRef} image={kiosk.logo}/>
        <DataTable TableRow={KioskRow} headers={['Id', 'Template Name']}
                   items={kioskData}
                   setSelectedCount={setSelectedCount}
                   setState={setKioskData}
                   setSelectAll={setSelectAll} selectAll={selectAll}/>
        <div className='flex items-center gap-2 justify-end'>
          <Button btnText='Cancel' type='button' btnClasses='border border-gray-400 py-2 text-gray-900'
                  fullWidth='w-fit'/>
          <Button btnText='Save Changes' btnClasses='bg-btnBg border border-btnBg py-2' fullWidth='w-fit'/>
        </div>
      </form>
    </section>
  )
}

export default Kiosk