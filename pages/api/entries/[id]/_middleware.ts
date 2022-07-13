import { NextFetchEvent, NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest, ev: NextFetchEvent ) {
  
  const id = req.page.params?.id || '';
  const chekMongoIdRegExp = new RegExp( /^[0-9a-fA-F]{24}$/ );
  
  if( !chekMongoIdRegExp.test(id) ) {

    return new Response( JSON.stringify({ message: 'The ID provided is not valid' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  return NextResponse.next(); 
  
}