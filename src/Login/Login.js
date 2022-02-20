import { Button } from '@material-ui/core';
import { LocalGasStation } from '@material-ui/icons'
import React, {useState} from 'react'
import './Login.css';
import { auth, provider } from '../firebase';
import db from '../firebase';
import { actionTypes } from '../reducer';
import { useStateValue } from '../StateProvider';
import firebase from "firebase/compat/app";


function Login (){

    const [{user}, dispatch] = useStateValue();
    const [userId, setUserId] = useState('');


    const signIn = ()=>{
        auth.signInWithPopup(provider).then(result => {

            console.log(result.user.email)

            const checkUser = async() => db.collection('users').where('email',"==",result.user.email).get().then((snapshot)=>{

                console.log((snapshot.docs.map(snap => snap.data().email).length))

               if((snapshot.docs.map(snap => snap.data().email).length)){
                console.log(snapshot.docs)
                    console.log("User already exists")
                    snapshot.docs.map(snap => (

                            localStorage.setItem('logger_id', snap.id)
                            ))
               }
               else{
                db.collection('users').add({
                    email: result.user.email,
                    is_online: true,
                    last_active: firebase.firestore.FieldValue.serverTimestamp(),
                    username: result.user.displayName
                })
            }
        }
        ).catch(err => alert(err))

            dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            })
        }).catch(err => alert(err.message))
    }

    return (
        <div className="login">
            <div className="login__container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2042px-WhatsApp.svg.png" alt="" />
                <div className="login__text">
                    <h1>Sign in to Chat App</h1>
                </div>

                <Button onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>
        </div>
        )
    }

    export default Login;