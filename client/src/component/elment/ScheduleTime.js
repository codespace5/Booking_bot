import React, {useState} from "react";
import TimeSelect from "./TimeSelect";
import Button from '@mui/material/Button';
const ScheduleTime = (props) => {
    const {setMessage, onTime,  setonTime, calenderDate, onServiceSelect } = props
    const conformBooking = () => {
        console.log("Conform booking")
        console.log("testing server323,", onServiceSelect)
        setMessage(prevMessage => [...prevMessage, {
            sender: 'bot',
            // content: 'Your booking is completed',
            content: 'Would you like to confirm your scheduled appointment? ' + onServiceSelect.name + " - " + onServiceSelect.duration + ' minutes '  + calenderDate + ' ' + ' ' + onTime,
            type: 'text',
        }]);
        // setMessage(prevMessage => [...prevMessage, {
        //     sender: 'bot',
        //     type: 'contactInput',
        // }]);
    }      
    return(
        <div className="schedule-time">
            <TimeSelect setonTime = {setonTime} calenderDate = {calenderDate}/>
            {/* <button className="btn-schedule-confirm">Confirm Date and Time</button> */}
            <Button variant="contained" color="success" onClick={conformBooking}>
                Confirm Date and Time
            </Button>
        </div>
    )
}

export default ScheduleTime;