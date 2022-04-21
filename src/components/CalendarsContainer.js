import Calendar from './Calendar'
import "./CalendarContainer.css"
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getDate } from 'date-fns';

const CalendarsContainer = () => {
  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  function formatDate(date) {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-');
  }
  const [count, setCount] = React.useState(0);
  const [value, setValue] = React.useState(formatDate(new Date()));
  const [value2, setValue2] = React.useState(formatDate(new Date()));
  const [loading, setLoading] = React.useState(true);
  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  function formatDate(date) {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-');
  }

  const ingresarFechas = ()=>{
    fetch("/Fecha",{
      method: 'POST',
      body: JSON.stringify({
          dateInit: {value},
          dateEnd: {value2}
      })
      }).then(
          data => {
          setLoading(false)
    }
    )
  }

  React.useEffect(()=>{
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 15000);
    ingresarFechas()         
  },[count]           
)
  if(loading === true){
    <div>
      <h1>cargando datos...</h1>
    </div>
  }else{
  return (
    <div className="calendar__title">
      <label htmlFor="customRange1" >Seleccione la fecha</label>
      <div className='calendar__container'>          
          <div className = 'calendar__box' style={{marginBottom:"2rem"}}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Fecha de inicio"
              value={value}
              onChange={(newValue) => {
                setValue(formatDate(newValue));
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          </div>

          <div className = 'calendar__box'>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Fecha de fin"
              value={value2}
              onChange={(newValue) => {
                setValue2(formatDate(newValue));
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          </div>
          
      </div>
    </div>
  )
}
}

export default CalendarsContainer