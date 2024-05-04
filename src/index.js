import 'dotenv/config';
import { createInterface } from 'readline';
import { createBucket, deleteBucket } from './s3.js';

const prompt = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function menu() {
  console.log('menu:');
  console.log('1. create bucket');
  console.log('2. delete bucket');
  console.log('3. exit');
  prompt.question('select an option: ', postInput);
}

function postInput(input) {
  const option = parseInt(input);

  switch (option) {
    case 1:
      prompt.question('bucket name: ', async (bucket) => {
        try {
          console.log(await createBucket(bucket.trim()));
          menu();
        } catch (error) {
          console.error('\nerror: ', error + '\n');
          menu();
        }
      });
      break;
    case 2:
      prompt.question('bucket name to delete: ', async (bucket) => {
        console.log(await deleteBucket(bucket.trim()));
        menu();
      });
      break;
    case 3:
      prompt.close();
      break;
    default:
      console.log('\ninvalid option\n');
      menu();
      break;
  }
}

menu();
