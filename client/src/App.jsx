import { useState } from 'react'
import DrawingCanvas from './components/DrawingCanvas'
import './index.css'
import Control from './components/Control'

function App() {
  const [count, setCount] = useState(0)

  return (<>
    <div className='flex flex-col items-center'>
      <div className='text-3xl font-semibold h text-blue-600 p-10'>Sketchbro</div>
      <div className='p-4'><DrawingCanvas /></div>
      </div>
  </>
  )
}

export default App
