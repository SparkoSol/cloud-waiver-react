import EmptyState from "../../../components/EmptyState";

const Integration = () => {
  return(
    <section className='px-5 py-32'>
      <div className='flex flex-col items-center justify-center space-y-4'>
        <EmptyState title="You've not added any integrations yet" subtitle="Go to settings and enable integrations" url='/settings/integrations' btnText='Add Integrations' />
      </div>
    </section>
  )
}

export default Integration