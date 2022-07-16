import { createContext } from 'react';
import { Entry } from '../../interfaces';

interface ContextProps {
  entries: Entry[];
  addNewEntry: (description: string, showSnackbar?: boolean) => void;
  updateEntry: (entry: Entry, showSnackbar?: boolean) => void;
  deleteEntry: (_id: string, showSnackbar?: boolean) => Promise<void>;
}

export const EntriesContext = createContext( {} as ContextProps );