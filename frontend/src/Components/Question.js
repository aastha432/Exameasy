import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import React from 'react';




const Question = () => {
    return (
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Your sample question goes here.</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
          <FormControlLabel value="1" control={<Radio />} label="Option 1" />
          <FormControlLabel value="2" control={<Radio />} label="Option 2" />
          <FormControlLabel value="3" control={<Radio />} label="Option 3" />
          <FormControlLabel value="4" control={<Radio />} label="Option 4" />
        </RadioGroup>
      </FormControl>
    );
  }

export default Question;