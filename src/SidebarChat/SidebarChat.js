import React, { useEffect , useState} from 'react';
import './SidebarChat.css';
import {Avatar}  from "@material-ui/core";
import db from '../firebase';
import {Link} from 'react-router-dom';

function SidebarChat({ id, name , addNewChat }){

    const [seed, setSeed] = useState('')
    const [message, setMessages] = useState('');

    useEffect(()=>{
        if(id){
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot((snapshot) => 
                setMessages(snapshot.docs.map((doc)=> (
                    doc.data()
                )))
            )
        }
    },[id])

    useEffect( () => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [])

    const createChat = () => {
        const roomName = prompt("Please enter your name");

        if(roomName){
                // do some clever database stuff here
                db.collection('rooms').add({
                    name: roomName,
                })
        }
    }

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/male/${seed}.svg`} />
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    {
                        message[0]?
                        ( <p><span> {message[0]?.name} -  </span> {message[0]?.message.substring(0,10)}...</p> )
                        :
                        (<></>)
                    }                  
                </div>
            </div>
        </Link>
    ):
    <div className="sidebarChat" onClick={createChat}>
        <h3>Add New Chat</h3>
    </div>
}

export default SidebarChat;