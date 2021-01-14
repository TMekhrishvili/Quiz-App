import React, { useState, useContext } from 'react';
import './main.css';
import Logo from '../../images/quiz.png';
import SettingsIcon from '../../images/settings.svg';
import { GlobalContext } from '../../context/GlobalState';
import { fetchQuestions } from '../../services/fetchQuestions';
import Question from '../Question/Question';
import Settings from '../Settings/Settings/Settings';

const TOTAL = 10;

const Main = () => {

    const [loading, setLoading] = useState(false);
    const [over, setOver] = useState(false);
    const [quizOver, setQuizOver] = useState(true);
    const [start, setStart] = useState(true);
    const [number, setNumber] = useState(0);
    const [score, setScore] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [answer, setAnswer] = useState([]);

    const { category, difficulty } = useContext(GlobalContext);
    
    const startQuiz = async () => {
        setLoading(true);
        setStart(false);
        setScore(0);
        setQuizOver(false);
        setOver(false);
        setQuestions(await fetchQuestions(category, difficulty));
        setAnswer([]);
        setNumber(0);
        setLoading(false);
    }

    const checkAnswer = e => {
        if (!quizOver) {
            const answer = e.currentTarget.value;
            const correct = questions[number].correct_answer === answer;
            if (correct) setScore(prev => prev + 1);
            const answerObject = {
                question: questions[number].question,
                answer,
                correct,
                correctAnswer: questions[number].correct_answer,
            };
            setAnswer(prev => [...prev, answerObject]);
        }
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
            <div className="settings">
                <img className="settings-image" alt="settings" src={SettingsIcon} />
            </div>
            <img className="logo" alt="logo" src={Logo} />
            {over && (
                <div>
                    <p className="score">Score: {score}</p>
                </div>
            )}
            {start ? <Settings /> : null}
            {quizOver || answer.length === TOTAL + 1 ? (
                <button
                    className="start"
                    style={over ? { opacity: 1 } : { opacity: 1 }}
                    onClick={startQuiz}>
                    {over ? <span>Play Again</span> : <span>Start Quiz</span>}
                </button>
            ) : null}
            {loading ? <img className="img" alt="loading" src="https://www.fogelstad.org/core/dependencies/loader.gif" /> : null}
            {!loading && !quizOver && (
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
                    className="next opacity"
                    onClick={nextQuestion}
                >Continue</button> : null
            }
        </div>
    )
}
export default Main