import logo from './logo.svg';
import './App.css';
import Message_input from './components/Message_input';
// import Authbutton from './components/Auth_Button';
import GoogleAuth2 from './components/Google_auth2_0';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Testing_id from './components/Testing_id';
import Home_page from './components/Home';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<GoogleAuth2 />}></Route>
          <Route path="/chat" element={<Message_input/>}></Route>
          <Route path="/home" element={<Home_page/>}></Route>
          <Route path="/middle/:id" element={<Message_input/>}></Route>
        </Routes>
      </BrowserRouter>

      {/* <Authbutton/> */}
      {/* <Message_input/> */}
      {/* <Navbar/> */}
    </div>
  );
}

export default App;
