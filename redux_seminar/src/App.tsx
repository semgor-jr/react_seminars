import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import UserDetails from './components/UserInfo.tsx';

const App: React.FC = () => (
    <Router>
        <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/users/:id" element={<UserDetails />} />
        </Routes>
    </Router>
);

export default App;