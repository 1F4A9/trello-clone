import React, { useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    axios.get('/get_workouts')
      .then(data => console.log(data.data))
  }, [])

  return (
    <div className="App">

    </div>
  );
}

export default App;
