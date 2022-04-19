import React from 'react'
import Calendar_boxes from './Calendar_boxes'
import "./Card.css"
const Card = (props) => {
  return (
    <div  className="card col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
        <div className='card-header'>
            <h5 className="card-title">{props.title}</h5>    
        </div> 
        <div className={props.scrolleable?"card-body scroll":"card-body"}>
            <div className='mb-3 col-12'>
                {props.calendar?<Calendar_boxes/>:""}
                  {props.component}
            </div>
        </div>
    </div>
  )
}

export default Card