import dotenv from 'dotenv';
import findConfig from 'find-config';
console.log(findConfig('.env'));

dotenv.config({ path: findConfig('.env') ?? '' });
