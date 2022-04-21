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
            {props.data['nombre_agente'].map((data,key) =>(
              <tr key={key}>
                <td  className="text-left">{data}</td>
                <td className="text-left">{props.data['gestiones_agente'][key]}</td>
              </tr>
            ))}
            </tbody>
            </table>
  
    </div>
  )
}

export default Table