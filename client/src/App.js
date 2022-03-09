import React, { useState } from 'react';
import io from 'socket.io-client'

const App = () => {
  const [msg, setMsg] = useState("");

  // useEffect(() => {
  const socket = io.connect('/');
  socket.on('msg', (data) => setMsg(data));
  // })

  return (
    <div>
      <h1>Hello, React App with Socket</h1>
      <h2>{msg}</h2>
    </div>
  );
};

export default App;