import { createSlice} from '@reduxjs/toolkit';

const quizSlice = createSlice({
    name : 'quiz',
    initialState:{
        name: '',
        category : '',
        difficulty : '',
        numberOfQuestions : 0,
        questions : [],
        currentQuestionIndex: 0,
        correctAnswer: 0,

    },
    reducers:{
        setQuizDetails(state, action){
            state.name = action.patload.name;
            state.category = action.payload.category;
            state.difficulty = action.payload.difficulty;
            state.numberOfQuestions = action.payload.numberOfQuestions;
        },
        setQuestions(state, action){
            state.questions = action.payload;
        },
        incrementCorrectAnswer(state) {
            state.correctAnswer += 1;

        },
        nextQuestion(state){
            if (state.currentQuestionIndex < state.numberOfQuestions -1){
                state.currentQuestionIndex += 1;

            }
        },
        resetQuiz(state) {
            state.currentQuestionIndex = 0;
            state.correctAnswer = 0;
        },
    },
    
});

export const { setQuizDetails, setQuestions, incrementCorrectAnswer, nextQuestion, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;