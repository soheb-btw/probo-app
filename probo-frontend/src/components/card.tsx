import { ReactNode } from "react";

interface CardProps{
    children : ReactNode
}

export default function Card({children}: CardProps){
    return <div className="rounded-xl bg-white border-[#e3e3e3] border p-5">{children}</div>
}