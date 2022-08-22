import React from "react"
import { useState } from "react"
import { TicketSearch } from "./TicketSearch"
import { TicketList } from "./TicketList"

export const TicketContainer =()=>{
    const [searchTerms, setSearchTerms]=useState("")

    return(
        <React.Fragment>
				
				<TicketSearch setterFunction={setSearchTerms} />
				<TicketList searchTermsSate={searchTerms} />
				
			</React.Fragment> 
    )  
}