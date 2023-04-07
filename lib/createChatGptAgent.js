import { ChatGPTAPI } from 'chatgpt'

export default async function createChatGptAgent(openApiKey, tokens){
    try{
        const chatgpt = await new ChatGPTAPI({
            apiKey: openApiKey,
            completionParams: {
                temperature: 0.5,
                max_tokens: tokens
            },
        })

        return chatgpt
    }catch(error){
        console.log(error)
        return null
    }
}