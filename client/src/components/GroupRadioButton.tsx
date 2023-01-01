import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import * as React from "react";

const ControlledRadioButtonsGroup: React.FC<{
    answer?: number;
    questionNumber: number;
    choices: string[];
    onChange: (questionNumber: number, answerIndex: number) => void;
}> = ({ questionNumber, choices, onChange, answer }) => {
    const [value, setValue] = React.useState(answer ? answer.toString() : "");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const answerIndex = (event.target as HTMLInputElement).value;
        setValue(answerIndex);
        onChange(questionNumber, parseInt(answerIndex));
    };

    return (
        <FormControl>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
            >
                {choices.map((choice, index) => (
                    <FormControlLabel key={index} value={index} control={<Radio />} label={choice} />
                ))}
            </RadioGroup>
        </FormControl>
    );
};

export default ControlledRadioButtonsGroup;
