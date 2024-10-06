import React, {usestate} from 'react';
import {useDispatch} from 'react-redux';
import {setQuizDetails} from '../redux/quizSlice';
import {useNavigate} from 'react-router-dom';


function QuizSetup(){
    const [name, setName] = usestate('');
    const [category, setCategory] = usestate('');
    const [difficulty, setDifficulty] = usestate('');
    const [numberOfQuestions, setnumberOfQuestion] = usestate('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const startQuiz = () => {
        dispatch(setQuizDetails({name, category, difficulty, numberOfQuestions}));
        navigate('/quiz');
    }

    return(
        <div>
            <h1>Quiz Setup</h1>
            <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select category</option>
                <option value="9">General knowledge</option>
                <option value="21">Sports</option>
                <option value="22">Geography</option>
            </select>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option value="">select Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
    
            <input type="number" value={numberOfQuestions} onChange={(e) => setnumberOfQuestion(e.target.value)}
            min={1}
            max={50} />
        </div>
    );
    
    
};

export default QuizSetup;

