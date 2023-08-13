import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AreaChart from './components/AreaChart'
import ScatterGraph from './components/ScatterGraph'
import LineChart from './components/LineChart'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <div className='sm:flex  sm:flex-row sm:w-full w-full'>
          <div className='sm:w-1/6 sm:h-[100vh] sm:sticky sm:inset-y-0  left-0 p-[15px] sm:border-r sm:w-[240px] '>
            <ul className=''>
              <li className='flex space-x-2 p-[10px]'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="purple" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
            </svg>

                <h1 className='text-purple-400 text-xl'>Dashboard</h1>
              </li>
             
            </ul>
          </div>
          <div className='sm:w-5/6 sm:p-[20px] space-y-2'>
              <div className='w-full  border rounded '>
              
                <ScatterGraph  />
              </div>
          
              <div className='w-full sm:flex space-x-2 space-y-1'>
                <div className='sm:w-1/2'>
                <AreaChart />
                </div>
                <div className='sm:w-1/2'>
                <LineChart />
                </div>
              
              </div>
          </div>
          
        </div>
    </>
  )
}

export default App
