import React from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { TicketContainer } from "../tickets/TicketContainer.js"
import { EmployeeDetails } from "../employees/EmployeeDetails.js"
import { EmployeeList } from "../employees/EmployeeList.js"
import { CustomerList } from "../customers/CustomerList.js"
import { CustomerDetail } from "../customers/CustomerDetail.js"
import { Profile } from "../profile/Profile.js"

export const EmployeeViews = () => {
	return (
	<Routes>
		<Route path="/" element={
            <React.Fragment>
            <h1 className="title--main">Honey Rae Repairs</h1>
            <div>Your one-stop shop for repairing your tech</div>
            <Outlet />
            </React.Fragment>
	}>
		<Route path="profile" element={<Profile />} />
		<Route path="tickets" element={<TicketContainer />} />
		<Route path="employees" element={<EmployeeList />} />
		<Route path="employees/:employeeId" element={<EmployeeDetails />} />
		<Route path="customers" element={<CustomerList />} />
		<Route path="customers/:customerId" element={<CustomerDetail />} />
		
        </Route>
	</Routes>
	)
}

