import {create} from "zustand"

const useGenerationStore = create((set)=>({
    initialPrompt: "",
    updateInitialPrompt: (prompt)=>set({initialPrompt: prompt}),
    generating: false,
    startGenerating: ()=>set({generating:true}),
    doneGenerating: ()=>set({generating:false}),
    chatHistory: [],
    updateChatHistory: (chat)=>set({chatHistory: chat})
}))

export default useGenerationStore