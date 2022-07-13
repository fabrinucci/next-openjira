import mongoose from 'mongoose';

// 0: Disconnected
// 1: Connected
// 2: Connecting
// 3: Disconnecting

const moongoConnection = {
  isConnected: 0,
}

export const connect = async () => {

  if( moongoConnection.isConnected ) {
    console.log( 'MongoDB is already connected' );
    return;
  }

  if( mongoose.connections.length > 0 ) {

    moongoConnection.isConnected = mongoose.connections[0].readyState;

    if( moongoConnection.isConnected === 1 ) {
      console.log('Using existing MongoDB connection');
      return;
    }

    await mongoose.disconnect();

  }

  await mongoose.connect( process.env.MONGODB_URL || '' );
  moongoConnection.isConnected = 1;
  console.log( 'MongoDB connected:', process.env.MONGODB_URL );
}

export const disconnect = async () => {

  if( process.env.NODE_ENV === 'development' ) return;

  if( moongoConnection.isConnected === 0 ) return;

  await mongoose.disconnect();
  console.log( 'MongoDB disconnected' );

}