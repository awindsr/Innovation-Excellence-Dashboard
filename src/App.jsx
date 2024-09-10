import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import Dashboard from './components/Dashboard';
import LoginPage from './pages/LoginPage';
import AddProject from './pages/AddProjectPage';
import ProfilePage from './pages/ProfilePage';


const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/add-project" element={<AddProject />} />
          {/* <Route path='/profile' element={<ProfilePage/>}/> */}
          <Route path="/profile/:id?" element={<ProfilePage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;