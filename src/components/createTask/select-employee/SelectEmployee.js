import React, { useState, useEffect } from 'react';
import './emp.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { removeTask } from '../../../store/taskSlice';
import { useDispatch } from 'react-redux';

function SelectEmployee() {
    const [showPopup, setShowPopup] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [employeeName, setEmployeeName] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [selectedEmployeeIndex, setSelectedEmployeeIndex] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const api = process.env.REACT_APP_API_ENDPOINT;

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get(`${api}/users`);
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employees:', error);
                setErrorMessage('Failed to fetch employees.');
            }
        };

        fetchEmployees();
    }, []);

    const taskStatus = useSelector((state) => state.tasks.taskStatus);
    const taskDetails = useSelector((state) => state.tasks.taskDetails);
    const documents = useSelector((state) => state.tasks.documents);
    const dispatch = useDispatch();

    const handleClosePopup = () => {
        setShowPopup(false);        
        navigate('/owner');
    };

    const handleEmployeeSelection = (index, employee) => {
        setSelectedEmployeeIndex(index);
        setEmployeeId(employee.id);
        setEmployeeName(employee.username);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append('employeeName', employeeName);
        formData.append('employeeId', employeeId);
        formData.append('taskDetails', taskDetails);
        formData.append('status', taskStatus);
        documents.forEach((document) => {
            formData.append('files', document);
          });
        

        try {
            const response = await fetch('https://viable-backend.vercel.app/assigntask', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Task added successfully:', data);
                dispatch(removeTask());
                setShowPopup(true);
                setErrorMessage('');
            } else {
                const errorData = await response.json();
                console.error('Task creation failed:', errorData);
                setErrorMessage(errorData.error || 'Task creation failed');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    return (
        <>
            <div className='w-full h-screen flex justify-center items-center'>
                <div className='h-[650px] max-lg:w-[350px] w-[500px] shadow-xl rounded-3xl '>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-5 items-center'>
                        <h1 className='text-[32px] max-lg:text-[26px] font-semibold'>Viable Employees</h1>
                        <div className='text-[#C2C3CC] h-[500px] overflow-scroll flex flex-col gap-5'>
                            {employees.map((employee, index) => (
                                <div
                                    key={index}
                                    className={`flex gap-20 max-lg:gap-5 p-[30px] rounded-xl shadow-lg cursor-pointer ${selectedEmployeeIndex === index ? 'border-[#797979] border-2' : ''}`}
                                    onClick={() => handleEmployeeSelection(index, employee)}
                                >
                                    <h1 className='w-[150px] max-lg:w-[100px] text-[24px] max-lg:text-[20px]'>{employee.username}</h1>
                                    <h1 className='w-[150px] max-lg:w-[100px] text-[18px] max-lg:text-[16px]'>{employee.designation}</h1>
                                </div>
                            ))}
                        </div>
                        <div className='w-[350px] max-lg:w-[200px] text-center py-[10px] rounded-xl font-bold text-[20px] max-lg:text-[16px] bg-custom-gradient'>
                            <button type='submit'>Create Task</button>
                        </div>
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                        {showPopup && (
                            <div className="popup z-20 h-full">
                                <div className="popup-inner flex flex-col items-center justify-center gap-5 font-semibold h-[250px] w-[300px]">
                                    <h2 className='text-[24px]'>Success</h2>
                                    <p className='text-[20px] text-[#797979]'>Task assigned successfully</p>
                                    <button onClick={handleClosePopup} className='text-[18px] text-[#30800B]'>ok</button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}

export default SelectEmployee;
