import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const EjemploPOST = (props) => {
    const [data,setData] = useState([{}])
    const [loading,setLoading] = useState(true)
    const [dateI,setDateI] = useState({})
    const [dateF,setDateF] = useState({})
    const ingresarFechas = ()=>{
      fetch("/fecha",{
        method: 'POST',
        body: JSON.stringify({
            dateInit: dateI,
            dateEnd: dateF
        })
        }).then(
            console.log("enviando mediante POST"),
            setLoading(false)
      )
    }
    React.useEffect(()=>{
      ingresarFechas()         
    },[dateI,dateF]           
  )
    return (
      <>
        <form>
          <label htmlFor="fname">fecha:</label>
          <input onChange={set} type="text" id="fname" name="fname"/>
       </form>
      </>
      
    )
  

}

export default EjemploPOST