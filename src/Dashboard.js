import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Dashboard()
{
  const navigate=useNavigate();
  const [data, setData] = useState(null);
  const url = 'http://localhost:3500/signedIn/1';
  useEffect(()=>{
    const getData = async ()=>{
      try
      {
        const response = await axios.get(url);
        if(response.data.account==="null")
        {
          navigate('/signin');
        }
        setData(response.data.account);
      }
      catch(error) 
      {
        console.log(error);
      }
    };
    getData();
  })
  return (
    <div className='text-5xl'>Hi {data}</div>
  )
}

export default Dashboard;