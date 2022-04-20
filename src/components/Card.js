import React from 'react'
import Calendar from './Calendar'
import CalendarsContainer from './CalendarsContainer'
import "./Card.css"
const Card = (props) => {
  return (
    <div  className={props.calendar?"card card__calendar col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6":"card col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6"}>
        <div className='card-header'>
            <h5 className="card-title">{props.title}</h5>    
        </div> 
        <div className={props.scrolleable?"card-body scroll":"card-body"}>
            <div className={props.calendar?'card-body__items mb-3 col-12':'mb-3 col-12'}>
                {props.calendar?<CalendarsContainer/>:""}
                  {props.component}
            </div>
        </div>
    </div>
  )
}

export default Card