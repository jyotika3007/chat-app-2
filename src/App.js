import React, {useState} from 'react';
import './App.css';
import Sidebar from './Sidebar/Sidebar';
import Chat from './Chat/Chat';
import Login from './Login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useStateValue } from './StateProvider';


function App() {

  const [{user} , dispatch] = useStateValue();

  return (
    <div className="app">

{!user ? (
  <Login />
):(

      <div className="app__body">

        <Router>
          <Sidebar />
          <Routes>

            <Route path="/rooms/:roomId" element={<Chat />} />

            <Route path="/" exact element={<Chat />} />


          </Routes>
        </Router>
      </div>
   
    )
  
}
</div>
  );
}

export default App;
