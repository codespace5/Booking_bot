import React, { useState, useEffect } from 'react';
import { Calendar } from '@mui/lab';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
const SelectCalendar = (props) => {
    const { setMessage, setCalenderDate } = props
    const [selectedDate, setSelectedDate] = useState(null);
    const [value, setValue] = useState(null); 
    const [currentDate, setCurrentDate] = useState('');
    const [toTime, setToTime] = useState('')
    const [availableSlots, setAvailableSlots] = useState(null);
    const targetDate = new Date('2024-05-19');
    useEffect(() => {
        console.log('initializing')
        const formattedDate = dayjs().format('YYYY-MM-DD HH:mm:ss'); // Format the current date and time
        setCurrentDate(formattedDate); // Set the formatted date and time as the initial value of currentDate
        const currentDateTime = dayjs();
        const endOfDay = currentDateTime.endOf('day'); // Get the end of the current day
        const formattedTotime = endOfDay.format('YYYY-MM-DD HH:mm:ss');
        setToTime(formattedTotime)
    }, []);

    const handleDateSelect = async (date) => {     
        const currentDateTime = dayjs();
        const { $y, $M, $D } = date; // Extract year, month, and day components from the selected date object
        console.log("date", $D)
        console.log("date", $M)
        console.log("date", $y)
        let month = Number($M) + 1
        setCalenderDate($y +'-' + month.toString() + '-' + $D)
        const formattedDate = dayjs(date.$d).format('YYYY-MM-DD HH:mm:ss'); // Format the selected date
        console.log(formattedDate)
        setCurrentDate(formattedDate);
        const endOfDay = dayjs(date.$d).endOf('day');// Get the end of the current day
        const formattedTotime = endOfDay.format('YYYY-MM-DD HH:mm:ss');
        console.log(formattedTotime)
        setToTime(formattedTotime)

        console.log('result', currentDate)
        console.log('endtime', toTime);
        setMessage(prevMessage => [...prevMessage, {
            sender: 'bot',
            type: 'scheduleTime',
        }]);
        // You can add more logic here if needed
        const slots = await getAvailableTime(formattedDate, toTime);
        setAvailableSlots(slots)
        console.log('all time slot', availableSlots)
        console.log('Filtered time slots:', filteredSlots);
    };
    const filteredSlots = availableSlots ? availableSlots.filter(slot => {
        const startTime = new Date(slot.start);
        return startTime < new Date('2024-05-13');
    }) : [];

    const getAvailableTime = async (from, to) => {
        console.log("time", from, to)
        const fromMilliseconds = dayjs(from).valueOf();
        const toMilliseconds = dayjs(to).valueOf();
        console.log("millios", fromMilliseconds, toMilliseconds)
        const apiUrl = 'https://bh.advancedcare.com/api/public/v2/booking?action=time_slot&service_id=136&from=1715240657700&to=1717919057700';
        // const apiUrl = `https://bh.advancedcare.com/api/public/v2/booking?action=time_slot&service_id=136&from=${fromMilliseconds}&to=${toMilliseconds}`;
        console.log("url", apiUrl)
        try {
            const res = await fetch(apiUrl);
            const data = await res.json();
            console.log("time schedule", data.result);
            return data.result; 
        } catch (error) {
            console.error('Error fetching available time:', error);
            return []; 
        }
    };
    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar value={value} onChange={(date) => { handleDateSelect(date) }} />
            </LocalizationProvider>
        </div>
    );
};

export default SelectCalendar;