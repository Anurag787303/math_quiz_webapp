//KINDLY DON'T TOUCH THIS ONE.
import { useEffect, useState } from 'react';
import './App.css';
import Login from './Components/LoginFolder/Login';

function App() {

  const [data, setData] = useState("")

  useEffect(() => {
    const init = async () => {
      const response = await fetch("http://localhost:4000/backend-api/");
      const d = await response.json();

      setData(d.message);
    }

    init()
  }, [])

  return (
    <div>
      <Login/>
    </div>
  );
}

export default App;
