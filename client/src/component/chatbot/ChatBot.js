import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import borAvartar from '../../assets/image/chatbot-icon.svg'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TimeSelect from "../elment/TimeSelect";
import ServiceItem from '../elment/ServiceItem'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import SelectTimezone from "../elment/SelectTimezone";
import ScheduleTime from "../elment/ScheduleTime";
import DateSelect from "../elment/DateSelect";
import SelectCalendar from "../elment/SelectCalendar";
import ContactInput from "../elment/ContactInput";
import SelectClinic from "../elment/Clinic";
const ChatBot = () => {
    const [age, setAge] = React.useState('');
    const [isbooking, setbooking] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [show, setShow] = useState(false)
    const [onServiceSelect, setonServiceSelect] = useState(null);
    const [onTime, setonTime] = useState(null);
    const [apiUrl, setApiUrl] = useState('https://bh.advancedcare.com/api/public/v1/service?location_id=32');
    const [calenderDate, setCalenderDate] = useState('')
    const [message, setMessage] = useState([
        {
            sender: 'bot',
            content: 'Hi! I am an AI appointment booking bot. What can I help you?',
            type: 'text',
            // addition:["New Patient", "Existing Patient"] selectClinic
        },
        // {
        //     sender: 'bot',
        //     type: 'selectClinic',
        //     // addition:["New Patient", "Existing Patient"] selectClinic
        // },
        // {
        //     sender: 'bot',
        //     type: 'serviceItem', // This message will render a ServiceItem component
        // },
        // {
        //     sender: 'bot',
        //     type: 'selectCalender', // This message will render a ServiceItem component
        // },
        // {
        //     sender: 'bot',
        //     type: 'selectTimezone', // This message will render a ServiceItem component
        // },
        // {
        //     sender: 'bot',
        //     type: 'scheduleTime', // This message will render a ServiceItem component
        // },
    ])

    const [userInput, setUserInput] = useState('')
    const ref = useRef();
    const scrollToBottom = () => {
        const mainRoot = document.getElementById("roof");
        mainRoot?.scrollIntoView({ behavior: "smooth" });
        // ref?.current.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {
        scrollToBottom();
        const lastBotMessage = message.filter(msg => msg.sender === 'user').pop();
        console.log("automation 12123123123")
        // if (lastBotMessage && lastBotMessage.type === 'user' && lastBotMessage.content === 'remote') {
        if (lastBotMessage && lastBotMessage.content === 'Remote') {    
            console.log("testing remote")
            setApiUrl('https://bh.advancedcare.com/api/public/v1/service?location_id=32');
        // } else if (lastBotMessage && lastBotMessage.type === 'user' && lastBotMessage.content === 'Clinic') {
        } else if (lastBotMessage && lastBotMessage.content === 'Knoxville') {
            console.log("teseting clinic")
            setApiUrl('https://bh.advancedcare.com/api/public/v1/service?location_id=4');
        }
    }, [message, selectedDate]);
    const closechatbot = () => {
        setShow(false)
        console.log('close')
    }
    const getResponse = async (mes) => {
        await axios
            // .post('http://104.197.157.234:5000/chat', { 'message': mes })
            // .post('http://localhost:5000/chat', { 'message': mes })
            .post('https://bd0f-188-43-253-77.ngrok-free.app/chat', { 'message': mes })
            .then((res) => {
                const responseData = res.data;
                // setMessage([...message, responseData])
                console.log("testing", responseData['content'])
                if(responseData['content']=='Please select one of available services. Swipe left or right to see available services'){
                    setMessage((preMessage) => [...preMessage, {
                        sender: 'bot',
                        type: 'text',
                        content: "Please select one of available services. Swipe left or right to see available services",
                    }])
                    setMessage((preMessage) => [...preMessage, {
                        sender: 'bot',
                        type: 'serviceItem',
                    }])
                } else {

                    setMessage(prevMessage => [...prevMessage, responseData]);
                    console.log("testing", responseData['content'])
                    if(responseData['content']=='The verification code is correct'){
                        setMessage((preMessage) => [...preMessage, {
                            sender: 'bot',
                            type: 'text',
                            content: "Please select the service which you want",
                            addition:["New Patient", "Existing Patient"]
                        }])
                    }
                }
            })
            
    }
    const sendMessage = () => {  
        setMessage((preMessage) => [...preMessage, {
            sender: 'user',
            type: 'text',
            content: userInput,
            addition: [],
        }])

        const lastBotMessage = message.filter(msg => msg.sender === 'bot').pop(); // Get the last bot message
        if (
            lastBotMessage &&
            lastBotMessage.content.includes('verification code')

        ) {
            const verificationCode = '12121222112121'; // Assuming this is the verification code
            setUserInput(`verificationcodegenerator ${verificationCode}`);
            console.log("232342342342343423432324234", verificationCode, userInput)
            const msg = "emailcode" +" "+ userInput.replace(/\s/g, '');
            setUserInput('')
            getResponse(msg)
        } else if (lastBotMessage &&
            // lastBotMessage.content === 'I just sent a verification code to your email. Can you enter it here?' 
            lastBotMessage.content.includes('confirm your scheduled appointment')) {
            setMessage((preMessage) => [...preMessage, {
                sender: 'bot',
                type: 'text',
                content: "Your booking is completed",
                addition: [],
            }])    
        }        
        else{
            setUserInput('')
            getResponse(userInput)
        }
    }
    const handleUserInput = (e) => {
        setUserInput(e.target.value)
    }
    console.log(message)

    const handleadditionitem = async (content) => {

        setMessage(prevMessage => [...prevMessage, {
            sender: 'user',
            type: 'text',
            content: content,
            addition: [],
        }]);

        if (content == 'Existing Patient') {
            setMessage(prevMessage => [...prevMessage, {
                sender: 'bot',
                type: 'text',
                content: 'Please select one of Clinic.',
                addition: [],
            }]);
            setMessage(prevMessage => [...prevMessage, {
                sender: 'bot',
                type: 'selectClinic',
            }]);
        }
        setbooking(!isbooking);
        getavailableTime()
        await getResponse(content)


    }

    const getCurrentDate = () => {
        const currentDate = new Date();
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        const dayOfWeek = daysOfWeek[currentDate.getDay()];
        const dayOfMonth = currentDate.getDate();
        const month = months[currentDate.getMonth()];

        return `${dayOfWeek}, ${dayOfMonth}, ${month}`;
    }
    const getCurrentTime = () => {
        const currentDate = new Date();
        // Get the current time components
        let hours = currentDate.getHours();
        let minutes = currentDate.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // Handle midnight
        minutes = minutes < 10 ? '0' + minutes : minutes;

        const currentTime = `${hours}:${minutes} ${ampm}`;
        return currentTime;
    }

    const handleDateSelect = (newDate) => {
        setSelectedDate(newDate); // Update your state with the selected date
    };

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    // const apiUrl = 'https://bh.advancedcare.com/api/public/v1/service';
    const [services, setService] = useState([]);
    const getavailableTime = async () => {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setService(data.result);
        console.log(res);
    }
    const [isService, selectSevice] = useState(false)
    const SelectSevice = () => {
        selectSevice(!isService)
    }

    const confirmBooking = () => {

        console.log('confirm booking');
        const msg = "Hello, Please insert the email or phone number"
        setMessage(prevMessage => [...prevMessage, {
            sender: 'bot',
            type: 'text',
            content: msg,
            addition: [],
        }]);
        setMessage(prevMessage => [...prevMessage, {
            sender: 'user',
            type: 'text',
            content: msg,
            addition: [],
        }]);
        // getResponse("what is an apple?")
    }

    return (
        <div className="chatpage">
            {show === true && (
                <div className="chatbotwidget">
                    <div className="chatheader">
                        <div className="title">Advancedcare</div>
                        <div>
                            <button className="close-button" onClick={closechatbot}> </button>
                        </div>

                    </div>
                    <div className="chat-group">
                        <div className="conversation-group">
                            <div className="date">{getCurrentDate()}</div>
                            <div className="message-history">
                                {message.map((mes, index) => (
                                    // Wrap adjacent JSX elements in a fragment
                                    <div key={index} className={`${mes.sender === 'user' ? 'user-message-container' : 'bot-message-container'}`}>
                                        <div className="message">
                                            {mes.sender !== 'user' && mes.type === 'text' && (<img src={borAvartar} width={30} height={30} className="message-icon" />)}
                                            <div>
                                                {mes.type === 'text' && (
                                                    <div className={`${mes.sender === 'user' ? 'user-message' : 'bot-message'}`}>
                                                        <div>
                                                            {mes.content}
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="add-response-container">
                                                    <div className="add-response">
                                                        {mes.addition && mes.addition.length > 0 && (
                                                            mes.addition.map((res, index) => (
                                                                <button key={index} className="select-response" onClick={() => handleadditionitem(res)}>{res}</button>
                                                            ))
                                                        )}
                                                    </div>
                                                </div>

                                                {mes.type === 'serviceItem' && (
                                                    <div className="service">
                                                        <ServiceItem setMessage={setMessage} message={message} apiUrl={apiUrl} onServiceSelect ={onServiceSelect} setonServiceSelect = {setonServiceSelect} />
                                                    </div>
                                                )}
                                                {mes.type === 'selectTimezone' && (
                                                    <div className="timezone">
                                                        <SelectTimezone />
                                                    </div>
                                                )
                                                }
                                                {mes.type === 'selectCalender' && (
                                                    <div className="timezone">
                                                        {/* <DateSelect /> */}
                                                        <SelectCalendar setMessage={setMessage} setCalenderDate = {setCalenderDate} />
                                                    </div>
                                                )
                                                }
                                                {mes.type === 'scheduleTime' && (
                                                    <div className="schdule">
                                                        <ScheduleTime setMessage = {setMessage} onTime = {onTime} setonTime = {setonTime} calenderDate = {calenderDate} onServiceSelect = {onServiceSelect}/>
                                                    </div>
                                                )
                                                }
                                                {mes.type === 'contactInput' && (
                                                    <div className="schdule">
                                                        <ContactInput setMessage = {setMessage} />
                                                    </div>
                                                )
                                                }
                                                {
                                                    mes.type === "selectClinic" && (
                                                        <div className="clinic">
                                                            <SelectClinic setMessage = {setMessage} setApiUrl = {setApiUrl}/>
                                                        </div>
                                                    )
                                                }
                                            </div>

                                        </div>
                                        {mes.type === 'text' && (
                                            <div className={`${mes.sender === 'user' ? 'user-message-time' : 'bot-message-time'}`}>{getCurrentTime()}</div>
                                        )}

                                    </div>
                                ))}
                            </div>
                            <div id="roof" className="ref"></div>
                        </div>
                    </div>

                    <div className="input-contrainer">
                        <div className="input-group">
                            <textarea className="userInput" placeholder="Type your message" value={userInput} rows={1} onChange={handleUserInput} onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    sendMessage();
                                }
                            }} />
                            <button className="sendbutton" onClick={sendMessage} ></button>
                        </div>
                    </div>
                </div>
            )}
            {show === false && (
                <div>
                    <button onClick={() => setShow(true)} className="chatbot-icon"></button>
                </div>
            )
            }
        </div>
    )
}

export default ChatBot;


