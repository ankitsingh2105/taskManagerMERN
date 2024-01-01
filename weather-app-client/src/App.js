import './App.css';
import Main from "./Components/Main/Main";
import Display from './Components/Display/Display';
import Navbar from './Components/NavBar/Navbar';
import Login from './Components/Login/Login';
import Signup from "./Components/Signup/Signup";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="" element={<Main />} />
          <Route path="user/signup" element={<Signup />} />
          <Route path="user/login" element={<Login />} />
          <Route path="alltasks/:id" element={<Display />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
