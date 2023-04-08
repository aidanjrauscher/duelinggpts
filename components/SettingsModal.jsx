import useSettingsStore from "@/hooks/stores/useSettingsStore"
import { useCallback, useEffect } from "react"

export default function SettingsModal(){

    const {
        showSettingsModal,
        closeSettingsModal,
        openApiKey,
        updateOpenApiKey,
        maxTokens,
        updateMaxTokens
    } = useSettingsStore()

    const handleModalSave = ()=>{
        if (openApiKey.length !== 51){
            alert("Please enter Open AI API Key.");
            return;
        }
        if(!/^([0-9]+|[^.-]*)$/.test(maxTokens) || Number(maxTokens)<1 || Number(maxTokens)>1001){
            alert("Please enter a valid token count.");
            updateMaxTokens(250)
            return;
        }
        // Set values from user inputs 
        localStorage.setItem("OPENAIKEY", openApiKey);
        closeSettingsModal()
    }

    const handleModalClose = ()=>{closeSettingsModal()}

    useEffect(() => {
        const savedOpenApiKey = localStorage.getItem("OPENAIKEY");
        if (savedOpenApiKey) {
            updateOpenApiKey(savedOpenApiKey);
        }
    }, []);

    return(
        <div 
            className={`${showSettingsModal ? "display" : "hidden" }
                fixed inset-0 flex z-50 transition duration-200 justify-center items-center bg-chatgpt-black bg-opacity-75`}
            >
            <div className="bg-chatgpt-grey-accent h-min w-min rounded-md px-8 py-12 flex flex-col items-center gap-2 transition duration-300">
                <h2 className="text-chatgpt-white text-xl font-bold bg-opacity-75">Settings</h2>
                <hr className="bg-chatgpt-white border-1 w-5/6"></hr>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1">
                        <label className="text-chatgpt-white font-semibold text-lg">
                            Open AI API Key
                        </label>
                        <input
                            placeholder="Open AI Key..."
                            value={openApiKey}
                            onChange={(e)=>updateOpenApiKey(e.target.value)}
                            className="text-chatgpt-grey-dark bg-chatpgt-text shadow-sm shadow-chatgpt-black h-10 w-[70vw] rounded-md p-1 focus:outline-chatgpt-grey-light text-chatgpt-text"
                        />
                    </div>
                    <div>
                        <label className="text-chatgpt-white font-semibold text-lg">
                            Max Tokens Per Generation
                        </label>
                        <input
                            placeholder="Token count..."
                            value={maxTokens}
                            onChange={(e)=>{updateMaxTokens(/^([0-9]+|[^.-]*)$/.test(e.target.value) && Number(e.target.value)>0 && Number(e.target.value)<1001  ? Number(e.target.value) : 250)}}
                            className="bg-chatpgt-text shadow-sm shadow-chatgpt-black h-10 w-[70vw] rounded-md p-1 focus:outline-chatgpt-grey-light text-chatgpt-text"
                        />
                    </div>
                    <div className="flex flex-row gap-2 justify-center items-center">
                        <button 
                            onClick={handleModalSave}
                            className="text-chatgpt-white font-semibold bg-chatgpt-green px-6 py-2 rounded-md shadow-md shadow-chatgpt-black hover:shadow-none hover:opacity-75 focus:shadow-none focus:opacity-75"
                        >
                            Save
                        </button>
                        <button 
                            onClick={handleModalClose}
                            className="text-chatgpt-white font-semibold bg-chatgpt-red px-6 py-2 rounded-md shadow-md shadow-chatgpt-black hover:shadow-none hover:opacity-75 focus:shadow-none focus:opacity-75"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}