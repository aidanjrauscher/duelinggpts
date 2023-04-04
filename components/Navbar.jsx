import {SiOpenai} from "react-icons/si"

export default function Navbar(){
    return(
        <div className="bg-chatgpt-black h-16 flex flex-row justify-between items-center px-4">
            <div  className="flex flex-rowp gap-2 items-center">
                <SiOpenai color="19C37D" size="36"/>
                <h1 className="text-3xl text-bold text-chatgpt-white">DuelingGPTs</h1>
            </div>
        </div>
    )
}