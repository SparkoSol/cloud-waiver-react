import {
  createBrowserRouter, Outlet,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/dashboard/Home.jsx";
import Login from "./pages/auth/Login";
import {Toaster} from "react-hot-toast";
import Register from "./pages/register/Register.jsx";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword.jsx";
import ResetPassword from "./pages/reset-password/ResetPassword.jsx";
import VerifyMail from "./pages/verify-mail/VerifyMail.jsx";
import VerificationClient from "./pages/verify-account/VerificationClient.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Settings from "./pages/settings/Settings.jsx";
import UpdatePassword from "./pages/updatePassword/updatePassword.jsx";
import Billing from "./pages/billing/Billing.jsx";
import {useEffect} from "react";
import Integrations from "./pages/integrations/Integrations.jsx";
import Customer from "./pages/customers/Customer.jsx";
import UpdateCustomer from "./pages/updateCustomer/UpdateCustomer.jsx";
import Management from "./pages/management/Management.jsx";
import CustomerList from "./pages/customerList/CustomerList.jsx";
import ManagementTeam from "./pages/managementTeam/ManagementTeam.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Login/>
    )
  }, {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Home/>
      </ProtectedRoute>
    )
  }, {
    path: '/register',
    element: (
      <Register/>
    )
  }, {
    path: '/forgot-password',
    element: (
      <ForgotPassword/>
    )
  }, {
    path: '/reset-password/:id',
    element: (
      <ResetPassword/>
    )
  }, {
    path: '/verify-mail/:hashId/:id',
    element: (
      <VerifyMail/>
    )
  }, {
    path: '/verify-account/:hashId/:id',
    element: (
      <VerificationClient/>
    )
  }, {
    path: '/settings',
    element: (
      <ProtectedRoute>
        <Outlet/>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Settings/>
      }, {
        path: 'integrations',
        element: <Integrations/>
      }
    ]
  }, {
    path: '/settings/password',
    element: (
      <ProtectedRoute>
        <UpdatePassword/>
      </ProtectedRoute>
    )
  }, {
    path: '/billing',
    element: (
      <ProtectedRoute>
        <Billing/>
      </ProtectedRoute>
    )
  }, {
    path: '/customers',
    element: (
      <ProtectedRoute>
        <Outlet/>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Customer/>
      }, {
        path: ':id/edit',
        element: <UpdateCustomer/>
      }, {
        path: ':id',
        element: <CustomerList/>
      }
    ]
  }, {
    path: '/management',
    element: (
      <ProtectedRoute>
        <Outlet/>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Management/>
      },{
        path:'team/:id',
        element: <ManagementTeam/>
      }
    ]
  }
])

function App() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("token");
    if (code) {
      localStorage.setItem("cw-access-token", code);
    }
    const token = localStorage.getItem("cw-access-token");

    if (!token && token === "null") {
      router.navigate("/");
    }
  }, []);

  return (
    <>
      <Toaster position="bottom-center"/>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/">
//       <Route index element={<Login/>}/>
//       <Route path="/dashboard" element={<Home/>}/>
//       <Route path="/register" element={<Home/>}/>
//     </Route>
//   )
// );
