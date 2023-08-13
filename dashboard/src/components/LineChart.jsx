
import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getAllEndYears, getAllPests } from '../services/filterService';
import { getAllFields } from '../services/dataService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);





const LineChart = () => {
    const [datalist,setDatalist]=useState([])
    const [pestle ,setPestle] = useState([])

    let filter={}
    const [data,setData] = useState({
        labels:[],
        datasets: [
          {
            label: 'Intensity',
            data: [5,15,7,20],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Likelihood',
            data: [4,2,9,12,10],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      })

      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: `Pestle Intensity Likelihood Graph`,
          },
        },
      };
      


    const setFilter=(event)=>{
        console.log(event.target.value)
    
        if(event?.target?.value){
          filter = {...filter,[event.target.id]:event.target.value}

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


      const getAllData = async () => {
        try {
        const pts=await getAllPests()
        setPestle(pts)
        // sorting data according to end years
          const fieldsData = await getAllFields(filter);
          fieldsData.sort((a,b)=>{
            return a.end_year-b.end_year
          })
          setDatalist(fieldsData);
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(()=>{
        getAllData()
      },[])




      useEffect(()=>{

        console.log(datalist)

        let intensity = []
        let years = []
        let likes =[]
        datalist.forEach(obj=>{
            //if(obj.intensity){
                
                
            //}

            if(obj.end_year){
                years.push(obj.end_year)
                if(obj.intensity){
                    intensity.push(obj.intensity)
                }else{
                    intensity.push(0)
                }
                if(obj.likelihood){
                    likes.push(obj.likelihood)
                }else{
                    likes.push(0)
                }
                
                
            }
            

        })



        setData({
            labels:years,
            datasets: [
              {
                label: 'Likelihood',
                data: likes,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
              {
                label: 'Intensity',
                data: intensity,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
              },
            ],
          })
          
      },[datalist])

  return (
    <div className='border w-full p-[20px] rounded'>
    <div className='justify-between flex'>
      <div>
      </div>
      <div>
        <select type="select" id='pestle' onChange={(event)=>setFilter(event)} className='font-light sm:p-[7px] border rounded bg-white'>
          <option value="">Pestle</option>
          {
            pestle.map(pt=>(
              <option value={pt}>{pt}</option>
            ))
          }
        </select>
      </div>
    </div>

    <Line options={options} data={data} />

</div>

  )
}

export default LineChart