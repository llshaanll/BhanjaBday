import React, { useState } from 'react'
import Button from './components/Button';
import Greetings from './components/Greetings';

const App = () => {
  const [isClicked, setClicked] = useState(false);  
  return (
    <>
    {
        (!isClicked) ? 
        <Button setClicked={setClicked}/> :
        <Greetings/>
    }
    </>
  )
}

export default App