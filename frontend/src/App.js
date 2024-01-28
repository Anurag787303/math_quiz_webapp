import { useEffect, useState } from 'react';
import './App.css';

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
      <h1>Home Page</h1>
      <p>{data}</p>
    </div>
  );
}

export default App;
