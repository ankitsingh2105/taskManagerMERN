import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import axios from "axios";
import { Link } from 'react-router-dom';
export default function Navbar() {

    const [key, setkey] = useState("");
    const [userName , setuserName] = useState("");
    useEffect(() => {
        let jwtKey = localStorage.getItem("jwtKeyisHere");
        setkey((prevKey) => jwtKey);
        const findUserName = async () => {
            try {
                const response = await axios.get("/user/me", {
                    headers: {
                        "Authorization": `Bearer ${jwtKey}`
                    }
                });
                setuserName((name)=> response.data.name);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        findUserName();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post("/user/logout", null, { headers: { "Authorization": `Bearer ${key}`}});
            window.location.href = "/user/login";
            localStorage.removeItem("jwtKeyisHere");
        }
        catch (error) {
            console.log("Error : ", error);
        }
    }

    const handleSessionsLogout = async() =>{
        try {
            await axios.post("/user/logout/allsessions", null, { headers: { "Authorization": `Bearer ${key}`}});
            window.location.href = "/user/login";
            localStorage.removeItem("jwtKeyisHere");
        }
        catch (error) {
            console.log("Error : ", error);
        }
    }

    return (
        <main className="navMain">
            <ul>
                <li><Link to="">Home</Link></li>
                <div className='navbarInfo' >
                    {
                        !key ?
                            <>
                                <li><Link to="/user/login">Log In</Link></li>
                                <li><Link to="/user/signup">Sign Up</Link></li>
                            </>
                            :
                            <>
                                <li>Name : {userName}</li>
                                <li><Link onClick={handleLogout} >Log Out</Link></li>
                                <li><Link onClick={handleSessionsLogout} >Log Out of all Sessions</Link></li>
                            </>
                    }
                </div>
            </ul>
        </main>
    )
}
