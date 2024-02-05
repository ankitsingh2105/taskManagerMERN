import React, { useEffect, useState, useRef } from 'react'
import "./Navbar.css"
import axios from "axios";
import { Link } from 'react-router-dom';
import image from "../Main/default.png"
export default function Navbar() {

    const [key, setkey] = useState("");
    const [userName, setuserName] = useState("");
    const [avatar, setimage] = useState("");
    useEffect(() => {
        let jwtKey = localStorage.getItem("jwtKeyisHere");
        setkey(jwtKey);
        const findUserName = async () => {
            try {
                const response = await axios.get("/user/me", {
                    headers: {
                        "Authorization": `Bearer ${jwtKey}`
                    }
                });
                setuserName(response.data.name);
                const base64String = response.data.avatar.toString('base64');
                setimage(base64String);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        findUserName();
    }, [avatar]);

    const handleLogout = async () => {
        try {
            await axios.post("/user/logout", null, { headers: { "Authorization": `Bearer ${key}` } });
            window.location.href = "/user/login";
            localStorage.removeItem("jwtKeyisHere");
        }
        catch (error) {
            console.log("Error : ", error);
        }
    }

    const handleSessionsLogout = async () => {
        try {
            await axios.post("/user/logout/allsessions", null, { headers: { "Authorization": `Bearer ${key}` } });
            window.location.href = "/user/login";
            localStorage.removeItem("jwtKeyisHere");
        }
        catch (error) {
            console.log("Error : ", error);
        }
    }

    const handelDeleteUser = async () => {
        try {
            await axios.delete("/user/delete", { headers: { "Authorization": `Bearer ${key}` } });
            window.location.href = "/user/login";
            localStorage.removeItem("jwtKeyisHere");
        }
        catch (error) {
            console.log("Error : ", error);
        }
    }

    // ! handeling images
    const imagee = useRef(null)
    const handleImage = async () => {
        if (!imagee.current.files[0]) {
            settoggle((prevVal) => prevVal - prevVal);
            return;
        };
        try {
            const formData = new FormData();
            formData.append("avatar", imagee.current.files[0]);
            let response = await axios.post("/user/me/avatar", formData, { headers: { "Authorization": `Bearer ${key}` } });
            setimage(response.data.avatar.toString('base64'));
            settoggle((prevVal) => prevVal - prevVal);
        }
        catch (error) {
            console.log("error : ", error);
        }
    }

    const [toggle, settoggle] = useState(0)
    const handleNewImage = () => {
        console.log("we are handeling the new image")
        settoggle((prev) => prev + 1);
    }

    return (
        <>
            <main className="navMain">
                <center>
                    <li><Link to="" style={{ textDecoration: 'none', color: 'black' }}>Home</Link></li>
                </center>
                <center>

                    <center>
                        {
                            key ?
                                <div className='navbarInfo' >
                                    <center>
                                        {
                                            avatar ?
                                                <img onClick={handleNewImage} style={{ height: "30px", width: "30px", borderRadius: "50px" }} src={`data:image/jpeg;base64,${avatar}`} alt="User Avatar" />
                                                :
                                                <img onClick={handleNewImage} style={{ height: "30px", width: "30px", borderRadius: "50px" }} src={image} alt="user Image not set" />
                                        }
                                        {
                                            toggle % 2 === 0 ?
                                                <></>
                                                :
                                                <div className='floating'>
                                                    <div className="align">
                                                        <input style={{ marginLeft: "50px" }} type="file" ref={imagee} />
                                                        <br />
                                                        <button onClick={handleImage} >Save Image</button>
                                                    </div>
                                                </div>
                                        }
                                        <li>Name : {userName}</li>
                                    </center>

                                    <center>
                                        <li><Link onClick={handleLogout} style={{ textDecoration: 'none', color: 'black' }} >Log Out</Link></li>
                                        <li><Link onClick={handleSessionsLogout} style={{ textDecoration: 'none', color: 'black' }}>Log Out of all Sessions</Link></li>
                                        <li><Link onClick={handelDeleteUser} style={{ textDecoration: 'none', color: 'black' }}>Remove Me</Link></li>
                                    </center>
                                </div>
                                :
                                <div className='navbarInfo' >
                                    <li><Link to="/user/login" style={{ textDecoration: 'none', color: 'black' }}>Log In</Link></li>
                                    <li><Link to="/user/signup" style={{ textDecoration: 'none', color: 'black' }}>Sign Up</Link></li>
                                </div>
                        }
                    </center>
                </center>
            </main>
            <br />
        </>
    )
}
