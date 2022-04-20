


    /* const response = await fetch("http://localhost:5000/Consulta", {
      method: "POST",
      headers: {
      'Content-Type' : 'application/json'
      },
      body: JSON.stringify(todo)
      })    
      console.log(todo)
    response.headers.add("Access-Control-Allow-Origin","Access-Control-Expose-Headers","Authorization") */
    import React, { useState,forwardRef } from 'react'
    import DatePicker from "react-datepicker";
    import range from "lodash/range";
    import {getYear,getMonth} from "date-fns"
    import "react-datepicker/dist/react-datepicker.css";

    const Calendar = () => {
      
      const [startDate, setStartDate] = useState(new Date());
      const years = range(2022, getYear(new Date()) + 1, 1);
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const send_date = (date)=>{
        setStartDate(date)
        console.log(startDate)
      }
      return (
        <>
          <DatePicker
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div
                style={{
                  margin: 10,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                  {"<"}
                </button>
                <select
                  value={getYear(date)}
                  onChange={({ target: { value } }) => changeYear(value)}
                >
                  {years.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
      
                <select
                  value={months[getMonth(date)]}
                  onChange={({ target: { value } }) =>
                    changeMonth(months.indexOf(value))
                  }
                >
                  {months.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
      
                <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                  {">"}
                </button>
              </div>
            )}
            selected={startDate}
            onChange={(date) => send_date(date)}
          />
        </>
      );
    };
    
    export default Calendar
    
  