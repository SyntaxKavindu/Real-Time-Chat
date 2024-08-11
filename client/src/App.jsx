import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import FloatingShape from "./components/FloatingShape";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import HomePage from "./pages/HomePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import LoadingSpinner from "./components/LoadingSpinner";
import { useAuthContext } from "./contexts/AuthContext";

function App() {

  const { authUser, setAuthUser, loading } = useAuthContext();

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
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>

      <Toaster position='top-right' reverseOrder='true' />
    </div>
  )
};

export default App;
