import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const API_KEY ='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'

function Chat ({data}) {
    const [typing, setTyping] = useState(false)
    const [messages, setMessages] = useState([
        {
            message:'Hello! I am an application with integrated AI ready to answer all your questions.',
            sender:'ChatGPT'
        }
    ])

    const handleSend = async (message) => {
        const newMessage = {
            message: message,
            sender:'user',
            direction:'outgoing',
        }

        const newMessages = [...messages, newMessage];

        setMessages(newMessages); 

        setTyping(true);

        await proccessMessageToChatGPT(newMessages);
    }

    async function proccessMessageToChatGPT (chatMessages){

        let apiMessages = chatMessages.map((messageObject)=>{
            let role = '';
            if(messageObject.sender === 'ChatGPT'){
                role = 'assistant'
            }else{
                role = 'user'
            }
            return{role: role, content: messageObject.message}
        })


        //initial message defining how we want chatgpt talk to us 
        //(its the third roll: user, assistant, system)
        const systemMessage = {
            'role':'system',
            'content':data
        }

        const apiRequestBody = {
            'model':'gpt-3.5-turbo',
            'messages':[
                systemMessage, //always in front 
                ...apiMessages
            ]
        }

        await fetch('https://api.openai.com/v1/chat/completions',{
            method:'POST',
            headers:{
                'Authorization': 'Bearer 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' ,
                'Content-Type':'application/json'
            },
            body: JSON.stringify(apiRequestBody)
        }).then((data)=>{
            return data.json();
        }).then((data)=>{
            console.log(data);
            console.log(data.choices[0].message.content);
            setMessages([
                ...chatMessages, {
                    message: data.choices[0].message.content,
                    sender: 'ChatGPT'
                }
            ]);
            setTyping(false);
        })
    }

    return(
        <motion.div drag
        dragConstraints={{
          top: -50,
          left: -50,
          right: 50,
          bottom: 50,
        }} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.5}} style={{ position:"relative", width: "100vh", height:'80vh' }}>
            <MainContainer style={{
                        borderRadius:'10px',
                        }}>
                <ChatContainer>       
                    <MessageList
                    style={{
                        backgroundColor:'#F1F6F9',
                        padding:'5px'
                        }}
                    scrollBehavior='smooth'
                    typingIndicator={typing ? <TypingIndicator content={'ChatGPT is typing'}/> : null}
                    >
                        {messages.map((message, i)=>{
                            return <Message key={i} model={message}/>
                        })}
                    </MessageList>
                    
                    <MessageInput placeholder="Type message here" onSend={handleSend}/>        
                </ChatContainer>
            </MainContainer>
        </motion.div>
    )

}

export default Chat;