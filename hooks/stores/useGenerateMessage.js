import { fetchEventSource } from '@microsoft/fetch-event-source';
import useSettingsStore from './useSettingsStore';
import useGenerationStore from './useGenerationStore';

export default function useGenerateMessage(){
    
    const {chatHistory, updateChatHistory, newChat, updateNewChat} = useGenerationStore()
    const {openApiKey, maxTokens} = useSettingsStore()

    const generateMessage = async()=>{
        const msgNum = chatHistory?.length
        if(msgNum || msgNum>0){
            const message = chatHistory[msgNum-1].message
            const parentMessageId = msgNum>2 ? chatHistory[msgNum-2] : null
            const currChatHistory = chatHistory
            fetchEventSource("/api/generate", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    openApiKey,
                    tokens: maxTokens,
                    msgNum,
                    msg: message, 
                    parentMessageId

                }),
                onmessage: (stream)=>{
                    const data = JSON.parse(stream.data)
                    if (data.done){
                        const newMessage = {
                            agent: (chatHistory.length + 1)%2==0 ? "two" : "one",
                            message: data.msg,
                            parentMessageId: data?.parentMessageId
                        }
                        currChatHistory.push(newMessage)
                        updateNewChat("")
                        updateChatHistory(currChatHistory)
                    } else{
                        updateNewChat(data.msg)
                    }
                }
            })
        }
    }
    return generateMessage
}