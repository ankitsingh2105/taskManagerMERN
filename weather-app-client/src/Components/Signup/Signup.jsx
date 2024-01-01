import React, { useState } from 'react'
import axios from "axios";
export default function Signup() {

    const [userData, setUserData] = useState({});

    const handleSubmit = async(event) => {
        event.preventDefault();
        console.log("Op bawa");
        console.log(userData.name);
        console.log(userData.email);
        console.log(userData.password);
        const {name , email , password} = userData;
        let response = await axios.post("/user/signup" , {
            name : name,
            password : password,
            email : email
        })
        const jwtKey = response.data.token;
        localStorage.setItem("jwtKeyisHere", jwtKey);
        window.location.href = "/";
    }
    return (
        <main className="signupMain">
            <center>
                <h1>Thanks for choosing Us</h1>
            </center>
            <center>
                <form onSubmit={handleSubmit} action="">
                    <input onChange={(e) => { setUserData((user) => ({ ...user , name: e.target.value }))}} placeholder='Enter name' type="text" />
                    <br />
                    <br />
                    <input onChange={(e) => { setUserData((user) => ({ ...user , email: e.target.value }))}} placeholder='Enter Email' type="email" />
                    <br />
                    <br />
                    <input onChange={(e) => { setUserData((user) => ({ ...user , password: e.target.value }))}} placeholder='Enter password' type="password" />
                    <br />
                    <br />
                    <button>
                        Submit
                    </button>
                </form>
            </center>
        </main>
    )
}
