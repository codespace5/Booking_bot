import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import './serviceitem.scss';
import Button from '@mui/material/Button';

const SelectClinic = (props) => {
    const {setMessage, setApiUrl} = props
    

    const [isService, selectSevice] = useState(false)
    const [services, setService] = useState([{
        name: "Knoxville",
        address: "Tennessee"
    },
    {
        name:"Remote",
        address:"Telehealth"
    },
    {
        name:"Louisville",
        address:"Kentucky"
    },
    {
        name:"Newton",
        address:"MA"
    }
]);
    const [selectedService, setSelectedService] = useState(null)



    const SelectSevice = (bservice) => {
        selectSevice(!isService)
        if(bservice.name == "Remote"){
            setApiUrl('https://bh.advancedcare.com/api/public/v1/service?location_id=32');
        }else {
            setApiUrl('https://bh.advancedcare.com/api/public/v1/service?location_id=4');
        }
        setMessage(prevMessage => [...prevMessage, {
            sender: 'user',
            type: 'text',
            content: bservice.name,
            addition: [],
        }]);
        setMessage(prevMessage => [...prevMessage, {
            sender: 'bot',
            type: 'text',
            content: 'Please select one of available services. Swipe left or right to see available services',
            addition: [],
        }]);

        // {
        //     "sender": 'bot',
        //     # "type": 'scheduleTime',
        //     "type": 'text',
        //     "content":"Please select one of available services. Swipe left or right to see available services"
        //     # "type": 'selectTimezone',
        // }
        setMessage(prevMessage => [...prevMessage, {
            sender: 'bot',
            type: 'serviceItem',
        }]);

        // setMessage(prevMessage => [...prevMessage, {
        //     sender: 'bot',
        //     type: 'selectCalender',
        // }]);

        // setonServiceSelect({
        //     name: bservice.name,
        //     duration: bservice.duration,
        //     price: bservice.price
        // })

        // console.log("selected service ", onServiceSelect)
    }

    // const getavailableTime = async () => {
    //     const res = await fetch(apiUrl);
    //     const data = await res.json();
    //     setService(data.result);
    //     console.log(res);
    // }

    return (
        <div className="serviceItem">
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    '@0.00': {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    '@0.75': {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    '@1.00': {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    '@1.50': {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                }}
                modules={[Pagination]}
            >
                {services.map((service, index) => (
                    <SwiperSlide className="slid" key={index}>
                        <div className="slid-content">
                            <div className="content">
                                <div className="title">
                                    <div>{service.name} - </div>
                                    <div>{service.address}</div>
                                </div>
                                {/* <button onClick={SelectSevice}>Book</button> */}
                                <Button variant="contained" onClick={() => SelectSevice(service)}>Select</Button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default SelectClinic;
