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
        extraClasses={`rounded border-2 border-wwlOrange px-1 py-0.5 sm:px-4 sm:py-2 sm:rounded-lg hover:bg-wwlOrange hover:text-wwlWhite transition-colors duration-300 w-40`}
      />
    </div>
  </div>)

export default NotFound