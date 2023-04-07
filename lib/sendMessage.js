export default function sendMessage(chatGPT, message, parentMessageId, streamCallback){
    try{
        return chatGPT.sendMessage(message, {
            parentMessageId: parentMessageId,
            onProgress: streamCallback
        })
    } catch(error){
        console.log(error)
        return null
    }
}