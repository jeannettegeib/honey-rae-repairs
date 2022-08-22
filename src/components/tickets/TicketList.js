import React from "react"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Ticket } from "./Ticket"
import "./Tickets.css"
export const TicketList = ({searchTermsSate}) => {
    const [tickets, setTickets] = useState([])
    const [employees, setEmployees]=useState([])
    const [filteredTickets, setFiltered]=useState([])
    const [emergency, setEmergency]=useState(false)
    const [openOnly, updateOpenOnly]=useState(false)
    const navigate=useNavigate()

    const localHoneyUser=localStorage.getItem("honey_user")
    const honeyUserObject=JSON.parse(localHoneyUser)

    useEffect(
        ()=>{
            const searchedTickets =tickets.filter(ticket=>
                {
                    return ticket.description.toLowerCase().startsWith(searchTermsSate.toLowerCase())
                })
            setFiltered(searchedTickets)
        },
        [searchTermsSate]
    )

    useEffect(
        ()=>{
            if (emergency){
                const emergencyTickets=tickets.filter(ticket => ticket.emergency===true)
                setFiltered(emergencyTickets)
            }
            else{
                setFiltered(tickets)
            }
        },
        [emergency]
    )

    const getAllTickets=()=>{
     
            return fetch(`http://localhost:8088/serviceTickets?_embed=employeeTickets`)
                .then(response => response.json())
                .then ((ticketArray)=> {
                        setTickets(ticketArray)
                })
    }

    useEffect(
        ()=>{
            getAllTickets().then(()=>{

            fetch(`http://localhost:8088/employees?_expand=user`)
            .then(response => response.json())
            .then ((employeeArray)=> {
                setEmployees(employeeArray)
                })    
        })},
        []
    )

    useEffect(
        ()=>{
            if (honeyUserObject.staff){
                setFiltered(tickets)
            }
            else{
                const myTickets=tickets.filter(ticket=>ticket.userId ===honeyUserObject.id)
                setFiltered(myTickets)
            }
        },
        [tickets]
    )

    useEffect(
        ()=>{
            if (openOnly){
            const openTicketArray=tickets.filter(ticket=>{
                return ticket.userId===honeyUserObject.id && ticket.dateCompleted === ""
            })
            setFiltered(openTicketArray)
        }
        else{
            const myTickets=tickets.filter(ticket=>ticket.userId ===honeyUserObject.id)
                setFiltered(myTickets)
        }
        },
        [openOnly]
    )

    return <React.Fragment>
        {
            honeyUserObject.staff
            ? <React.Fragment>
                <button onClick={ ()=>setEmergency(true)}>Emergency Tickets</button>
                <button onClick={ ()=>setEmergency(false)}>Show All</button>
              </React.Fragment>
            : <React.Fragment>
                <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
                <button onClick={() => updateOpenOnly(true)}>Open Tickets</button>
                <button onClick={() => updateOpenOnly(false)}>All My Tickets</button>
            </React.Fragment>
        }

        <h2>List of Tickets</h2>
        <article className="tickets">
            {
                filteredTickets.map(
                    (ticket)=> <Ticket 
                    getAllTickets={getAllTickets}
                    employees={employees} 
                    currentUser={honeyUserObject} 
                    ticketObject={ticket} />

                )
            }
</article>
</React.Fragment>
}

