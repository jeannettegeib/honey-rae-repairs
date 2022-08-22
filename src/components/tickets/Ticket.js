import React from "react"
import { Link } from "react-router-dom"

export const Ticket =({ticketObject, currentUser, employees, getAllTickets})=>{

    let assignedEmployee=null
    if (ticketObject.employeeTickets.length > 0 && employees.length > 0){
        const ticketEmployeeRelationship = ticketObject.employeeTickets[0]
        
        assignedEmployee = employees.find(employee=>employee.id===ticketEmployeeRelationship.employeeId)
    }

    const userEmployeeId = employees.find(employee =>employee.userId===currentUser.id)

    const canClose=()=>{
        if (userEmployeeId && assignedEmployee){
            console.log(userEmployeeId, assignedEmployee, ticketObject)

        if (userEmployeeId.id===assignedEmployee.id && ticketObject.dateCompleted === ""){
            return <button onClick={closeTicket} className="ticket_finish">Finish</button>
        }
        if (userEmployeeId.id===assignedEmployee.id && ticketObject.dateCompleted !== ""){
            return <div className="ticket_complete">Complete!</div>
        }
        else{return ""}
    }
    }

    const deleteButton=()=>{
        if (!currentUser.staff){
            return <button onClick={()=>{
                fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`,{method:"DELETE"})
                .then(getAllTickets)
            }} className="ticket_delete">Delete</button>
        }
        else{return ""}
    }

    const closeTicket = ()=>{
        const copy = {
            userId: ticketObject.id,
            description: ticketObject.description,
            emergency: ticketObject.emergency,
            dateCompleted: new Date()
        }

       return(
        fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`,{
            method: "PUT",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(copy)
            })
        .then(r=>r.json())
        .then(getAllTickets)
        
       )
    }

    const buttonOrNoButton=()=>{
        if (currentUser.staff===true){
            return (<button onClick={()=>{
               fetch(`http://localhost:8088/employeeTickets`,
                {
                method: "POST",
                headers:{"Content-Type": "application/json"},
                body:JSON.stringify({
                    employeeId: userEmployeeId.id, 
                    serviceTicketId: ticketObject.id
                })
                }
                )
                .then(r=>r.json)
                .then(()=>{
                //get the state to reload from the API
                getAllTickets()
                })
            }}>Claim</button>)
        }
        else{""}
    }

    
return(
    <section className="ticket">
    <header>
        {
            currentUser.staff
                ? `Ticket ${ticketObject.id}`
                : <Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>
        }
    
    </header>
    <section>{ticketObject.description}</section>
    <section>Emergency: {ticketObject.emergency ? "💣" : "No"}</section>
    <footer className="ticket_footer">
        {
            ticketObject.employeeTickets.length >0
            ?`Currently being worked on by ${assignedEmployee !== null ? assignedEmployee.user.fullName : ""}`
            :buttonOrNoButton()
        }
        {
            canClose()
        }
        {
            deleteButton()
        }
    </footer>
    </section>
)
}