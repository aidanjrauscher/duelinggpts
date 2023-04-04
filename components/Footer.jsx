export default function Footer(){
    return(
        <div className="bg-chatgpt-black min-h-12 flex flex-row justify-between items-center px-4 py-2 justify-self-end">
            <div className="flex text-xl text-bold text-chatgpt-white flex-wrap">
                Built by 
                    <a className="underline italic hover:opacity-75 mx-1" target="_blank" href="https://aidanjrauscher.notion.site">
                    aidan
                </a>
            </div>
            <div id="support-me">
                <a href="https://www.buymeacoffee.com/aidanjrauscher" target="_blank">
                <button
                    className="text-chatgpt-grey-light p-2 flex cursor-pointer items-center space-x-2 rounded-lg px-3 text-sm hover:opacity-50 shadow-chatgpt-light-grey shadow-md bg-chatgpt-green hover:shadow-sm font-semibold"
                    >
                    Support This Project
                </button>
                </a>
            </div>
        </div>
    )
}