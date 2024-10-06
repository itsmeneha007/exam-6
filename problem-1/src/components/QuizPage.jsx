


import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nextQuestion, incrementCorrectAnswer, setQuestions } from '../redux/quizSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function QuizPage() {
    const { category, difficulty, numberOfQuestions, questions, currentQuestionIndex, correctAnswer } = useSelector((state) => state.quiz);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await axios.get(`https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`);
            dispatch(setQuestions(response.data.results));
        };
        fetchQuestions();
    }, [category, difficulty, numberOfQuestions, dispatch]);

    useEffect(() => {
        const difficultyTime = difficulty === 'easy' ? 20 : difficulty === 'medium' ? 15 : 10;
        setTimer(difficultyTime);
        const countdown = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(countdown);
    }, [currentQuestionIndex, difficulty]);

    const handleNextQuestion = () => {
        if (selectedAnswer === questions[currentQuestionIndex].correct_answer) {
            dispatch(incrementCorrectAnswer());
        }
        if (currentQuestionIndex < numberOfQuestions - 1) {
            dispatch(nextQuestion());
            setSelectedAnswer(null);
        } else {
            navigate('/leaderboard');
        }
    };

    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Question {currentQuestionIndex + 1} of {numberOfQuestions}</h2>
            <p>{questions[currentQuestionIndex].question}</p>

            {questions[currentQuestionIndex].incorrect_answers
                .concat(questions[currentQuestionIndex].correct_answer)
                .sort()
                .map((answer, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedAnswer(answer)}
                        style={{ backgroundColor: selectedAnswer === answer ? 'lightblue' : 'white' }}
                    >
                        {answer}
                    </button>
                ))}

            <div>
                <button onClick={handleNextQuestion}>Next</button>
            </div>

            <p>Time Left: {timer}</p>
        </div>
    );
}

export default QuizPage;