import React, { useState } from 'react';
import { FaRegEyeSlash, FaRegCopy } from "react-icons/fa6"; // Import the copy icon



function Register() {
    const [photo, setPhoto] = useState(null);
    const [uploadMessage, setUploadMessage] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [status, setStatus] = useState('');
    const [designation, setDesignation] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [copyMessage, setCopyMessage] = useState(''); // New state for copy message

    const api = process.env.REACT_APP_API_ENDPOINT;



    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleCopyToClipboard = () => {
        const textToCopy = `Email: ${email}\nPassword: ${password}`;
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                setCopyMessage('Email and password copied to clipboard!');
                setTimeout(() => {
                    setCopyMessage('');
                }, 2000); // Clear the message after 2 seconds
            })
            .catch(() => {
                setCopyMessage('Failed to copy email and password.');
                setTimeout(() => {
                    setCopyMessage('');
                }, 2000); // Clear the message after 2 seconds
            });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !photo || !password || !gender || !status || !designation) {
            setErrorMessage('Please fill out all fields and upload a document.');
            return;
        }

        const formData = new FormData();
        formData.append('username', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('profile', photo);
        formData.append('gender', gender);
        formData.append('status', status);
        formData.append('designation', designation);

        try {
            const response = await fetch(`${api}/register`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Registration successful:', data);
                setSuccessMessage('Employee registered successfully !!');
                setErrorMessage('');
                setName('');
                setEmail('');
                setPassword('');
                setPhoto(null);
                setUploadMessage('');
                setGender('');
                setStatus('');
                setDesignation('');
            } else {
                const errorData = await response.json();
                console.error('Registration failed:', errorData);
                setErrorMessage(errorData.error || 'Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred. Please try again.');
        }
    };


    return (
        <>
            <div className='w-[550px] max-lg:w-[450px] rounded-[50px] h-full flex flex-col justify-center items-center bg-[#fff]'>
                <form onSubmit={handleSubmit} className='w-[60%] flex flex-col gap-2'>
                    <div className='flex flex-col items-center justify-center'>
                        <label className="inline-block bg-[#D9D9D9] w-[120px] h-[120px] text-[#7E808F] text-[14px] text-center flex items-center font-medium px-4 rounded-xl cursor-pointer">
                            Upload Photo
                            <input
                                type="file"
                                onChange={(e) => { setPhoto(e.target.files[0]); setUploadMessage('File uploaded'); }}
                                className="hidden"
                            />
                        </label>
                        {uploadMessage && (
                            <div className="mt-2 text-green-600">
                                {uploadMessage}
                            </div>
                        )}
                    </div>
                    <div className='flex flex-col gap-1 w-full'>
                        <label className='text-[16px] font-medium'>Your name</label>
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => { setName(e.target.value); }}
                            placeholder='input your first name'
                            className='border border-[#797979] rounded-xl pl-[30px] py-[10px]'
                        />
                    </div>
                    <div className='flex flex-col gap-1 relative'>
                        <label className='text-[16px] font-medium'>Email address</label>
                        <input
                            type='email'
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); }}
                            placeholder='input email address'
                            className='border border-[#797979] rounded-xl pl-[30px] py-[10px]'
                        />
                    </div>
                    <div className='flex flex-col gap-1 relative'>
                        <label className='text-[16px] font-medium'>Password</label>
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            placeholder='input password'
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); }}
                            className='border border-[#797979] rounded-xl pl-[30px] py-[10px]'
                        />
                        <FaRegEyeSlash onClick={togglePasswordVisibility} className={` ${passwordVisible ? "text-[#C2C3CC]" : "text-[#D79314]"}  text-[20px] absolute right-[30px] bottom-[10px] cursor-pointer`} />
                    </div>
                    <div className='text-right'>
                        <button type='button' onClick={handleCopyToClipboard} className='flex items-center gap-1 text-[#D79314]'>
                            <FaRegCopy className="text-[20px]" />
                            <span className='text-[14px]'>Copy Email & Password to clipboard</span>
                        </button>
                    </div>
                    {copyMessage && (
                        <div className="text-green-600 text-center">
                            {copyMessage}
                        </div>
                    )}
                    <div className='relative bg-[#F9F9F9] border border-[#7F8087] rounded-xl px-[20px] py-[10px]'>
                        <select className='w-full pl-[100px] bg-[#F9F9F9] focus:outline-none' value={gender} onChange={(e) => { setGender(e.target.value) }}>
                            <option value=''></option>
                            <option value="male">Male</option>
                            <option value='female'>Female</option>
                        </select>
                        <h1 className='absolute top-[10px] left-[20px] z-10'>Gender :</h1>
                    </div>
                    <div className='bg-[#F9F9F9] border border-[#7F8087] flex rounded-xl px-[20px] py-[10px]'>
                        <h1 className='z-10'>Status in company :</h1>
                        <select className='w-full bg-[#F9F9F9] text-center focus:outline-none' value={status} onChange={(e) => { setStatus(e.target.value) }}>
                            <option value=''></option>
                            <option value="employee">Employee</option>
                        </select>
                    </div>
                    <div className='relative bg-[#F9F9F9] border border-[#7F8087] rounded-xl px-[20px] py-[10px]'>
                        <select className='w-full pl-[100px] bg-[#F9F9F9] focus:outline-none' value={designation} onChange={(e) => { setDesignation(e.target.value) }}>
                            <option value=''></option>
                            <option value="Tender Marketing">Tender Marketing</option>
                            <option value='Accounts'>Accounts</option>
                            <option value="Manufacturing">Manufacturing</option>
                            <option value='Designing'>Designing</option>
                            <option value="Office boy">Office boy</option>
                            <option value='House keeping'>House keeping</option>
                        </select>
                        <h1 className='absolute top-[10px] left-[20px]'>Designation :</h1>
                    </div>
                    {errorMessage && (
                        <div className="text-red-600 text-center">
                            {errorMessage}
                        </div>
                    )}
                    <div className='text-center py-[10px] rounded-xl bg-custom-gradient font-medium'>
                        <button type='submit' className='text-[18px]'>Register</button>
                    </div>
                    {successMessage && (
                        <div className="text-[#30800B] text-center">
                            {successMessage}
                        </div>
                    )}
                </form>
            </div>
        </>
    );
}

export default Register;
