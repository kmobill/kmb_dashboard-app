import React from 'react'
import Calendar from './Calendar'
import CalendarsContainer from './CalendarsContainer'
import "./Card.css"
const Card = (props) => {
  return (
    <div  className={props.table?"card card__table col-"+props.width:"card col-"+props.width}>
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