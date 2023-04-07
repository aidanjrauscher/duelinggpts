import {create} from "zustand"

const useGenerationStore = create((set)=>({
    initialPrompt: "",
    updateInitialPrompt: (prompt)=>set({initialPrompt: prompt}),
    isGenerating: false,
    startGenerating: ()=>set({isGenerating:true}),
    doneGenerating: ()=>set({isGenerating:false}),
    chatHistory: [],
    updateChatHistory: (chat)=>set({chatHistory: chat}),
    newChat: "",
    updateNewChat: (chat)=>set({newChat: chat})
}))

export default useGenerationStore