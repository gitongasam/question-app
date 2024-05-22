import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function QuestionForm() {
  const [quiz, setQuiz] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch('http://myapp-env.eba-ub9uw39e.eu-north-1.elasticbeanstalk.com/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quiz }),
      });

      navigate('/all'); // Redirect to the AllQuestions page after submitting the question
    } catch (error) {
      console.error('Error saving question:', error);
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Send Questions</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <input
          value={quiz}
          onChange={(e) => setQuiz(e.target.value)}
          placeholder="Enter your question here..."
          required
          style={{ width: '90%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}> {/* Flex container */}
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Submit Question
          </button>
          <button
            onClick={() => navigate('/all')} // Redirect to the AllQuestions page when the button is clicked
            style={{
              padding: '10px 20px',
              backgroundColor: 'green',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            View All Questions
          </button>
        </div>
      </form>
    </div>
  );
}

export default QuestionForm;
