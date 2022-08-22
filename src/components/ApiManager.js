import React from "react";

export const getAllCustomers = () => {
    return fetch(`http://localhost:8088/users?isStaff=false`)
        .then(res => res.json())
}

export const getCustomerDetails=(customerId)=>{
    return fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)
        .then(res=>res.json())
}

export const getAllEmployees=()=>{
    return fetch(`http://localhost:8088/users?isStaff=true`)
        .then (res=>res.json())
}

export const getEmployeeDetails=(employeeId)=>{
    return fetch (`http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=${employeeId}`)
        .then(res=>res.json())
}

export const getCustomerProfile=(honeyUserObject) => {
    return fetch(`http://localhost:8088/customers?userId=${honeyUserObject.id}`)
        .then(r=>r.json())
}

export const getEmployeeProfile=(honeyUserObject)=>{
    return fetch (`http://localhost:8088/employees?userId=${honeyUserObject.id}`)
        .then(r=>r.json())
}

export const getSpecificTicket=(ticketId)=>{
    return fetch(`http://localhost:8088/serviceTickets/${ticketId}`)
        .then(r=>r.json())
}