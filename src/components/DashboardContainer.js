import React from 'react'
import Dashboard from './Dashboard'
import Carousel from 'react-elastic-carousel';
import Dashboard2 from './Dashboard2';
import EjemploGet from './EjemploGet';
import EjemploPOST from './EjemploPOST';
import Dashboard3 from './Dashboard3';
const DashboardContainer = (props) => {
  return (
  <>
  <Carousel 
      itemsToShow={1} 
      pagination={false}
      showArrows={true}
      disableArrowsOnEnd={false}
      autoTabIndexVisibleItems={false}
      preventDefaultTouchmoveEvent={true}
      enableMouseSwipe={false}
  >
    <Dashboard/>
    {/* <Dashboard2/> */}
    {/* <EjemploGet/>
    <EjemploPOST/> */}
  </Carousel>
  </>
  )
}

export default DashboardContainer