import { Form, useLocation } from "react-router-dom";

export default function Start(props) {
  const location = useLocation()
  const state = location.state

  return (
    <>
      <Form className="start-container" action="/trivia">
        <h1>Quizzical</h1>
        {state && <h2 className="yellow">{state.message}</h2>}
        <label htmlFor="trivia_amount" className="start-label">Number of Questions:</label>
        <input
          type="number"
          name="amount"
          id="trivia_amount"
          className="form-control"
          min={1}
          max={50}
          defaultValue={10}
        />
        <br />
        <label htmlFor="trivia_category" className="start-label">Select Category: </label>
        <select name="category" className="form-control">
          <option value={Math.floor(Math.random() * 24) + 9}>Any Category</option>
          <option value={9}>General Knowledge</option>
          <option value={10}>Entertainment: Books</option>
          <option value={11}>Entertainment: Film</option>
          <option value={12}>Entertainment: Music</option>
          <option value={13}>Entertainment: Musicals &amp; Theatres</option>
          <option value={14}>Entertainment: Television</option>
          <option value={15}>Entertainment: Video Games</option>
          <option value={16}>Entertainment: Board Games</option>
          <option value={17}>Science &amp; Nature</option>
          <option value={18}>Science: Computers</option>
          <option value={19}>Science: Mathematics</option>
          <option value={20}>Mythology</option>
          <option value={21}>Sports</option>
          <option value={22}>Geography</option>
          <option value={23}>History</option>
          <option value={24}>Politics</option>
          <option value={25}>Art</option>
          <option value={26}>Celebrities</option>
          <option value={27}>Animals</option>
          <option value={28}>Vehicles</option>
          <option value={29}>Entertainment: Comics</option>
          <option value={30}>Science: Gadgets</option>
          <option value={31}>Entertainment: Japanese Anime &amp; Manga</option>
          <option value={32}>
            Entertainment: Cartoon &amp; Animations
          </option>{" "}
        </select>
        <br />
        <label htmlFor="trivia_difficulty" className="start-label">Select Difficulty: </label>
        <select name="difficulty" className="form-control">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <br />
        <button className="start-btn" >
          Start quiz
        </button>
      </Form>
    </>
  );
}
