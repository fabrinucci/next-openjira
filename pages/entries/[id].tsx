import { ChangeEvent, useState, useMemo, FC, useContext } from 'react';
import { GetServerSideProps } from 'next';

import { 
  capitalize,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup, 
  TextField,
} from '@mui/material';

import SaveIcon from '@mui/icons-material/SaveOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import { Layout } from '../../components/layouts';

import { Entry, EntryStatus } from '../../interfaces';
import { dbEntries } from '../../database';
import { EntriesContext } from '../../context/entries';
import { useRouter } from 'next/router';
import { dateFuntions } from '../../utils';

interface Props {
  entry: Entry;
}

const valideStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']; 

const EntriesPage: FC<Props> = ({ entry }) => {

  const { updateEntry } = useContext(EntriesContext);
  const router = useRouter();
  
  const [inputValue, setInputValue] = useState( entry.description );
  const [status, setStatus] = useState<EntryStatus>( entry.status );
  const [touched, setTouched] = useState( false );

  const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);

  const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  }

  const onSave = () => {
    
    if( inputValue.trim().length <= 0 ) return;

    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue,
    }

    updateEntry( updatedEntry, true );
    router.push('/');

  }

  const onDelete = () => {
    console.log({ entry });
    // dbEntries.remove( entry._id );
    // router.push('/');
  }

  const date = dateFuntions.getFormatDistanceToNow(entry.createdAt);

  return (
    <Layout title={ inputValue.substring(0, 15) + '...' }>
      <Grid
        container
        justifyContent='center'
        sx={{ marginTop: 2 }}
      >
        <Grid item xs={ 12 } sm={ 8 } md={ 6 }>
          <Card>
            <CardHeader 
              title={ 'Entry: ' }
              subheader={ `Created ${ date }` }
            />
            <CardContent>
              <TextField 
                sx={{ marginTop: 2, marginBottom: 1 }}
                variant='outlined'
                fullWidth
                autoFocus
                multiline
                placeholder='New Entry'
                label='New Entry'
                value={ inputValue }
                onBlur={ () => setTouched(true) }
                onChange={ onInputValueChanged }
                helperText={ isNotValid && 'Enter a value' }
                error={ isNotValid }
              />

              <FormControl>
                <FormLabel>Status:</FormLabel>
                <RadioGroup
                  row
                  value={ status }
                  onChange={ onStatusChanged }
                >
                  {
                    valideStatus.map( option => (
                      <FormControlLabel
                        key={ option }
                        value={ option }
                        control={ <Radio /> }
                        label={ capitalize(option) }
                      />
                    ))
                  }
                </RadioGroup>
              </FormControl>

            </CardContent>
            
            <CardActions>
              <Button
                startIcon={ <SaveIcon /> }
                variant='contained'
                fullWidth
                sx={{ padding: '0.5rem 1rem' }}
                onClick={ onSave }
                disabled={ !inputValue.length }
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton 
        color="primary" 
        onClick={ onDelete }
        sx={{
          position:'fixed',
          bottom: 30,
          right: 60,
          backgroundColor:'error.dark',
          color: 'white'
        }}
      >
        <DeleteIcon />
      </IconButton>

    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  
  const { id } = (params as { id: string });

  const entry = await dbEntries.getEntryById(id);
  

  if( !entry ) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      entry
    }
  }
}

export default EntriesPage;