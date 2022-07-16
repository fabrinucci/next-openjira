import { DragEvent, FC, useContext } from 'react';
import { useRouter } from 'next/router';

import { 
  Card,
  CardActions,
  CardActionArea,
  CardContent, 
  Typography 
} from '@mui/material';

import { Entry } from '../../interfaces';
import { UIContext } from '../../context/ui';
import { dateFuntions } from '../../utils';

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {

  const { startDragging, endDragging } = useContext(UIContext);

  const router = useRouter();

  const onDragStart = ( event: DragEvent<HTMLDivElement> ) => {
    event.dataTransfer.setData('text', entry._id );
    startDragging();
  }

  const onDragEnd = () => {
    endDragging();
  }

  const onClick = () => {
    router.push(`/entries/${entry._id}`);
  }

  const date = dateFuntions.getFormatDistanceToNow(entry.createdAt);  

  return (
    <Card 
      sx={{ marginBottom: 1 }}
      draggable
      onClick={ onClick }
      onDragStart={ onDragStart }
      onDragEnd={ onDragEnd }
      > 

      <CardActionArea>

        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>
            { entry.description }
          </Typography>
        </CardContent>

        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
          <Typography variant='body2' >{ date }</Typography>
        </CardActions>

      </CardActionArea>
    </Card>
  )
}