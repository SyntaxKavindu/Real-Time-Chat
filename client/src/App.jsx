import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import FloatingShape from "./components/FloatingShape";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import HomePage from "./pages/HomePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import LoadingSpinner from "./components/LoadingSpinner";
import { useAuthContext } from "./contexts/AuthContext";
import { ConversationContextProvider } from "./contexts/ConversationsContext";
import { MessageContextProvider } from "./contexts/MessageContext";

function App() {

  const { loading } = useAuthContext();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen w-screen text-white font-Inter bg-gradient-to-br from-gray-800 via-green-800 to-emerald-800 flex justify-center items-center relative overflow-hidden">
      <FloatingShape color="bg-green-500" size='w-64 h-64' top='-5%' left='10%' delay={0} />
      <FloatingShape color="bg-emerald-500" size='w-52 h-52' top='70%' left='-5%' delay={5} />
      <FloatingShape color="bg-lime-500" size='w-32 h-32' top='40%' left='-10%' delay={2} />
      <FloatingShape color="bg-green-600" size='w-64 h-64' top='50%' left='70%' delay={1} />
      <FloatingShape color="bg-emerald-500" size='w-52 h-52' top='30%' left='50%' delay={6} />
      <FloatingShape color="bg-lime-600" size='w-32 h-32' top='40%' left='30%' delay={3} />

      <Routes>

        <Route path="/" element={
          <ProtectRoute>
            <ConversationContextProvider>
              <MessageContextProvider>
                <HomePage />
              </MessageContextProvider>
            </ConversationContextProvider>
          </ProtectRoute>
        }
        />

        <Route path="/login" element={
          <RedirectAuthentication>
            <LogInPage />
          </RedirectAuthentication>
        }
        />

        <Route path="/signup" element={
          <RedirectAuthentication>
            <SignUpPage />
          </RedirectAuthentication>
        }
        />

        <Route path="/verify-email" element={
          <RedirectVerifiedUser>
            <EmailVerificationPage />
          </RedirectVerifiedUser>
        }
        />

        <Route path="/forgot-password" element={
          <RedirectAuthentication>
            <ForgotPasswordPage />
          </RedirectAuthentication>
        }
        />

        <Route path="/reset-password" element={
          <RedirectAuthentication>
            <ResetPasswordPage />
          </RedirectAuthentication>
        }
        />
      </Routes>

      <Toaster position='top-right' reverseOrder='true' />
    </div>
  )
};

export default App;

// Redirect authentication users
const RedirectAuthentication = ({ children }) => {

  const { authUser } = useAuthContext();

  if (authUser && !authUser.verified) {
    return (<Navigate to="/verify-email" replace />);
  }
  if (authUser && authUser.verified) {
    return (<Navigate to="/" replace />);
  }
  if (!authUser) {
    return (children);
  }
};

// Redirect unauthenticated users to the login page
const ProtectRoute = ({ children }) => {

  const { authUser } = useAuthContext();

  if (authUser && !authUser.verified) {
    return (<Navigate to="/verify-email" replace />);
  }
  if (!authUser) {
    return (<Navigate to="/login" replace />);
  }
  if (authUser && authUser.verified) {
    return (children);
  }
};

// Redirect verified users to the home page
const RedirectVerifiedUser = ({ children }) => {

  const { authUser } = useAuthContext();

  if (!authUser) {
    return (<Navigate to="/login" replace />);
  }
  if (authUser && authUser.verified) {
    return (<Navigate to="/" replace />);
  }
  if (authUser && !authUser.verified) {
    return (children);
  }
};