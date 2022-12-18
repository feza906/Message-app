import { useState,useEffect } from "react";
import {StreamChat} from 'stream-chat';
import {Chat,Channel,Window,ChannelHeader,MessageInput,MessageList, ChannelList} from 'stream-chat-react'
import 'stream-chat-react/dist/css/index.css';

const API_KEY = process.env.REACT_APP_APIKEY;

const User1 = {
  id: 'user1',
  name: 'user1',
}
const User2 = {
  id: 'user2',
  name: 'user2',
}
const User3 = {
  id: 'user3',
  name: 'user3',
}
const users = [User1,User2,User3];

const getRandomUser = () => {
  const randomIndex = Math.floor(Math.random()*users.length);
  return users[randomIndex];
}

function App() {

  const [chatClient,setChatClient] = useState(null);
  const [channel,setChannel] = useState(null);
  
  useEffect(() => {
    async function initChat(){
    const client = StreamChat.getInstance(API_KEY)

    const user = getRandomUser();
     client.connectUser(user,client.devToken(user.id))
    const channel =client.channel('team','general',{
      name:'General',
      image:"https://images.unsplash.com/photo-1664575599618-8f6bd76fc670?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8dGVhbXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60",
    })
    // let's change the name of this channel
    await channel.updatePartial({ set:{ name: "Developer Community" } });
    await channel.create();
    channel.addMembers([user.id])
    setChannel(channel)

    setChatClient(client);
    }
    initChat();
    return() => {
      if(chatClient) chatClient.disconnectUser()
    }
  },[])

  if(!chatClient || !channel) return <>helo</>

  return (
    <div className="App">
      <Chat client={chatClient} theme={'messsaging light'}>
     
     <ChannelList/>
      <Channel>
        <Window>
          <ChannelHeader/>
          <MessageList/>
          <MessageInput/>
        </Window>
      </Channel>
      </Chat>
    </div>
  );
}

export default App;
