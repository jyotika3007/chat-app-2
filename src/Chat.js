import React, { useEffect , useState} from "react";
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined, SettingsInputAntenna } from "@material-ui/icons";
import { useParams } from "react-router";
import db from "./firebase";

function Chat(){
    const [seed, setSeed]  = useState('');
    const [input , setInput] = useState('');
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState('');

    useEffect(()=>{
        if(roomId){
            db.collection('rooms')
                .doc(roomId)
                .onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ))
        }   

        setSeed(Math.floor(Math.random() * 5000))
    },[roomId])

    const sendMessage = (e) => {
         e.preventDefault();
         console.log('Yo types >>> ', input)
         setInput("")
    }


    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar  src={`https://avatars.dicebear.com/api/male/${seed}.svg`}/>

                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen at ...</p>
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
                
                <p className={`chat__message ${true && 'chat__receiver'}`}>
                    <span className="chat__name">Riya</span>
                    Hey Guys
                    <span className="chat__timestamp">10:30am</span>
                </p>
                

                <p className={`chat__message`}>
                    <span className="chat__name">Riya</span>
                    Hey Guys
                    <span className="chat__timestamp">10:30am</span>
                </p>
                
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