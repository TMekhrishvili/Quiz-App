import React, { useContext } from 'react';
import './difficulty.css';
import { GlobalContext } from '../../../context/GlobalState';

const difficultyOptions = [
    "easy",
    "medium",
    "hard"
]

const Difficulty = () => {

    const { difficulty, setDifficulty } = useContext(GlobalContext);

    const handleChange = e => {
        setDifficulty(e.target.value);
    }

    return (
        <div className="difficulty-container">
            <select
                type="select"
                value={difficulty}
                onChange={handleChange}
                className="difficulty">
                {difficultyOptions.map((value) => (
                    <option
                        key={value}
                        name={value}
                        value={value}
                        style={{ textTransform: 'capitalize' }}
                    >
                        {value.charAt(0).toUpperCase() + value.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    )
}
export default Difficulty