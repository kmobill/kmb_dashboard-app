import React,{useEffect, useState} from "react";
import Dashboard from "./components/Dashboard";


function App() {

  const [data, setData]= useState([{}])
  const [loading, setLoading] = useState(true);
  useEffect(
    ()=>{
     fetch("/Dashboard").then(
        res => res.json()
    ).then(
        data => {
            setData(data)
            console.log(data)
            setLoading(false)
        }
    )
  },[])

  if(loading === true){
    <div>
      <h1>cargando datos...</h1>
    </div>
  }else{
    return (
      <div>
        <Dashboard data={data}/>
      </div>
    );
  }
}

export default App;
