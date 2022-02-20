import { Button } from '@material-ui/core';
import { LocalGasStation } from '@material-ui/icons'
import React from 'react'
import './Login.css';

function Login (){

    const signIn = ()=>{

    }

    return (
        <div className="login">
            <div className="login__container">
                <img src="" alt="" />
                <div className="login__text">
                    <h1>Sign in to Chat App</h1>
                </div>

                <Button onClick="signIn">
                    Sign In With Google
                </Button>
            </div>
        </div>
    )
}

export default Login;