import React, {useState,useEffect} from "react"
import "./EmployeeList.css"
import { Employee } from "./Employee"
import { getAllEmployees } from "../ApiManager"

export const EmployeeList =()=>{
    const [employees, setEmployees]=useState([])

    useEffect(
        ()=>{
            getAllEmployees()
                .then( (employeeArray)=>{setEmployees(employeeArray)})
            
        },
        []
    )

    return(
        <React.Fragment>
            <article className="employees">
            {
                employees.map(employee =><Employee key={`employee--${employee.id}`}
                    id={employee.id} 
                    fullName={employee.fullName} 
                    email={employee.email} />)
            }
            </article>
        </React.Fragment>
    )

}