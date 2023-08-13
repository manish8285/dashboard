import React, { useEffect, useState } from 'react'
import { Bar, Scatter } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { getAllSectors } from '../services/filterService';
import { getAllFields } from '../services/dataService';
import { getAllCountries } from '../services/filterService';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const AreaChart = () => {
  const [sectors ,setSectors] = useState([])
  const [datalist,setDatalist]=useState([])
  const [countries ,setCountries] = useState([])

  let filter={};



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


  // const [likelihoods , setLikelihoods] = useState()
  // const [intensities,setIntensities]=useState([])
  const [data,setData] = useState({
    labels:[],
    datasets:[
      {
        labels:'Intensity',
        data:[],
        backgroundColor: 'rgba(99, 132, 0.5)',
      },
      {
        label:'Likelihood',
        data:[],
        backgroundColor: 'rgba(53, 235, 0.5)',
      }
    ]
  })


  const getAllData = async () => {
    try {
      const cts = await getAllCountries();
      setCountries(cts);
      const sectorsData = await getAllSectors();
      setSectors(sectorsData);
      const fieldsData = await getAllFields(filter);
      setDatalist(fieldsData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    let labelSet =[]
    let likelihoods=[]
    let intensities=[]
    datalist.forEach((obj)=>{
      labelSet.push(`${obj.region?obj.region: obj.country} | ${obj.topic} (${obj.end_year?obj.end_year:obj.start_year})` )
      likelihoods.push(obj.likelihood)
      intensities.push(obj.intensity)
    })

    setData({
      labels:labelSet,
      datasets:[
        {
          label:'Intensity',
          data:intensities,
          backgroundColor: 'rgba(99, 132, 0.5)',
        },
        {
          label:'Likelihood',
          data:likelihoods,
          backgroundColor: 'rgba(53, 235, 0.5)',
        }
      ]
    })
  },[datalist])




    useEffect(()=>{
      getAllData()
    },[])


    const options = {
      indexAxis: 'x',
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
        },
        title: {
          display: true,
          text: 'Intensity Likelihood Graph',
        },
      },
    };

  return (
    <div className='border w-full p-[20px] rounded'>
                <div className='justify-between flex'>
                  <div>
                  </div>
                  <div>
                    <select type="select" id='country' onChange={(event)=>setFilter(event)} className='font-light sm:p-[7px] border rounded bg-white'>
                      <option value="">Country</option>
                      {
                        countries.map(country=>(
                          <option value={country}>{country}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>

                <Bar data={data} options={options} />

    </div>
  )
}

export default AreaChart