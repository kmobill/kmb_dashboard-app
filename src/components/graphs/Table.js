import React from 'react'
import "./Table.css";
const Table = (props) => {
  return (
    <div className='table__container'>
            <table className="table-fill">
            <thead>
            <tr>
            <th className="text-left">Agente</th>
            <th className="text-left">Gestion</th>
            </tr>
            </thead>
            <tbody className="table-hover">
            {props.data.map((name,key) =>(
              <tr key={key}>
                <td  className="text-left">{name}</td>
                <td className="text-left">Gestion</td>
              </tr>
            ))}
            </tbody>
            </table>
  
    </div>
  )
}

export default Table