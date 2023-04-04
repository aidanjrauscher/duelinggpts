import {create} from 'zustand'


const useSettingsStore = create((set)=>({
    showSettingsModal: false,
    openSettingsModal: ()=>set({showSettingsModal: true}),
    closeSettingsModal: ()=>set({showSettingsModal: false}),
    openApiKey: "",
    updateOpenApiKey: (key)=>set({openApiKey: key}),
    maxTokens: 250,
    updateMaxTokens: (tokens)=>set({maxTokens: tokens})
}))

export default useSettingsStore