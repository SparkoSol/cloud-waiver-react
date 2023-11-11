import Heading from "../../../components/Heading.jsx";

const SideBarAdd = () => {
  return (
    <article className='w-1/2 relative justify-center items-center py-12 px-24 hidden lg:flex'>
      <img src="/images/bg-1.jpg"
           className='absolute top-0 left-0 w-full h-full object-cover rounded-tr-3xl rounded-br-3xl'
           alt="author"/>
      <div className='z-[1]'>
        <Heading title='Join Our Community'
                 titleClasses='text-white text-4xl font-bold mb-5'
                 subTitleClasses='text-gray-300 text-sm'
                 subtitle='Sign up and lower your costs. Online waivers made easy, create your own or let us build it for you. Start today!'
        />
      </div>
    </article>
  )
}

export default SideBarAdd