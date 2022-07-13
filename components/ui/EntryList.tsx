import { DragEvent, FC, useContext, useMemo } from 'react';

import { List, Paper } from '@mui/material';

import { EntryStatus } from '../../interfaces';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';
import { EntryCard } from './';

import styles from './EntryList.module.css';

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {

  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext);

  const entriesByStatus = useMemo(() => 
  entries.filter( entry => entry.status === status ), [entries, status] );

  const onDragOver = ( event: DragEvent<HTMLDivElement> ) => {
    event.preventDefault();
  }

  const onDropEntry = ( event: DragEvent<HTMLDivElement> ) => {
    const entryId = event.dataTransfer.getData('text');
    const entry = entries.find( entry => entry._id === entryId );
    if( entry ) {
      entry.status = status;
      updateEntry( entry );
      endDragging();
    }
  }

  return (
    <div
      className={ isDragging ? styles.dragging : '' }
      onDrop={ onDropEntry }
      onDragOver={ onDragOver }
    >
      <Paper 
        sx={{ 
          height: 'calc(100vh - 180px)',
          overflowY: 'auto', 
          backgroundColor: 'transparent',
          padding: '3px 6px'
        }}
      >

        <List sx={{ opacity: (isDragging) ? 0.3 : 1, transition: 'all .3s' }}>
          {
            entriesByStatus.map( entry => (
              <EntryCard key={ entry._id } entry={ entry } />
            ))
          }
        </List>

      </Paper>
    </div>
  )
}