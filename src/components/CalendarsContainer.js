import React from 'react'
import Calendar from './Calendar'
import "./CalendarContainer.css"

const CalendarsContainer = () => {
  return (
    <div className="calendar__title">
      <label htmlFor="customRange1" >Seleccione la fecha</label>
      <div className='calendar__container'>          
          <div className = 'calendar__box'>
            <Calendar />
          </div>

          <div className = 'calendar__box'>
            <Calendar />
          </div>
          
      </div>
    </div>
  )
}

export default CalendarsContainer