import { useState, useEffect} from "react";
import Fieldset from "./Fieldset";
import { nanoid } from "nanoid";
import {decode} from "html-entities"
import Loader from "./Loader"
import  {useSearchParams, Link, Navigate} from "react-router-dom" 
import shuffleArray from "./utils";


export default function Trivia() {
    // First we get the search params and fetch based on them
    let [searchParams, setSearchParams] = useSearchParams()
    const searchParamsString = searchParams.toString()
    const amount = searchParams.get("amount")

    // In this state we store the fetched data, and update the selected answers
    const [questions, setQuestions] = useState([])
    // This State checks if its time to review the answers
    const [review, setReview] = useState(false)
    // This state triggers the restart to fetch new questions
    const [restart, setRestart] = useState(0)
    let names = []


    // This are chatGPT suggestions to improve performance and UX
    const [loading, setLoading] = useState(true);
    const [errorState, setErrorState] = useState(null)

    
    // Fetch the data of the questions
    useEffect(() => {
        async function getQuestions() {
            setLoading(true); // gpt
            setErrorState(null); // gpt

            try {
                const response = await fetch(
                    `https://opentdb.com/api.php?${searchParamsString}&type=multiple`
                );
                if (!response.ok){
                    throw new Error("Network response was not ok")
                }
                const data = await response.json();
                const results = data.results

                // Dynamically generate the names array based on the number of questions
                for (let i = 0; i < results.length; i++){
                    names.push(`question${i}`)
                }

                setQuestions(results.map((result, index) => {
                    return {
                        name: names[index],
                        [names[index]]: "",
                        id: nanoid(),
                        question: decode(result.question),
                        correct_answer: decode(result.correct_answer),
                        incorrect_answers: decode(result.incorrect_answers),
                        options: shuffleArray([decode(result.correct_answer), decode(result.incorrect_answers)].flat())
                    }
                }))  
            } 
            catch(error){
                setErrorState(error.message)
                console.log(errorState)
            } 
            finally {
                setLoading(false)
            }
        } 
        // Call the function
        getQuestions()
    }, [restart]);


    // Register and update the answer for each quesiton
    function handleChange(event) {
        if (!review){
            const {name, value} = event.target;
            setQuestions(prevQuestions => prevQuestions.map((question => {
                if (name in question){
                    return {
                        ...question,
                        [name]: value,
                    }
                }
                else {
                    return question
                }
            })))
        }
    }

    const questionsArray = questions.map((question, index) => {
       
        return (
            <Fieldset
                name={question.name}
                handleChange={handleChange}
                key={question.id}
                question={question.question}
                options={question.options}
                correctAnswer={question.correct_answer}
                review={review}
            />
        );
    });
    

    function checkAnswers(event) {
        event.preventDefault();
        setReview(true)
    }

    function handleRestart(event){
        event.preventDefault
        setRestart(prev => prev + 1)
        setReview(false)
    }

    function score(){
        let index = 0
        let scoreValue = 0
        for (let question of questions){
            if (question[`question${index}`] === question.correct_answer){
                console.log(question[names[index]])
                console.log("hi")
                scoreValue++
            }
            index++
        }
        return scoreValue
    }

    // In case of error return to start page
    // if (error) {
    //     return <Navigate to={"/"} state={{message: "Sorry there was an error in the requested trivia, try again."}}/>
    // }


    // Give a props that contains the right answer

    return (
        <div className="trivia-container">
            {loading && <Loader />} 
            {/* {error && <p className="score">Error: {error}</p>} */}

            {!loading &&  (
                <>
                    
                    <form>
                        {questionsArray.length > 0 ? questionsArray : <h1>Something went wrong try to refresh...</h1>}
                    </form>
                    <div className="buttons">
                        <button onClick={!review ? checkAnswers : handleRestart} className="start-btn">{!review ? "Check Answers" : "Restart Trivia"}</button>
                        {review && <Link to={"/"}><button className="back-btn">Get back to main page</button></Link>}
                    </div>
                    <p className="score">{review && `You scored ${score()}/${amount} correct answers`}</p>
                </>
            )}
        </div>
    );
}
