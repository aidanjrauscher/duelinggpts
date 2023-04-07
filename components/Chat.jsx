import useGenerateMessage from "@/hooks/stores/useGenerateMessage"
import useGenerationStore from "@/hooks/stores/useGenerationStore"
import useSettingsStore from "@/hooks/stores/useSettingsStore"
import { useEffect } from "react"
import {MdArrowForwardIos} from "react-icons/md"

export default function Chat(){
    const {
        isGenerating, 
        startGenerating, 
        doneGenerating, 
        chatHistory, 
        updateChatHistory,
        newChat
    } = useGenerationStore()

    const {openApiKey, maxTokens} = useSettingsStore()
    const generateMessage = useGenerateMessage()


    useEffect(()=>{
        console.log("chathistory changed")

        const numMsg = chatHistory.length
        startGenerating()

        const handleGenerateMessage = async ()=>{
            generateMessage()
        }
        //first ai-generated message
        if(numMsg==1 && chatHistory[0]?.agent=="user"){
            handleGenerateMessage()
        }
        if(numMsg>1 && chatHistory[numMsg-1].done){
            handleGenerateMessage()
        }
    }, [chatHistory, updateChatHistory])

     const data = [,"hello","hello","hello","hello", "hiwngwoengafhuhdhequshfwgwgvwubEUIVBUIEWBVUIW   EBVIU   WEBVUIBWEVIU    BWEIUVBUWIEBVIUWEBVIUWEBVWIUBSiuvbwiuvb iuwbviuwrbiuvbweiuVB    IWRUVB  WIUVBWIyfhghqwsfguiwshgcubcqwucbquiwehuihquhcbuiwchbuiewchgioj wnego   sfhugr2 g   4hefuh  2h  norjgn  2oengf  oj2ewnf oejdioqwhjdofeoiqfjhiwngwoengafhuhdhequshfwgwgvwubEUIVBUIEWBVUIW   EBVIU   WEBVUIBWEVIU    BWEIUVBUWIEBVIUWEBVIUWEBVWIUBSiuvbwiuvb iuwbviuwrbiuvbweiuVB    IWRUVB  WIUVBWIyfhghqwsfguiwshgcubcqwucbquiwehuihquhcbuiwchbuiewchgioj wnego   sfhugr2 g   4hefuh  2h  norjgn  2oengf  oj2ewnf oejdioqwhjdofeoiqfj", "hi", "hi", "hello","hi", "hi", "hi", "hello","hi", "hi", "hi", "hello","hi", "hi", "hi", "hello","hi", "hi", "hi", "hello","hi", "hi", "hi", "hello","hi", "hi", "hi", "hello","hi", "hi", "hi", "hello"]
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
                <div key={Math.random()} className="chat-message w-full text-chatgpt-white">
                    <div className="chat-row flex flex-row justify-start w-screen min-h-[2rem] h-min py-2 gap-2 items-start border-b-[1px] border-chatgpt-black px-2">
                        <MdArrowForwardIos size="20" className="chat-icon flex-none"/>
                        {/* ADD CONTENT AND AGENT NAME */}
                        <p className="text-md">{newChat}</p>
                    </div>
                </div>
            }
        </div>
    )
}