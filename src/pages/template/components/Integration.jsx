import EmptyState from "../../../components/EmptyState";
import {getRequest} from "../../../redux/cwAPI";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import DataTable from "../../../components/DataTable";
import Heading from "../../../components/Heading";
import Spinner from "../../../components/Spinner";

const Integration = () => {
  const {id} = useParams();
  const [loading, setLoading] = useState(false);
  const [integrationArr, setIntegrationArr] = useState([]);

  useEffect(() => {
    setLoading(true)
    getRequest(`/integration/waiver/${id}`)
      .then(r => setIntegrationArr(r.data))
      .catch(e => console.log(e))
      .finally(()=>setLoading(false))
  }, [id]);

  return (
    <section className=''>
      {loading && <Spinner/>}
      {integrationArr.length > 0 ? <>
        <Heading title='Template Integrations' titleClasses='text-xl font-semibold mb-2'/>
          <DataTable TableRow={IntegrationRow} items={integrationArr} colspan={0}
                     headers={['Integration Type', 'Path', 'Folder Name']}/>
        </> :
        <div className='flex flex-col items-center justify-center space-y-4'>
          <EmptyState title="You've not added any integrations yet" subtitle="Go to settings and enable integrations"
                      url='/settings/integrations' btnText='Add Integrations'/>
        </div>
      }
    </section>
  )
}

export default Integration

function IntegrationRow({item}) {
  return (
    <tr>
      <td className='p-4 font-semibold text-sm text-gray-900 whitespace-nowrap'>
        {item.integration_type}
      </td>
      <td className='p-4 font-semibold text-sm text-gray-900 whitespace-nowrap'>
        {item.waiver_folders[0].folder_name}
      </td>
      <td className='p-4 font-semibold text-sm text-gray-900 whitespace-nowrap'>
        {item.waiver_folders[0].path}
      </td>
    </tr>
  )
}