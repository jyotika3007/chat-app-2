import React, {useState} from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Login from './Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  const [user, setUser] = useState(null);

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
