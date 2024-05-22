import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import QuestionForm from './pages/QuestionForm';
import AllQuestions from './pages/AllQuestions';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <p>Christian church</p>
        </header>
        <Routes>
          <Route path="/" exact element={<QuestionForm />} />
          <Route path="/all" element={<AllQuestions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
