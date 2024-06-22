import React from 'react'
import { useSelector } from 'react-redux'

const Hero = () => {
    const username = useSelector((state) => state.auth.user.username);
    const email = useSelector((state) => state.auth.user.email);
    const designation = useSelector((state) => state.auth.user.designation);
    const profile = useSelector((state) => state.auth.user.profile);
    return (
        <>
            <div className='flex justify-center pt-[150px]'>
                <div className="flex justify-center items-center p-5 gap-20 shadow-2xl w-[600px] rounded-[40px]">
                    <div className="">
                        <img
                            src={profile}
                            alt='profile'
                            className="rounded-full w-[200px] h-[200px] object-cover"
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1 className="text-2xl font-semibold">{username}</h1>
                        <h2 className="text-xl text-gray-600">{designation}</h2>
                        <h3 className="text-lg text-gray-500">{email}</h3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero
