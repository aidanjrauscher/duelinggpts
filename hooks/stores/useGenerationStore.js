import {create} from "zustand"

const useGenerationStore = create((set)=>({
    initialPrompt: "",
    updateInitialPrompt: (prompt)=>set({initialPrompt: prompt}),
    isChatting: false,
    startChatting: ()=>set({isChatting:true}),
    stopChatting: ()=>set({isChatting:false}),
    isGenerating: false,
    startGenerating: ()=>set({isGenerating:true}),
    stopGenerating: ()=>set({isGenerating:false}),
    chatHistory: [],
    appendChatHistory: (chat) => set((state) => ({ chatHistory: [...state.chatHistory, chat] })),
    clearChatHistory: ()=>set({chatHistory: []}),
    newChat: "",
    updateNewChat: (chat)=>set({newChat: chat})
}))

export default useGenerationStore