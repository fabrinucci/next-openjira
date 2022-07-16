import mongoose from 'mongoose';

// 0: Disconnected
// 1: Connected
// 2: Connecting
// 3: Disconnecting

const mongoConnection = {
  isConnected: 0,
}

export const connect = async () => {

  if( mongoConnection.isConnected ) {
    console.log( 'MongoDB is already connected' );
    return;
  }

  if( mongoose.connections.length > 0 ) {

    mongoConnection.isConnected = mongoose.connections[0].readyState;

    if( mongoConnection.isConnected === 1 ) {
      console.log('Using existing MongoDB connection');
      return;
    }

    await mongoose.disconnect();

  }

  await mongoose.connect( process.env.MONGODB_URL || '' );
  mongoConnection.isConnected = 1;
  console.log( 'MongoDB connected:', process.env.MONGODB_URL );
}

export const disconnect = async () => {

  if( process.env.NODE_ENV === 'development' ) return;

  if( mongoConnection.isConnected === 0 ) return;

  await mongoose.disconnect();
  mongoConnection.isConnected = 0;
  console.log( 'MongoDB disconnected' );

}