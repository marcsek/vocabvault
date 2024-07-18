import dotenv from 'dotenv';

dotenv.config();
console.log(process.env ? 'ENV found' : 'ENV NOT FOUND');
//import findConfig from 'find-config';
//console.log(findConfig('.env'));
//
//dotenv.config({ path: findConfig('.env') ?? '' });
