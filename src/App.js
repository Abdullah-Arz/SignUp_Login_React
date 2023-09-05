import logo from './logo.svg';
import './App.css';
import Signup from './Pages/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import ForgetScreen from './Pages/ForgetScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgetpassword' element={<ForgetScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
