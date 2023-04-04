import {HiPaperAirplane} from "react-icons/hi"
import {VscSettingsGear} from "react-icons/vsc"
import useSettingsStore from "@/hooks/stores/useSettingsStore"
import { useCallback } from "react"
import useGenerationStore from "@/hooks/stores/useGenerationStore"

export default function Prompt(){

    const {openSettingsModal, openApiKey} = useSettingsStore()
    const {initialPrompt, updateInitialPrompt ,updateChatHistory} = useGenerationStore()

    const handleModalOpen = useCallback(()=>{
        openSettingsModal()
    }, [openSettingsModal])

    return(
        <div className="self-center flex items-center gap-2 pt-2">
            <div className="relative">
                <input
                    placeholder="Start the conversation..."
                    value={initialPrompt}
                    onChange={(e)=>updateInitialPrompt(e.target.value)}
                    className="bg-chatgpt-grey-accent shadow-sm shadow-chatgpt-black h-10 w-[70vw] rounded-md p-1 focus:outline-chatgpt-grey-light text-chatgpt-white"
                />
                <HiPaperAirplane 
                    onClick={()=>{!openApiKey || openApiKey.length !== 51 ? ()=>alert("Please enter Open AI API Key.") : updateChatHistory([initialPrompt])}}
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
        </div>
    )
}