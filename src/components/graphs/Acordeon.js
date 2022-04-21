import React from 'react'
import * as bootstrap from 'bootstrap';
import "./Acordeon.css";
const Acordeon = (props) => {
  return (
      
     <>
        {/* {props.data.map((name,gestion,key) =>(  */} 
            <div className='contenerdor_accordion' /* key={key} */>             
                <div className="accordion" id="accordionPanelsStayOpenExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id={"panelsStayOpen-heading"/* +key */}>                    
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#panelsStayOpen-collapse"/* +key */} aria-expanded="true" aria-controls={"panelsStayOpen-collapse"/* +key */}>
                                <div className="form-check check__1">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        {/* {name}
                                        {gestion} */}
                                        asdasd
                                    </label>
                                </div>
                            </button>
                        </h2>
                        <div id={"panelsStayOpen-collapse"/* +key */} className="accordion-collapse collapse show" aria-labelledby={"panelsStayOpen-heading"/* +key */}>
                            <div className="accordion-body">
                                <div className="form-check check__2">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        asdasd
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/* ))}  */}       
     </> 
  )
}

export default Acordeon