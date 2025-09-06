// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import OtpModal from "./Components/OtpModal";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
          <Route path='/loginform' element={<LoginForm />} />
          <Route path='/otpmodal' element={<OtpModal />} />
         
        
        </Routes>
        </BrowserRouter>
   
    </div>
  );
}

export default App;
