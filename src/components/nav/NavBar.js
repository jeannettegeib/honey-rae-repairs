import React from "react"
import { EmployeeNav } from "./EmployeeNav.js"
import { CustomerNav } from "./CustomerNav.js"

export const NavBar = () => {
	const localHoneyUser=localStorage.getItem("honey_user")
    const honeyUserObject=JSON.parse(localHoneyUser)
	
	if (honeyUserObject.staff){
			//return employer views
			return <EmployeeNav />
	}
	else{
			//return customer views
			return <CustomerNav />
	}
	
}

