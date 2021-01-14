import React, { useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import './category.css';

const categoryOptions = [
    "General knowledge",
    "Books",
    "Film",
    "Music",
    "Musicals and Theatres",
    "Musicals",
    "Video Games",
    "Board Games",
    "Science and Natural",
    "Science: Computer",
    "Science: Mathematics",
    "Geography",
    "History",
    "Politics",
    "Arts",
    "Celebrities",
    "Animal",
    "Vehicles"
]

const Category = () => {

    const { category, setCategory } = useContext(GlobalContext);

    const handleChange = e => {
        setCategory(parseInt(e.target.value));
    }

    return (
        <div className="category-container">
            <select
                type="select"
                value={category}
                onChange={handleChange}
                className="category">
                {categoryOptions.map((value, index) => (
                    <option
                        key={value}
                        name={value}
                        value={index + 9}
                    >
                        {value}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Category