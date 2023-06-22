import Image from "next/image"
import { BiBellMinus } from "react-icons/bi"
import { useEffect } from "react"
import Link from "next/link"

function Navbar(){
    return (
        <div className="pt-2">
            <nav className="">
                <div className="container flex flex-wrap items-center justify-between mx-auto mb-20">
                    <div style={{ marginLeft: '200px' }}>
                        <Link href="/">
                            <div className="flex items-center hover:cursor-pointer font-medium text-4xl p-3 text-[#FC4C4E]">
                                <h1>VolunTeen</h1>
                            </div>
                        </Link>
                    </div>
                    <div className="flex gap-10" style={{ marginRight: "300px" }}>
                        <Link href="http://localhost:3000/ask-question/">
                            <h1 className="p-3 font-normal text-xl text-[#FC4C4E]">About Us</h1>
                        </Link>
                        <Link href="http://localhost:3000/ask-question/">
                            <h1 className="p-3 font-normal text-xl text-[#FC4C4E]">Volunteer Opportunity</h1>
                        </Link>
                        <Link href="http://localhost:3000/ask-question/">
                            <h1 className="p-3 font-normal text-xl text-[#FC4C4E]">Contact</h1>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
