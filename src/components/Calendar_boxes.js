import React from 'react'
import "./Calendar_boxes.css"
const Calendar_boxes = () => {
  return (
    <div className='container_caledar_boxes'>
        <div className="container__input mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">Fecha inicio</label>
            <input type="text" className="form-control" id="formGroupExampleInput" placeholder="" disabled/>
        </div>
        <div className="container__input mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">Fecha Final</label>
            <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="" disabled/>
        </div>
    </div>
  )
}

export default Calendar_boxes