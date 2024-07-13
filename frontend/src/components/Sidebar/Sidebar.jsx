import React, { useState } from 'react'
import "./Sidebar.css"
import { Link } from 'react-router-dom';
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { TfiCommentAlt } from "react-icons/tfi";
import { FiUsers } from "react-icons/fi";
import { IoBagCheckOutline } from "react-icons/io5";
import { AiOutlineDollar } from "react-icons/ai";

export default function Sidebar() {
    const [activeIndex, setActiveIndex] = useState(null);

    const items = [
        { text: 'صفحه اصلی', icon: <AiOutlineHome className='icon' />, link: "/" },
        { text: 'محصولات', icon: <MdOutlineProductionQuantityLimits className='icon' />, link: "/products" },
        { text: 'نظرات کاربران', icon: <TfiCommentAlt className='icon' />, link: "/Comments" },
        { text: 'کاربران', icon: <FiUsers className='icon' />, link: "/users" },
        { text: 'سفارشات', icon: <IoBagCheckOutline className='icon' />, link: "/orders" },
        { text: 'تخفیفات', icon: <AiOutlineDollar className='icon' />, link: "/offers" },
    ];

    const handleItemClick = (index) => {
        setActiveIndex(index);
    };
    return (
        <>
            <div className="sidebar">
                <h1 className="sidebar-title">
                    به داشبورد خود خوش آمدید
                </h1>
                <ul className="sidebar-links">
                    {items.map((item, index) => (
                        <li key={index}
                            className={activeIndex === index ? 'active' : ''}
                            onClick={() => handleItemClick(index)}>
                            <Link to={item.link}>
                                {item.icon}
                                {item.text}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
