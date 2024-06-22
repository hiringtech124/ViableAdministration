import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addTask } from '../../store/taskSlice';

const CreateTask = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskStatus, setTaskStatus] = useState('');
  const [documents, setDocuments] = useState([]);
  const [uploadMessage, setUploadMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskTitle || !taskStatus || documents.length === 0) {
      setErrorMessage('Please fill out all fields and upload at least one document.');
      return;
    }
    
    const newTask = {
      taskTitle,
      taskStatus,
      documents,
    };
    console.log(newTask)
    
    dispatch(addTask(newTask));
    navigate('/select-employee');

    // Clear the form after submission
    setTaskTitle('');
    setTaskStatus('');
    setDocuments([]);
    setUploadMessage('');
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setDocuments(prevDocuments => [...prevDocuments, ...selectedFiles]);
    setUploadMessage(`${documents.length + 1} file(s) uploaded`);
    console.log('Documents:', [...documents, ...selectedFiles]); // Debugging line
  };
  // jfksdjfbksdbsd

  return (
    <div className='flex flex-col items-center justify-center gap-10 h-screen w-full'>
      <h1 className='text-[32px] max-xl:text-[28px] max-md:text-[22px] font-semibold'>Create Task</h1>
      <form onSubmit={handleSubmit} className='flex flex-col items-center shadow-lg p-[50px] rounded-3xl gap-5'>
        <div className='w-[400px] max-xl:w-[300px] max-md:w-[250px]'>
          <input
            className='w-full text-[18px] border border-[#797979] rounded-xl pl-[20px] py-[10px]'
            type="text"
            placeholder="Task title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
        </div>
        <div className='w-[400px] max-xl:w-[300px] max-md:w-[250px] bg-[#F9F9F9] border border-[#7F8087] flex rounded-xl px-[20px] py-[10px]'>
          <h1 className='w-[300px] max-md:w-[200px] text-[20px] max-md:text-[16px]'>Work status :</h1>
          <select className='w-full bg-[#F9F9F9] text-center focus:outline-none' value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)}>
            <option value=''></option>
            <option className='text-[20px] max-md:text-[16px]' value="Beginning">Beginning</option>
            <option className='text-[20px] max-md:text-[16px]' value='Under Work'>Under work</option>
            <option className='text-[20px] max-md:text-[16px]' value='Done'>Done</option>
          </select>
        </div>
        <div className='flex justify-center'>
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
            <div className="mt-2 text-green-600">
              {uploadMessage}
            </div>
          )}
        </div>
        {errorMessage && (
          <div className="text-red-600">
            {errorMessage}
          </div>
        )}
        <div className='w-[400px] max-xl:w-[300px] max-md:w-[250px] bg-custom-gradient text-center py-[10px] rounded-xl text-[20px] max-md:text-[16px] font-bold'>
          <button type="submit">Next</button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
