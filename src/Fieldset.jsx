export default function Fieldset(props){

    const inputElements = props.options.map((option, index) => {
        return (
            <> 
                <input 
                    type="radio"
                    id={`${option}${index}`}
                    name={props.name}
                    value={option}
                    onChange={props.handleChange}
                    disabled={props.review}
                />
                <label htmlFor={`${option}${index}`} 
                    className={props.review && option === props.correctAnswer ?  "correct" : props.review ? "incorrect" : null}>
                    {option}
                </label>
                <br />
            </>
        )
    })
    
    return (
        <fieldset className="fieldset">
            <legend>{props.question}</legend>
            {inputElements}
        </fieldset>
    )
}