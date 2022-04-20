import React from 'react'
import "./RangeBar.css"
const RangeBar = () => {
  return (
    <div className='range__container'>        
        <input type="range" className="form-range" id="customRange1"></input>      
    </div>    
  )
}

export default RangeBar