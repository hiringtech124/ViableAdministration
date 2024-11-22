import React, { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { RiCloseLargeLine } from "react-icons/ri";

import axios from 'axios';

function Hero() {
    const [searchQuery, setSearchQuery] = useState('');
    const [tasks, setTasks] = useState([])
    const api = process.env.REACT_APP_API_ENDPOINT;
    const [showPopUpDetail, setShowPopUpDetail] = useState(false);
    const [employeeName, setEmployeeName] = useState('');
    const [taskId, setTaskId] = useState('')
    const [taskDetails, setTaskDetails] = useState('');
    const [status, setStatus] = useState('');
    const [newStatus, setNewStatus] = useState('');
    const [documents, setDocuments] = useState([]);
    const [files, setFiles] = useState([]);
    const [uploadMessage, setUploadMessage] = useState('');
    const [refreshTasks, setRefreshTasks] = useState(false);

    const employeeId = useSelector((state) => state.auth.user.id)

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`${api}/tasks`);
                // Filter tasks to include only those matching the employeeId
                const filteredTasks = response.data.filter(task => task.employeeId === employeeId);
                setTasks(filteredTasks);

            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
        setRefreshTasks(false)

    }, [employeeId, refreshTasks]);

    const filteredEmployees = tasks.filter(task =>
        task.taskId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.taskDetails.toLowerCase().includes(searchQuery.toLowerCase())

    );

    const handleClosetask = () => {
        setStatus('')
        setNewStatus('')
        setShowPopUpDetail(false);
        setTaskId('')
        setFiles([])
        setDocuments('')
    }


    const statusStage = ["Beginning", "Under Work", "Done"];
    const [currentIndex, setCurrentIndex] = useState(-1);

    const changeStatus = () => {
        const newIndex = (currentIndex + 1) % statusStage.length;
        setCurrentIndex(newIndex);
        setNewStatus(statusStage[newIndex]);
    };

    const handleDetailsClick = (task) => {
        setShowPopUpDetail(true);
        setEmployeeName(task.employeeName);
        setTaskDetails(task.taskDetails);
        setStatus(task.status);
        setNewStatus(task.status);
        setTaskId(task.id)
        setDocuments(task.documentUrls);
    }


    const handleDocClick = (url) => {
        window.open(url, '_blank'); // Open the document in a new tab
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(prevDocuments => [...prevDocuments, ...selectedFiles]);
        setUploadMessage(`${files.length + 1} file(s) uploaded`);

        console.log('files:', [...files, ...selectedFiles]); // Debugging line
    };


    const handleSave = async () => {

        const formData = new FormData();
        formData.append('status', newStatus);
        formData.append('taskId', taskId);
        if (files != null) {
            files.forEach((document, index) => {
                formData.append('files', document);
            });
        }

        try {
            const response = await axios.post(`${api}/updateTask`, formData, {
                'Content-Type': 'multipart/form-data'
            });

            if (response.status === 200) {
                console.log('Task updated successfully:', response.data);
                setNewStatus('');

                setRefreshTasks(true) // Close the details popup
            } else {
                console.error('Task updation failed:', response.data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <>
            <div className='w-full h-full flex flex-col gap-5 items-center'>
                <div className='w-[80%] h-[70px] max-lg:h-[50px] mt-[15px] bg-custom-gradient rounded-2xl pl-[50px] flex items-center'>
                    <h1 className='text-[#fff] text-[24px] max-lg:text-[20px] font-bold'>Tasks</h1>
                </div>
                <div className='w-[50%] flex items-center relative'>
                    <input
                        type='text'
                        placeholder='Search : "Employee Name" or "Task"'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='w-full py-[10px] max-lg:text-[14px] pl-[30px] max-md:pl-[10px] border border-[#FAC8A2] rounded-2xl'
                    />
                    <FaSearch className='text-[22px] max-lg:text-[18px] text-[#F59245] absolute right-[0px] mr-[30px] max-md:mr-[10px]' />
                </div>
            </div>
            <div className='w-full flex flex-col gap-5 pt-[20px] pb-[50px]'>
                <h1 className='font-semibold text-[20px] max-lg:text-[18px] pl-[50px] max-md:pl-[0px] max-md:text-center'>New tasks</h1>
                <h1 className='text-[20px] max-lg:text-[18px] pl-[100px] max-md:pl-[0px] max-md:text-center'>Task details</h1>
                <div className='flex flex-wrap gap-[50px] px-[40px] gap-y-[50px] max-xl:gap-[30px] justify-center'>
                    {(searchQuery ? filteredEmployees : tasks).map(task => (
                        <>
                            <div key={task.employeeId} className="rounded-[40px] shadow-2xl">
                                <div className='flex flex-col gap-5 p-[20px] pb-[10px]'>
                                    <div className='w-[350px] max-xl:w-[250px] flex flex-col gap-2 max-md:w-[200px]'>
                                        <h1 className='font-semibold text-[20px] max-lg:text-[16px]'>{task.taskDetails}</h1>
                                        <h3 className='text-[18px] max-lg:text-[16px] text-[#C2C3CC]'>Task ID : <span className='text-black font-light'>{task.taskId}</span></h3>
                                        <h3 className='text-[18px] max-lg:text-[16px] text-[#C2C3CC]'>Employee Name : <span className='text-black font-light'>{task.employeeName}</span></h3>
                                        <div className='flex gap-3'>
                                            <button onClick={() => handleDetailsClick(task)} className='bg-custom-gradient px-[20px] py-[2px] text-[#fff] text-[14px] rounded-lg'>detail</button>
                                            {showPopUpDetail && (
                                                <div className='fixed w-full h-screen top-[0px] bottom-[0px] left-[0px] right-[0px] bg-black bg-opacity-20 flex justify-center items-center'>
                                                    <div className='w-[450px] h-[650px] rounded-3xl bg-[#f0f0f0] relative'>
                                                        <div onClick={handleClosetask} className='absolute top-[5%] right-[5%]'>
                                                            <RiCloseLargeLine className='text-[20px]' />
                                                        </div>
                                                        <div className='w-full h-full flex flex-col items-center py-[50px]'>
                                                            <div className='text-center flex flex-col gap-2'>
                                                                <h1><span className='font-bold'>Employee Name : </span>{employeeName}</h1>
                                                                <h1><span className='font-bold'>Employee ID : </span>{employeeId}</h1>
                                                                <h1><span className='font-bold'>Task Details : </span>{taskDetails}</h1>
                                                                <h1><span className='font-bold'>Task Status : </span>{currentIndex === -1 ? status : statusStage[currentIndex]}</h1>
                                                                <div className='flex flex-col px-[10px] h-[300px] overflow-scroll'>
                                                                    {documents.length > 0 ? (
                                                                        documents.map((doc, index) => (
                                                                            <div
                                                                                key={index}
                                                                                onClick={() => handleDocClick(doc.url)}
                                                                                className='cursor-pointer rounded-2xl p-[20px] bg-[#fff] border border-[#ccc] mb-[10px] inline-block'
                                                                            >
                                                                                {doc.name}
                                                                            </div>
                                                                        ))
                                                                    ) : (
                                                                        <p>Loading documents...</p>
                                                                    )}
                                                                </div>
                                                                <label className="inline-block bg-[#D9D9D9] text-black text-[18px] max-md:text-[16px] font-medium py-2 px-4 rounded-xl cursor-pointer">
                                                                    Pick Documents
                                                                    <input
                                                                        type="file"
                                                                        multiple
                                                                        onChange={handleFileChange}
                                                                        className="hidden"
                                                                    />
                                                                </label>
                                                                {uploadMessage && (
                                                                    <div className=" text-green-600">
                                                                        {uploadMessage}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className='flex gap-10 absolute bottom-[3%] font-semibold'>
                                                                <button onClick={handleSave} className='bg-custom-gradient rounded-lg py-[10px] px-[30px] text-[#fff] text-[20px]'>Save</button>
                                                                <button onClick={changeStatus} className='bg-custom-gradient rounded-lg py-[10px] px-[30px] text-[#fff] text-[20px]'> Change Status</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <button className='bg-custom-gradient px-[20px] py-[2px] text-[#fff] text-[14px] rounded-lg'>Chat</button>
                                        </div>
                                    </div>

                                </div>
                                <hr className='border-b border-black mb-[30px]' />
                            </div>

                        </>

                    ))}
                </div>
            </div>
        </>
    );
}

export default Hero