import Link from "next/link"
import { useEffect, useState } from "react"
import Image from "next/image"

function HomePage(){
    return(
        <div className="">
            <div className="flex pl-[70px] pr-[70px] items-center">
                <div className="pl-[50px] font-Raleway mr-[250px]">
                    <h1 className="text-4xl font-bold text-[#FC6c85] mb-6">Where Passion Meets Purpose</h1>
                    <h1 className="text-xl font-bold text-center">We empower students to explore their passions, develop valuable skills, and contribute to their communities, fostering a sense of purpose and making a positive impact on their personal growth and the world around them.</h1>
                    <div className="mt-7">
                        <form className="w-full max-w-l">
                            <div className="flex items-center border-b border-pink-500 py-2">
                                <input
                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    type="email"
                                    placeholder="Your Email"
                                />
                                <button
                                    className="flex-shrink-0 bg-[#FC6c85] hover:bg-pink-700 hover:border-pink-700 text-xl text-white py-1 px-2 rounded"
                                    type="button">
                                    Join our mailing list
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <Image
                    className=""
                    src={"/heart.png"}
                    alt="Heart"
                    height={500}
                    width={500}
                />
            </div>
        </div>
    )
}

export default HomePage