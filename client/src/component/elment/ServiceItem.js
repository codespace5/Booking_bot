import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import './serviceitem.scss';
import Button from '@mui/material/Button';

const ServiceItem = (props) => {
    const { message, setMessage, apiUrl, onServiceSelect, setonServiceSelect } = props
    

    const [isService, selectSevice] = useState(false)
    const [services, setService] = useState([]);
    const [selectedService, setSelectedService] = useState(null)



    const SelectSevice = (bservice) => {
        selectSevice(!isService)
        const msg = "Hello, Please insert the email or phone number"
        setMessage(prevMessage => [...prevMessage, {
            sender: 'bot',
            type: 'selectTimezone',
        }]);

        setMessage(prevMessage => [...prevMessage, {
            sender: 'bot',
            type: 'selectCalender',
        }]);

        setonServiceSelect({
            name: bservice.name,
            duration: bservice.duration,
            price: bservice.price
        })

        console.log("selected service ", onServiceSelect)
    }

    const getavailableTime = async () => {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setService(data.result);
        console.log(res);
    }

    useEffect(() => {
        const getAvailableTime = async () => {
            try {
                const res = await fetch(apiUrl);
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                setService(data.result); // Assuming 'result' contains the array of services
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        getAvailableTime();
    }, []); // Empty dependency array means this effect runs once after the initial render


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
                                    <div>{service.duration} minutes</div>
                                </div>
                                <div className="price">${service.price}</div>
                                <div className="description">{service.description}</div>
                                {/* <button onClick={SelectSevice}>Book</button> */}
                                <Button variant="contained" onClick={() => SelectSevice(service)}>Book</Button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default ServiceItem;
