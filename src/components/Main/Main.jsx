import React, { useState, useContext } from 'react';
import './main.css';
import Logo from '../../images/quiz.png';
import { GlobalContext } from '../../context/GlobalState';
import { fetchQuestions } from '../../services/fetchQuestions';
import Question from '../Question/Question';
import Settings from '../Settings/Settings/Settings';

const TOTAL = 10;

const Main = () => {
    const [loading, setLoading] = useState(false);
    const [over, setOver] = useState(false);
    const [quizOver, setQuizOver] = useState(true);
    const [number, setNumber] = useState(0);
    const [score, setScore] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [answer, setAnswer] = useState([]);

    const { category, difficulty } = useContext(GlobalContext);

    const startQuiz = async () => {
        setLoading(true);
        setScore(0);
        setQuizOver(false);
        setOver(false);
        setQuestions(await fetchQuestions(category, difficulty));
        setAnswer([]);
        setNumber(0);
        setLoading(false);
    }

    const checkAnswer = e => {
        const answer = e.currentTarget.value;
        const correct = questions[number].correct_answer === answer;
        if (correct) setScore(prev => prev + 1);
        const answerObject = {
            answer,
            correctAnswer: questions[number].correct_answer,
            correct,
        };
        setAnswer(prev => [...prev, answerObject]);
    }

    const nextQuestion = () => {
        const nextQuestion = number + 1;
        if (nextQuestion === TOTAL) {
            setQuizOver(true);
            setOver(true);
        } else {
            setNumber(prev => prev + 1);
        }
    }

    return (
        <div className="main">
            <img className="logo" alt="logo" src={Logo} />
            {over && (
                <div>
                    <p className="score">Score: {score} / {TOTAL}</p>
                </div>
            )}
            {quizOver ? <Settings /> : null}
            {quizOver ?
                <button
                    className="start"
                    onClick={startQuiz}>
                    {over ? <span>Play Again</span> : <span>Start Quiz</span>}
                </button> : null
            }
            {loading ? <img className="img" alt="loading" src="https://www.fogelstad.org/core/dependencies/loader.gif" /> : null}
            {/* For the first render 'userAnswer' is undefined.
                After select the answer callback function 'checkAnswer' creates object 
                contains three properties:
                answer: User-selected answer
                correctAnswer: just real correct answer
                correct: boolean type, true - if user anwers correctly and false - otherwise.
                With this object as userAnswer, style is changed to correct and 
                incorrect answers' buttons in 'Question' component.
             */}
            {!loading && !quizOver && questions.length > 0 && (
                <Question
                    question={questions[number].question}
                    answers={questions[number].answers}
                    userAnswer={answer ? answer[number] : undefined}
                    callback={checkAnswer}
                />
            )}
            {!quizOver &&
                !loading &&
                answer.length === number + 1 &&
                number !== TOTAL ?
                <button
                    className="next"
                    onClick={nextQuestion}
                >Continue</button> : null
            }
        </div>
    )
}
export default Main