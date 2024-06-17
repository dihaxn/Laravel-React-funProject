import {Link} from "react-router-dom";
import {useRef} from "react";
import axiosClient from "../axios-client.js";

export default function Login(){

    const emailRef = useRef();
    const passwordRef = useRef();

    const onSubmit = (ev) => {
        ev.preventDefault()

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,

        }

        setErrors(null)
        axiosClient.post('/login',payload)
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token)
            })

            .catch(err => {
                const response =err.response;
                if(response && response.status === 422){
                    if (response.data.errors){
                        setErrors(response.data.errors)
                    }else {
                        setErrors({
                            email: [response.data.message]
                        })
                    }

                }

            })

    }
    return(

        <div className="login-signup-form animated fadeInDown">

            <div className="form">
                   <form onSubmit={onsubmit}>
                       <h1 className="title">
                           Login into your account
                       </h1>
                       <input ref={emailRef} type="email" placeholder="Email"/>
                       <input ref={passwordRef} type="password" placeholder="Password"/>

                       <button className="btn btn-block">Login</button>
                       <p className="message">
                           Not Registered? <Link to="/signup">Create an account</Link>
                       </p>
                   </form>

            </div>
        </div>
    )
}
