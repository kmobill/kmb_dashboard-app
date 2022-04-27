import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const EjemploPOST = (props) => {
    const [data,setData] = useState("")
    const [loading,setLoading] = useState(true)
    const [dateI,setDateI] = useState({})
    const [dateF,setDateF] = useState({})
    const ingresarFechas = ()=>{
      fetch("/fecha",{
        method: 'POST',
        body: JSON.stringify({
            data:data
        })
        }).then(
            console.log("enviando mediante POST, data: ",data)
      )
    }
    useEffect(()=>{
      ingresarFechas()         
    },[data]           
  )
    return (
      <>
        <form>
              <label htmlFor="ldata">Data:</label>
              <input onChange={e=>setData(e.target.value)} value={data} type="text" id="ldata" name="ldata"/>
            </form>
      </>
      
    )
  

}

export default EjemploPOST