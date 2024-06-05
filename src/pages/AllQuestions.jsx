import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AllQuestions.css'; // Import the CSS file

function AllQuestions() {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all questions from the backend when the component mounts
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://quiz-apppl.onrender.com/all');
        const data = await response.json();
        setQuestions(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const fetchComments = async (quizId) => {
    try {
      const response = await fetch(`https://quiz-apppl.onrender.com/quiz/${quizId}/comments`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    }
  };

  const handleQuestionClick = async (question) => {
    // Set the selected question when clicked
    setSelectedQuestion(question);
    // Fetch comments for the selected question
    const comments = await fetchComments(question.id);
    setSelectedQuestion({ ...question, comments });
  };

  const handleCommentChange = (event) => {
    // Update the new comment state
    setNewComment(event.target.value);
  };

  const handleAddComment = async () => {
    // Add a new comment to the selected question
    try {
      const response = await fetch(`https://quiz-apppl.onrender.com/quiz/${selectedQuestion.id}/comment/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newComment }),
      });
      const data = await response.json();
      // Update the comments of the selected question with the newly added comment
      setSelectedQuestion({ ...selectedQuestion, comments: [...selectedQuestion.comments, data] });
      // Clear the new comment input field
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleAddQuestion = () => {
    navigate('/'); // Redirect to the question form page
  };

  return (
    <div className="questions-wrapper" style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '20px' }}>
      <h2>All Questions</h2>
      <button
        onClick={handleAddQuestion}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        Add Question
      </button>
      <div className="questions-container">
        <div className="questions-list">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            questions.map((question) => (
              <div key={question.id} className="question-item">
                <div className="question-header" onClick={() => handleQuestionClick(question)}>
                  <span className="question-text">{question.quiz}</span>
                </div>
                {selectedQuestion && selectedQuestion.id === question.id && (
                  <div className="comments-section">
                    <h3>Comments</h3>
                    <ul>
                      {selectedQuestion.comments.map((comment) => (
                        <li key={comment.id}>{comment.content}</li>
                      ))}
                    </ul>
                    <div className="add-comment">
                      <input type="text" value={newComment} onChange={handleCommentChange} placeholder="Add a new comment" />
                      <button onClick={handleAddComment}>Add Comment</button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AllQuestions;
