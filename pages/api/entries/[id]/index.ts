import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database';
import { Entry, IEntry } from '../../../../models';

type Data = 
  | { message: string }
  | IEntry[]
  | IEntry

export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {

  switch ( req.method ) {
    case 'PUT':
      return updateEntry( req, res );
      case 'GET':
        return getEntry( req, res );
    case 'DELETE':
      return deleteEntry( req, res );

    default:
      return res.status(400).json({ message: 'Method ' + req.method + ' does not exist' });
  }

}

const updateEntry = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {
  
  const { id } = req.query;

  await db.connect();

  const entryToUpdate = await Entry.findById(id);

  if( !entryToUpdate ) {
    db.disconnect();
    return res.status(400).json({ message: 'Entry not found' });
  }

  const { 
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    
    const updatedEntry = await Entry.findByIdAndUpdate( 
      id, 
      { description, status }, 
      { runValidators: true, new: true } 
    );

    await db.disconnect();
    res.status(200).json( updatedEntry! );

  } catch (error: any ) {
    await db.disconnect();
    return res.status(400).json({ message: error.errors.status.message });
  }
}

const getEntry = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {
  
  const { id } = req.query;

  await db.connect();
  const entryToGet = await Entry.findById(id);
  await db.disconnect();

  if( !entryToGet ) {
    return res.status(400).json({ message: 'Entry not found' });
  }

  res.status(200).json( entryToGet );

}

const deleteEntry = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {

  const { id } = req.query;
  await db.connect();
  const entryToDelete = await Entry.findById(id);

  if( !entryToDelete ) {
    db.disconnect();
    return res.status(400).json({ message: 'Entry not found' });
  }

  try {
    const deleteEntry = await Entry.findByIdAndDelete( id );
    await db.disconnect();
    res.status(200).json( deleteEntry! );
    
  } catch (error: any) {
    await db.disconnect();
    return res.status(400).json({ message: error.errors.status.message });
  }
}