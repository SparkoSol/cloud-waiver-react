import Heading from "./Heading.jsx";

const FormLayout = ({children, handleSubmit, title, subtitle}) => {
  return (
    <div className='w-full lg:w-1/2 h-full px-6 py-4 flex justify-center items-center'>
      <div className='md:py-12 p-4 sm:px-12 flex items-center w-full'>
        <div className='w-full sm:w-96 mx-auto'>
          <div className='mb-8'>
            <img src='/images/cloudwaiver.png' className='w-28 mx-auto block mb-4' alt='Logo'/>
            <Heading
              title={title}
              subtitle={subtitle}
              titleClasses='text-2xl font-semibold mb-2 text-textDark'
              center={true}
              subTitleClasses='text-btnBg font-semibold'/>
          </div>
          <form method='' onSubmit={handleSubmit}>
            {children}
          </form>
        </div>
      </div>
    </div>
  )
}

export default FormLayout