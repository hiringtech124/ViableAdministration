import React from 'react'
import { useNavigate } from 'react-router-dom';

function Role() {
    const navigate = useNavigate();

    const handleRoleSelection = (role) => {
        localStorage.setItem('role', role);
        navigate('/login');
    };


    return (
        <>
            <div className='w-full h-screen flex flex-col items-center justify-center'>
                <div className='flex flex-col items-center gap-10 max-md:gap-5 shadow-lg rounded-[50px] max-md:rounded-[30px] p-[50px] max-xl:p-[30px]'>
                    <h1 className='font-bold text-[30px] max-xl:text-[26px] max-md:text-[22px]'>Select your profession</h1>
                    <button onClick={() => handleRoleSelection('owner')} className='text-[#fff] text-[24px] max-xl:text-[20px] max-md:text-[16px] font-semibold text-center px-[100px] max-xl:px-[70px] max-md:px-[40px] py-[10px] max-md:py-[5px] bg-custom-gradient rounded-2xl'>Owner</button>
                    <button onClick={() => handleRoleSelection('employee')} className='text-[#fff] text-[24px] max-xl:text-[20px] max-md:text-[16px] font-semibold text-center px-[100px] max-xl:px-[70px] max-md:px-[40px] py-[10px] max-md:py-[5px] bg-custom-gradient rounded-2xl'>Employee</button>
                </div>
            </div>
        </>
    )
}

export default Role