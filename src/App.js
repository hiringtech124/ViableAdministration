import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import Role from './components/role/Role';
import Employee from './components/employee/Employee';
import Owner from './components/owner/Owner';
import CreateTask from './components/createTask/CreateTask';
import { useSelector } from 'react-redux';
import SelectEmployee from './components/createTask/select-employee/SelectEmployee';
import History from './components/taskHistory/History';
import Profile from './components/profile/Profile';

const ProtectedRoute = ({ element }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
    return isAuthenticated ? element : <Navigate to="/" />;
  };

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Role/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/employee" element={<ProtectedRoute element={<Employee />} />} />
                    <Route path='/owner' element={<ProtectedRoute element={<Owner />} />}/>
                    <Route path='/create-task' element={<CreateTask/>}/>
                    <Route path='/select-employee' element={<SelectEmployee/>}/>
                    <Route path='/task-history' element={<ProtectedRoute element={<History/>}/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                </Routes>
            </div>
        </Router>
    );
};

export default App;
