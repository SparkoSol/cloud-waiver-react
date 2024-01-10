import React from "react";
import Button from "./components/Button";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='fixed inset-0 h-screen w-screen w-100'>
          <div
            className='bg-wwlWhite p-6 text-black text-center rounded-xl shadow-wwlDefault h-full flex justify-center items-center flex-col'>
            <div className='text-4xl font-bold pb-3 font-chivo text-wwlOrange'>Coming Soon</div>
            <div className='p-3 pb-6 font-chivo'>Oops! Something went wrong<br/>Our team has been notified, and we
              are working on a resolution for you!
            </div>
            <Button btnText='Back to Home Page' btnClasses='bg-btnBg' fullWidth='w-fit' onClick={() => {
              this.setState({hasError: false})
              window.location.href = '/dashboard'
            }}/>
          </div>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;