import SubmissionTable from "../../components/SubmissionTable";
import {useSelector} from "react-redux";
import {allPermissions} from "../../redux/team/teamSlice";

const SignedWaivers = () => {
  const permissions = useSelector(allPermissions);
  return permissions.includes(`waiver_submissions`) ? <SubmissionTable title={'My Waivers List'}/> : <></>
}

export default SignedWaivers;