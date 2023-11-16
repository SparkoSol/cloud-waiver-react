import Button from "../components/Button";

const NotFound = () => (
  <div className='fixed inset-0 h-screen w-screen w-100'>
    <div
      className='bg-wwlWhite p-6 text-black text-center rounded-xl shadow-wwlDefault h-full flex justify-center items-center flex-col'>
      <div className='text-4xl font-bold pb-3 font-chivo text-wwlOrange'>Coming Soon</div>
      <div className='p-3 pb-6 font-chivo'>
        Oops! The page does not exist.<br/>Our team has been notified, and we are working on a resolution for you!
      </div>
      <Button
        btnText='Back to Home Page'
        btnClasses='bg-btnBg'
        fullWidth='w-fit'
        onClick={() => {
          window.location.href = '/dashboard';
        }}
      />
    </div>
  </div>)

export default NotFound