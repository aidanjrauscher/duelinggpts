import createChatGptAgent from "@/lib/createChatGptAgent";
import sendMessage from "@/lib/sendMessage";
import { data } from "autoprefixer";


export default async function handler(req,res){
    const { msg, openApiKey, tokens, msgNum,  parentMessageId} = req.body
    const dataObj = {}
    dataObj.done = false
    try {

        //check if ai 1 (john) or 2 (jane)
        let currAgent
        let currParentMessageId
        let currPrompt

        //initial user from message
        if(msgNum == 1){
            currAgent = "user"
            currParentMessageId = null
            currPrompt = process.env.INITIAL_PROMPT + `'${msg}'`
        }
        else if(msgNum==2){
            currAgent = "two"
            currParentMessageId = null
            currPrompt = process.env.SECOND_PROMPT + `'${msg}'`
        }
        else if(msgNum%2==0){ //chatgpt agent two
            currAgent = "two"
            currParentMessageId = parentMessageId
            currPrompt = process.env.PROMPT_FOR_TWO + `'${msg}'`
        }
        else{ //chatgpt agent one
            currAgent = "one"
            currParentMessageId = parentMessageId
            currPrompt = process.env.PROMPT_FOR_ONE + `'${msg}'`
        }
        const chatgpt = await createChatGptAgent(openApiKey, tokens)
        if(!chatgpt){ throw new Error("Failed to create instance of ChatGPT")}
        
        //set response header 
        res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache, no-transform",
            Connection: "keep-alive",
        });

        //handle streaming response 
        const streamHandler = async (data) => {
            if (res.writableEnded) {
                console.log("Response has already ended, cannot write more data");
                return;
            }
            dataObj.msg = data.text
            dataObj.agent = (msgNum+1)%2==0 ? "one" : "two"
            const dataString = await JSON.stringify(dataObj)
            res.write(`data: ${dataString}\n\n`);
        };

        //generate response
        const response = await sendMessage(chatgpt, currPrompt , parentMessageId, streamHandler)

        dataObj.parentMessageId = response.parentMessageId
    } catch (err) {
        console.error(err);
        res.status(400)
    } finally {
        dataObj.done = true
        const dataString = JSON.stringify(dataObj)
        res.write(`data: ${dataString}\n\n`)
        res.end()
    }  
};


