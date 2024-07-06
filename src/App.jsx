import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Form from './components/Form';
import { Container } from '@mui/material';

const App = () => {
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Form />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
