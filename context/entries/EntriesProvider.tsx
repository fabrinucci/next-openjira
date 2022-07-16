import { FC, useEffect, useReducer } from 'react';

import { useSnackbar } from 'notistack';

import { Entry } from '../../interfaces';

import { EntriesContext, entriesReducer } from './';
import entriesApi from '../../apis/entriesApi';

export interface EntriesState {
  entries: Entry[];
  showSnackbar?: boolean;
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
}


export const EntriesProvider:FC = ({ children }) => {

  const { enqueueSnackbar } = useSnackbar();

  const [state, dispatch] = useReducer( entriesReducer , Entries_INITIAL_STATE );

  const addNewEntry = async ( description: string ) => {

    const { data } = await entriesApi.post<Entry>('/entries', { description });
    dispatch({ type: '[Entry] Add-Entry', payload: data });
  }

  const updateEntry = async ( { _id, description, status}: Entry, showSnackbar = false ) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${ _id }`, { description, status });
      dispatch({ type: '[Entry] Entry-Updated', payload: data });

      // TODO: Show a snackbar with the updated entry

      if( showSnackbar ) {
        enqueueSnackbar( 'Entry updated', {
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          }                                
        })
      }

    } catch (error) {
      console.log({ error });
    }
      
  }

  const deleteEntry = async ( _id: string ) => {
    try {
      const { data } = await entriesApi.delete<Entry>(`/entries/${ _id }`);
      dispatch({ type: '[Entry] Delete-Entry', payload: data });
    } catch (error) {
      console.log({ error });
    }
  }

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries');
    dispatch({ type: '[Entry] Refresh-Data', payload: data });
  }

  useEffect(() => {
    refreshEntries();
  }, [])

  return (
    <EntriesContext.Provider value={{
      ...state,
      addNewEntry,
      updateEntry,
      deleteEntry
    }}>
      { children }
    </EntriesContext.Provider>
  )
};