import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import React, {useState} from 'react';




const Question = ({question, option1, option2, option3, option4, correct}) => {

    const [correctOption, setCorrectOption] = useState(correct);

    return (
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">{question}</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
          <FormControlLabel value="1" control={<Radio />} label={option1} />
          <FormControlLabel value="2" control={<Radio />} label={option2} />
          <FormControlLabel value="3" control={<Radio />} label={option3} />
          <FormControlLabel value="4" control={<Radio />} label={option4} />
        </RadioGroup>
      </FormControl>
    );
  }

export default Question;