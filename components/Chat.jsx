import useGenerateMessage from "@/hooks/stores/useGenerateMessage"
import useGenerationStore from "@/hooks/stores/useGenerationStore"
import { useEffect } from "react"
import {MdArrowForwardIos} from "react-icons/md"

export default function Chat(){
    const {
        isChatting, 
        startChatting, 
        chatHistory, 
        newChat,
        isGenerating
    } = useGenerationStore()
    const generateMessage = useGenerateMessage()


    useEffect(()=>{
        const numMsg = chatHistory.length
        //first ai-generated message
        const handleGenerateMessage = async ()=>{
            startChatting()
            console.log(isChatting)
            generateMessage()

        }

        if(numMsg==1 && chatHistory[0]?.agent=="user"){
            handleGenerateMessage()
        }   
        if(isChatting && numMsg>1 && chatHistory[numMsg-1].parentMessageId){
            handleGenerateMessage()
        }
    }, [chatHistory])

    return(
        <div 
            className="chat-log flex flex-col justify-bottom w-screen h-full overflow-x-hidden overflow-y-scroll items-center 
            scrollbar-thin scrollbar-thumb-chatgpt-white scrollbar-track-chatgpt-black scrollbar-rounded-md"
            >
            {chatHistory.map((item)=>(
                <div key={Math.random()} className="chat-message w-full text-chatgpt-white">
                    <div className="chat-row flex flex-row justify-start w-screen min-h-[2rem] h-min py-2 gap-2 items-start border-b-[1px] border-chatgpt-black px-2">
                        <MdArrowForwardIos size="20" className="chat-icon flex-none"/>
                        {/* ADD CONTENT AND AGENT NAME */}
                        <p className="text-md">{item.message}</p>
                    </div>
                </div>
            ))}
            {newChat &&
                <div className="chat-message w-full text-chatgpt-white">
                    <div className="chat-row flex flex-row justify-start w-screen min-h-[2rem] h-min py-2 gap-2 items-start border-b-[1px] border-chatgpt-black px-2">
                        <MdArrowForwardIos size="20" className="chat-icon flex-none"/>
                        {/* ADD CONTENT AND AGENT NAME */}
                        <span className="text-md">{newChat}</span>
                    </div>
                </div>
            }
        </div>
    )
}