import React from 'react'

const Card = (props) => {
  return (
    <div className="card col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className='card-header'>
            <h5 className="card-title">{props.title}</h5>    
        </div> 
        <div className="card-body">
            <div className='mb-3 col-12'>
                {props.component}
            </div>
        </div>
    </div>
  )
}

export default Card