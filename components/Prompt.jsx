import {HiPaperAirplane} from "react-icons/hi"
import {VscSettingsGear} from "react-icons/vsc"
import useSettingsStore from "@/hooks/stores/useSettingsStore"
import { useCallback } from "react"
import useGenerationStore from "@/hooks/stores/useGenerationStore"

export default function Prompt(){

    const {openSettingsModal, openApiKey} = useSettingsStore()
    const {initialPrompt, updateInitialPrompt, appendChatHistory,clearChatHistory,isGenerating, chatHistory, stopGenerating} = useGenerationStore()

    const handleEnterPress = (event) => {
        if(event.key === 'Enter'){
            handlePromptSubmit()
        }
    }

    const handlePromptSubmit = ()=>{    
        if(chatHistory?.length>0){ return }
        if(!openApiKey || openApiKey.length !== 51){
            alert("Please enter Open AI API Key.")
            return
         }
         appendChatHistory({agent: "user", message: initialPrompt, parentMessageId: null})
         updateInitialPrompt("")
    }

    const handleModalOpen = useCallback(()=>{
        openSettingsModal()
    }, [openSettingsModal])

    return(
        <div className="self-center flex justify-center items-center gap-2 px-1 pt-2 flex-wrap">
            <div className="relative">
                <input
                    placeholder="Start the conversation..."
                    value={initialPrompt}
                    onChange={(e)=>updateInitialPrompt(e.target.value)}
                    className="bg-chatgpt-grey-accent shadow-sm shadow-chatgpt-black h-10 w-[70vw] rounded-md p-1 focus:outline-chatgpt-grey-light text-chatgpt-white"
                    onKeyDown={handleEnterPress}
                />
                <HiPaperAirplane 
                    onClick={handlePromptSubmit}
                    color="#E1E1E6" 
                    size="20" 
                    className={`absolute rotate-45 right-1 top-2 ${initialPrompt ? "hover:cursor-pointer hover:opacity-75" : "" }`}
                />
            </div>
            <div>
                <VscSettingsGear 
                    onClick={handleModalOpen}
                    color="#E1E1E6" 
                    size="24" 
                    className="hover:opacity-75 hover:cursor-pointer"/>
            </div>
            <button 
                onClick={isGenerating ? ()=>{stopGenerating()} : ()=>{clearChatHistory([])}}
                disabled = {!isGenerating && chatHistory.length==0}
                className={`text-chatgpt-white font-semibold bg-chatgpt-red px-6 py-2 rounded-md shadow-md shadow-chatgpt-black  first-letter first-letter first-letter
                ${isGenerating || chatHistory.length!=0 ? "hover:shadow-none hover:opacity-75 focus:shadow-none" : "bg-opacity-75 cursor-default"}`}
            >
                {isGenerating ? "Stop" : "Clear"}
            </button>
        </div>
    )
}