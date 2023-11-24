import {createBrowserRouter, Outlet, RouterProvider,} from "react-router-dom";
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
import ManagementTeam from "./pages/managementTeam/ManagementTeam.jsx";
import CreateTeam from "./pages/createTeam/CreateTeam.jsx";
import {useDispatch, useSelector} from "react-redux";
import {userProfile} from "./redux/user/userThunk.js";
import {selectCurrentUser} from "./redux/user/userSlice.js";
import {isEmptyObject} from "./utils/generalFunctions.js";
import SelectDomain from "./pages/selectDomain/SelectDomain.jsx";
import Kiosk from "./pages/kiosk/Kiosk.jsx";
import Template from "./pages/template/Template";
import TemplateContainer from "./pages/template/components/TemplateContainer";
import FormBuilder from "./pages/template/components/FormBuilder";
import FormRender from "./pages/template/components/FormRender";
import SplashScreen from "./pages/kiosk/components/SplashScreen";
import SuccessState from "./pages/template/components/SuccessState";
import Overview from "./pages/template/components/Overview";
import NotFound from "./pages/NotFound";
import Setting from "./pages/template/components/Setting";
import Integration from "./pages/template/components/Integration";
import Submissions from "./pages/template/components/Submissions";
import SubmissionView from "./pages/SubmissionView";
import SignedWaivers from "./pages/signedWaivers/SignedWaiver";
import CustomerSubmissions from "./pages/customerSubmission/CustomerSubmissions";

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Login/>
    )
  }, {
    path: '/domain/select',
    element: (
      <SelectDomain/>
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
      },
      {
        path: ':id/edit',
        element: <UpdateCustomer/>
      },
      {
        path: ':customerId',
        element:
          <CustomerSubmissions/>
      }
    ]
  },
  {
    path: '/templates',
    element: (
      <ProtectedRoute>
        <Outlet/>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Template/>
      },
      {
        path: ':id/builder',
        element: (
          <TemplateContainer>
            <FormBuilder/>
          </TemplateContainer>
        )
      },
      {
        path: ':id/overview',
        element: (
          <TemplateContainer>
            <Overview/>
          </TemplateContainer>
        )
      },
      {
        path: ':id/setting',
        element: (
          <TemplateContainer>
            <Setting/>
          </TemplateContainer>
        )
      },
      {
        path: ':id/submissions',
        element: (
          <TemplateContainer>
            <Submissions/>
          </TemplateContainer>
        )
      },
      {
        path: ':id/integration',
        element: (
          <TemplateContainer>
            <Integration/>
          </TemplateContainer>
        )
      }
    ]
  },
  {
    path: '/template/:id',
    element: <FormRender/>
  },
  {
    path: '/template/:id/submission',
    element: <SuccessState/>
  },
  {
    path: '/submission/:submissionId/view',
    element: <SubmissionView/>
  },
  {
    path: '/kiosk',
    element: (
      <ProtectedRoute>
        <Kiosk/>
      </ProtectedRoute>
    )
  },
  {
    path: '/kiosk-preview/:id',
    element: (
      <SplashScreen/>
    )
  },
  {
    path: 'signed',
    element: (
      <ProtectedRoute>
        <SignedWaivers/>
      </ProtectedRoute>
    )
  },
  {
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
      }, {
        path: 'team/:id',
        element: <ManagementTeam/>
      }, {
        path: 'team/:id/user/create',
        element: <CreateTeam/>
      }, {
        path: 'team/create',
        element: <ManagementTeam/>
      }
    ]
  }, {
    path: '*', element: <NotFound/>
  }
])

function App() {
  const dispatch = useDispatch();
  const {pathname} = window.location;
  const currentUser = useSelector(selectCurrentUser);
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("token");
  const isTemplatePath = pathname.includes('template');
  const isResetPasswordPath = pathname.includes('reset-password');

  useEffect(() => {
    if (code) localStorage.setItem("cw-access-token", code);
    const token = localStorage.getItem("cw-access-token");
    if (token || isTemplatePath || isResetPasswordPath) {
      if (isEmptyObject(currentUser) && !isTemplatePath) {
        dispatch(userProfile(token));
      }
      const redirectTo = (window.location.pathname === "/" || window.location.pathname === "/dashboard")
        ? "/dashboard"
        : window.location.pathname + window.location.search;
      router.navigate(redirectTo);
    } else {
      router.navigate("/");
    }
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <Toaster position="bottom-center"/>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
//const {pathname} = window.location;
//   const dispatch = useDispatch();
//   const currentUser = useSelector(selectCurrentUser)
//useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const code = urlParams.get("token");
//     if (code) {
//       localStorage.setItem("cw-access-token", code);
//     }
//     const token = localStorage.getItem("cw-access-token");
//     if ((token && token !== "null") || pathname.includes('template') || pathname.includes('reset-password')) {
//       if (isEmptyObject(currentUser) && !pathname.includes('template')) {
//         dispatch(userProfile(token))
//       }
//       if ((pathname === "/" || pathname === "/dashboard"))
//         router.navigate("/dashboard");
//       else if (pathname !== "/dashboard" || pathname.includes('reset-password') || pathname.includes('template'))
//         router.navigate(pathname);
//     } else {
//       router.navigate("/");
//     }
//     // eslint-disable-next-line
//   }, []);