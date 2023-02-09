import dotenv from 'dotenv';
import findConfig from 'find-config';
console.log('JE MI ZLE');
console.log(findConfig('.env'));

dotenv.config({ path: findConfig('.env') ?? '' });
