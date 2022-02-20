import React, { useEffect , useState} from "react";
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, MessageSharp, Mic, MoreVert, SearchOutlined, SettingsInputAntenna } from "@material-ui/icons";
import { useParams } from "react-router";
import db from "../firebase";
import { useStateValue } from "../StateProvider";
import firebase from "firebase/compat/app";

function Chat(){
    const [seed, setSeed]  = useState('');
    const [input , setInput] = useState('');
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue()

    useEffect(()=>{
        if(roomId){
            db.collection('rooms')
                .doc(roomId)
                .onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ));

            db.collection("rooms").doc(roomId).collection('messages').orderBy('timestamp','asc').onSnapshot((snapshot)=>
                    setMessages(snapshot.docs.map((doc)=>
                        doc.data()
                    ))
                );
        }   

        setSeed(Math.floor(Math.random() * 5000))
    },[roomId])


    useEffect(()=>{
            const snaps = db.collectionGroup("rooms").get();

            // console.log(snaps.docs.map(doc => doc.data()))

    },[])

    const sendMessage = (e) => {
         e.preventDefault();
         console.log('Yo types >>> ', input)
         
         db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
         })
         
         setInput("")


    }


    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar  src={`https://avatars.dicebear.com/api/male/${seed}.svg`}/>

                <div className="chat__headerInfo">
                    <h4>{roomName}</h4>
                    <p>Last seen {" "}  {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}  </p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map(message=>(
                    <p className={`chat__message ${user.displayName == message.name && 'chat__receiver'}`}>
                    <span className="chat__name">{message.name}</span>
                    {message.message}
                    <span className="chat__timestamp">
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                </p>
                ))}
                
            </div>
            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticon />
                </IconButton>
                
                
                <form>
                    <input type="text" placeholder="Type a message" onChange={(e) => setInput(e.target.value)} />
                    <button type="submit" onClick={sendMessage}> Send a message</button>
                </form>
                <IconButton>
                    <Mic />
                </IconButton>
            </div>
        </div>
    )
}

export default Chat;