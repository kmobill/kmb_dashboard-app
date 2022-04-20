/* import React,{useEffect, useState} from "react";
import Carousel from "./components/Carousel";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";


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
        <Carousel data={data}/>   
        <Dashboard data={data}/>
        <Footer/>
      </div>
    );
  }
}

export default App;
 */
import React,{useEffect, useState} from "react";
import Carousel_container from "./components/DashboardContainer";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import * as bootstrap from 'bootstrap';
import DashboardContainer from "./components/DashboardContainer";
import Header from "./components/Header";
import EjemploPOST from "./components/EjemploPOST";


function App() { 

    return (
      <div>
        <Header/>
       <DashboardContainer/>
        {/* <EjemploPOST id={1}/> */}
        <Footer/>
      </div>
    );
  
}

export default App;
