import React from 'react';
import './question.css';

const Question = ({
    question,
    answers,
    callback,
    userAnswer,
}) => {
    return (
        <div className="card">
            <p className="question" dangerouslySetInnerHTML={{ __html: question }} />
            <div className="questionsContainer">
                {answers.map(answer => (
                    <button
                        key={answer}
                        className={
                            !!userAnswer
                                ? userAnswer?.correctAnswer === answer
                                    ? "correct questionButton"
                                    : userAnswer?.answer === answer
                                        ? "incorrect questionButton"
                                        : "questionButton"
                                : "questionButton"
                        }
                        value={answer}
                        disabled={!!userAnswer}
                        onClick={callback}
                    >
                        <span dangerouslySetInnerHTML={{ __html: answer }} />
                    </button>
                ))}
            </div>
        </div >
    )
}
export default Question