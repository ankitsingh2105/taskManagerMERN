import React, { useState } from 'react'
import axios from "axios"

export default function Login() {
    const [userData, setUserData] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(userData.email);
        console.log(userData.password);
        const { email, password } = userData;
        try{
            const response = await axios.post("/user/login", {
                password: password,
                email: email,
            })
            const jwtKey = response.data.token;
            localStorage.setItem("jwtKeyisHere", jwtKey);
            window.location.href = "/";
        }
        catch(error){
            console.log("this is the error : " , error);
        }
    }
    return (
        <main className="loginMain">
            <center>
                <h1>
                    Thanks for visiting agan!
                </h1>
            </center>
            <center>
                <center>
                    <form onSubmit={handleSubmit} action="">
                        <input onChange={(e) => { setUserData((user) => ({ ...user, email: e.target.value })) }} placeholder='Enter Email' type="email" />
                        <br />
                        <br />
                        <input onChange={(e) => { setUserData((user) => ({ ...user, password: e.target.value })) }} placeholder='Enter password' type="password" />
                        <br />
                        <br />
                        <button>
                            Submit
                        </button>
                    </form>
                </center>
            </center>
        </main>
    )
}
