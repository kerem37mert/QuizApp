import { useState, useEffect } from "react";

import styles from "./Quiz.module.css";

const Quiz = () => {

    const [question, setQuestion] = useState({});
    const [answers, setAnswers] = useState([]);
    const [selected, setSelected] = useState("");

    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const getNextQuestion = () => {
        const url = "https://opentdb.com/api.php?amount=1&category=18&type=multiple";

        fetch(url)
            .then(res => res.json())
            .then(data => {
                const fetchedQuestion = data.results[0];
                setQuestion(fetchedQuestion);
                setAnswers(shuffle([fetchedQuestion.correct_answer, ...fetchedQuestion.incorrect_answers]));
            }).catch(err => console.log(err));
    }

    const handleSelectAnswers = (answer) => {
        setSelected(answer);
    }

    useEffect(() => {
        if(!selected)
            return;

            getNextQuestion();
    }, [selected]);

    useEffect(() => {
        getNextQuestion();
    },[]);

    return(
        <div className={styles["quiz-container"]}>
            <div className={styles["question-container"]}>
                <h2 className={styles.title}>
                    Question: <span className={styles.question}>{ question.question }</span>
                </h2>
            </div>
            { answers.map(answer => (
                <button
                    key={answer}
                    className={ styles["answer-button"] + " " +
                        (selected === answer ?
                            selected === question.correct_answer ?
                                styles["answer-correct-button"]
                                :
                                styles["answer-wrong-button"]
                            :
                            styles["answer-default-button"])
                    }
                    onClick={() => handleSelectAnswers(answer) }
                >
                    { answer }
                </button>
            ))}
        </div>
    );
}

export default Quiz;