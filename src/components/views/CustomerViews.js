import React from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { Profile } from "../profile/Profile.js"
import { TicketEdit } from "../tickets/TicketEdit.js"
import { TicketForm } from "../tickets/TicketForm.js"
import { TicketList } from "../tickets/TicketList.js"

export const CustomerViews = () => {
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
		<Route path="tickets" element={<TicketList />} />
        <Route path="ticket/create" element={<TicketForm />} />
		<Route path="tickets/:ticketId/edit" element={ <TicketEdit /> } />

	</Route>
	</Routes>
	)
}

