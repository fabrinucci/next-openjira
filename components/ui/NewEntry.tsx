import { ChangeEvent, useState, useContext } from 'react';

import { Box, Button, TextField } from '@mui/material';

import AddIcon from '@mui/icons-material/AddCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';

import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {

  const { addNewEntry } = useContext(EntriesContext);
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false)

  const handleTextChange = ( event: ChangeEvent<HTMLInputElement> ) => {
    setInputValue(event.target.value);
  }

  const cleanUp = () => {
    setIsAddingEntry( false );
    setTouched( false );
    setInputValue('');
  }

  const onSave = () => {
    if( inputValue.length === 0 ) return;

    addNewEntry(inputValue); 
    cleanUp();
  }

  return (

    <Box sx={{ marginBottom: 2, paddingX: 1 }}>

      {
        isAddingEntry ? (
          <>
            <TextField 
              fullWidth
              autoFocus
              multiline
              sx={{ marginTop: 2, marginBottom: 1 }}
              label='Add a new entry'
              placeholder='New Entry'
              helperText={ inputValue.length <= 0 && touched && 'Enter a value' }
              error= { inputValue.length <= 0 && touched }
              value={ inputValue }
              onChange={ handleTextChange }
              onBlur={ () => setTouched(true) }
            />

            <Box display='flex' justifyContent='space-around'>

              <Button
                variant='outlined'
                color='error'
                endIcon={ <CancelIcon /> }
                onClick={ cleanUp }
              >
                Cancel
              </Button>
              
              <Button
                variant='outlined'
                color='secondary'
                endIcon={ <SaveIcon /> }
                onClick={ onSave }
              >
                Save
              </Button>
            </Box>
          </>
        ) :
        (
          <Button
            variant='outlined'
            startIcon={ <AddIcon /> }
            fullWidth
            onClick={ () => setIsAddingEntry(true) }
          >
            Add Task
          </Button>
        )
      }
      
    </Box>
  )
}