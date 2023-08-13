
import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import { getAllFields } from '../services/dataService';
import { getAllCountries, getAllEndYears, getAllPests, getAllRegions, getAllSectors, getAllSources, getAllTopics } from '../services/filterService';



ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);




const ScatterGraph = () => {


let filter={};

  const [datalist,setDatalist]=useState([])

  const [regions,setRegions] = useState([])
  const [sectors ,setSectors] = useState([])
  const [topics ,setTopics] = useState([])
  const [pests ,setPests] = useState([])
  const [sources ,setSources] = useState([])
  const [countries ,setCountries] = useState([])
  const [endyears ,setEndyears] = useState([])

  const labels=[]

 
  const setFilter=(event)=>{
    console.log(event.target.value)

    if(event?.target?.value){
      filter = {...filter,[event.target.id]:event.target.value}
      console.log(filter)
    }else{
      console.log(filter)
      try{
        if(filter[event.target.id])
        delete filter[event?.target?.id]
      }catch(e){
        console.log(e)
      }
    }
    console.log(filter)
    getAllData()
  }

  const [data,setData] = useState({
    labels:datalist,
    datasets: [
      {
        label: 'A dataset',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  })

  const getAllData = async () => {
    try {
      const regionsData = await getAllRegions();
      setRegions(regionsData);
      const sectorsData = await getAllSectors();
      setSectors(sectorsData);
      const fieldsData = await getAllFields(filter);
      setDatalist(fieldsData);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllFilters=async()=>{
    try{
      const topics = await getAllTopics()
    setTopics(topics)
    const years=await getAllEndYears()
    setEndyears(years)
    const pts = await getAllPests()
    setPests(pts)
    console.log(pts)
    const cts = await getAllCountries()
    setCountries(cts)
    const scs = await getAllSources()
    setSources(scs)
    }catch(e){
      console.log(e)
    }
  }

  useEffect(()=>{
    getAllData()
    getAllFilters()
  },[])

  useEffect(()=>{
    //getAllData()
  },[filter])

  useEffect( ()=>{
    //console.log("datalist size = "+datalist.length)
    let xy =[]
    //console.log(datalist)
    datalist.map(obj=>{

      let ax = new Object({
        x:regions.indexOf(obj?.region),
        y:sectors.indexOf(obj?.sector),
        label:`${obj.topic} |${obj.start_year?obj.start_year:""} - ${obj.end_year?obj.end_year:""} | ${obj.region?""+obj.region+" | " :""} ${obj.country?""+obj.country+" | " :""} ${obj.likelihood?""+obj.likelihood+" | " :""} ${obj.relevance?""+obj.relevance+" | " :""}`
      })
      xy.push(ax)
    })


    setData({
      datasets: [
        {
          label: "Topic | Year | Region | Country | Likelihood | Relevance",
          data: xy,
          backgroundColor: 'rgba(255, 99, 132, 1)',
          
        },
      ],
    })

    //console.log(xy.length)
    console.log(regions.length)

  },[datalist])


  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "region",
        },
        ticks: {
          callback: value => regions[value], // Display the region names
        },
      },
      y: {
        title: {
          display: true,
          text: 'sectors',
        },
        ticks: {
          callback: value => sectors[value], // Display the sector names
        },
      },
      
    },
    //for adding tooltip
    plugins:{
      tooltip:{
        callbacks:{
          label:(context)=>context.dataset.data[context.dataIndex].label,
        }
      }
    }
  };


  
  return (
    <div className=' w-full p-[5px] sm:p-[20px] '>
                <div className='justify-between flex space-y-1'>
                  <div>
                  </div>
                  <div className='space-x-1 space-y-1'>
                  <select type="select" id='pest' onChange={(event)=>setFilter(event)} className='font-light sm:p-[7px] border rounded bg-white'>
                      <option value={""}  >PEST</option>
                      {
                        pests.map((obj)=>(
                          <option value={obj} >{obj}</option>
                        ))
                      }
                    </select>
                  <select type="select" id='region' onChange={(event)=>setFilter(event)} className='font-light sm:p-[7px] border rounded bg-white'>
                      <option value={""} >Region</option>
                      {
                        regions.map((obj)=>(
                          <option value={obj} >{obj}</option>
                        ))
                      }
                    </select>
                  <select type="select" id='sector' onChange={(event)=>setFilter(event)} className='font-light sm:p-[7px] border rounded bg-white'>
                      <option value="">Sector</option>
                      {
                        sectors.map((obj)=>(
                          <option value={obj} >{obj}</option>
                        ))
                      }
                    </select>
                  <select type="select" id='topic' onChange={(event)=>setFilter(event)} className='sm:p-[7px] font-light border rounded bg-white'>
                      <option value={""} selected >Topic</option>
                      {
                        topics.map((obj)=>(
                          <option value={obj} >{obj}</option>
                        ))
                      }
                    </select>
                    <select type="select" id='end_year' onChange={(event)=>setFilter(event)} className='font-light sm:p-[7px] border rounded bg-white'>
                      <option value={""}>End Year</option>
                      {
                        endyears.map((obj)=>(
                          <option value={JSON.stringify(obj)} >{obj}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>
      <Scatter  options={options} data={data} />
    </div>
  )
}

export default ScatterGraph

