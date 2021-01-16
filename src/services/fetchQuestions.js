const shuffleArray = array =>
    [...array].sort(() => Math.random() - 0.5);

/* fetch questions from API and return array
which contains all fetched data and shuffled array of correct and incorrect answers */
export const fetchQuestions = async (category, difficulty) => {
    const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}`;
    const data = await (await fetch(url)).json();
    return data.results.map(question => ({
        ...question,
        answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
    }))
}