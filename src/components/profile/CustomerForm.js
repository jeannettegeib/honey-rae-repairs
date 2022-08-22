import React, { useEffect, useState } from "react"
import { getCustomerProfile } from "../ApiManager"

export const CustomerForm = () => {
    // TODO: Provide initial state for profile
    const [profile, updateCustomer]=useState({
        address:"",
        phoneNumber:"",
        userId: 0
    })
    const [feedback, setFeedback] = useState("")
    const localHoneyUser=localStorage.getItem("honey_user")
    const honeyUserObject=JSON.parse(localHoneyUser)

    // TODO: Get customer profile info from API and update state
    useEffect(()=>{
        getCustomerProfile(honeyUserObject)
        .then( (data)=>{
            const customerObject=data[0]
            updateCustomer(customerObject)
        })
    },[])
    
    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */

            return fetch (`http://localhost:8088/customers/${profile.id}`,{
                method:"PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(profile)
            })
            .then(r=>r.json())
            .then(()=>{
                setFeedback("Customer profile successfully saved")
            })
    }

    return (
        <React.Fragment>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
        {feedback}
        </div>  
         
        <form className="profile">
            <h2 className="profile__title">Update Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="adress">Address:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.address}
                        onChange={
                            (evt) => {
                                // TODO: Update adress property
                                const copy={...profile}
                                copy.address=evt.target.value
                                updateCustomer(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Phone Number:</label>
                    <input type="text"
                        className="form-control"
                        value={profile.phoneNumber}
                        onChange={
                            (evt) => {
                                // TODO: Update phone number
                                const copy={...profile}
                                copy.phoneNumber=evt.target.value
                                updateCustomer(copy)
                            }
                        } />
                </div>
            </fieldset>

            <button
                onClick={(clickEvent)=>{handleSaveButtonClick(clickEvent)}}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
        </React.Fragment>
    )
}