import React from 'react'

const RangeBar = () => {
  return (
    <>
        <label htmlFor="customRange1" className="form-label">Date range</label>
        <input type="range" className="form-range" id="customRange1"></input>      
    </>    
  )
}

export default RangeBar