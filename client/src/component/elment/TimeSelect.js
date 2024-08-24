import React, {useState} from "react";

import './timeselect.scss';

const TimeSelect = (props) =>{
    const [availableTime , setAvailableTime] = useState([
        '09:00',
        '09:30',
        '10:00',
        '10:30',
        '11:00',
        '11:30',
        '12:00',
        '12:30',
        '13:00',
        '13:30',
        '14:00',
        '14:30',
        '15:00',
        '15:30',
        '16:00',
        '16:30',
    ])
    const {setonTime, calenderDate} = props;
    // const apiUrl = 'https://bh.advancedcare.com/api/public/v2/booking?action=time_slot&service_id=136&from=1717333200000&to=1719925200000';
    const apiUrl = 'https://bh.advancedcare.com/api/public/v2/booking?action=time_slot&service_id=136&from=1715240657700&to=1717919057700';
    const getavailableTime = async () =>{
        const res = await fetch(apiUrl);
        console.log(res);
    }
    const handleTime = (time) =>{
        console.log('selected time is', time)
        setonTime(time)
    }
    return(
        <div className="timeselect">
            <div className="header">
                <div className="title">Select a Timeslot</div>
                <div className="date">{calenderDate}</div>
            </div>
            <div className="available-time">
                {availableTime.map((res, index)=>(
                    <button key={res} className="select-btn" onClick = {() => handleTime(res)}>{res}</button>            
                ))
                }
            </div>
        </div>
    )
}

export default TimeSelect;
