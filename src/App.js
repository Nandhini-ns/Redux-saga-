
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import OtpModal from "./Components/OtpModal";

// ✅ Import Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ActiveTable from './Components/ActiveTable';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/loginform' element={<LoginForm />} />
          <Route path='/otpmodal' element={<OtpModal />} />
                <Route path='/activetable' element={<ActiveTable />} />
        </Routes>
      </BrowserRouter>

      {/*Add this once (global toaster) */}
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
