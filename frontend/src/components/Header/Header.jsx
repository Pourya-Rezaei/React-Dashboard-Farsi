import React from 'react'
import "./Header.css"

import { GoBell } from "react-icons/go";
import { BsBrightnessHigh } from "react-icons/bs";


export default function Header() {
    return (
        <>
            <div className="header">
                <div className="admin-profile">
                    <img src="/img/user.jpg" alt="admin profile" className='header-profile__img' />
                    <div>
                        <h1>پوریا رضایی</h1>
                        <h3>برنامه نویس فرانت اند</h3>
                    </div>
                </div>
                <div className="header-left-section">
                    <div className="search-box">
                        <input type="text" placeholder='جستجو کنید...' />
                        <button>جستجو</button>
                    </div>
                    <button className="header-left-icon">
                        <GoBell />
                    </button>
                    <button className="header-left-icon">
                        <BsBrightnessHigh />
                    </button>
                </div>
            </div>
        </>
    )
}
