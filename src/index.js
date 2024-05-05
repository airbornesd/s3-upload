import 'dotenv/config';
import { createInterface } from 'readline';
import { createBucket, deleteBucket, getAllBucket } from './s3.js';

const prompt = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function menu() {
  console.log('menu:');
  console.log('1. get all bucket');
  console.log('2. create new bucket');
  console.log('3. delete a bucket');
  console.log('4. exit');
  prompt.question('select an option: ', postInput);
}

function postInput(input) {
  const option = parseInt(input);

  switch (option) {
    case 1:
      async () => await getAllBucket();
      menu();
      break;
    case 2:
      prompt.question('bucket name: ', async (bucket) => {
        try {
          console.log(await createBucket(bucket.trim()));
          menu();
        } catch (error) {
          console.error('\nerror creating bucket: ', error + '\n');
          menu();
        }
      });
      break;
    case 3:
      prompt.question('bucket name to delete: ', async (bucket) => {
        try {
          console.log(await deleteBucket(bucket.trim()));
          menu();
        } catch (error) {
          console.error('\nerror deleting bucket: ', error.message + '\n');
          menu();
        }
      });
      break;
    case 4:
      prompt.close();
      break;
    default:
      console.log('\ninvalid option\n');
      menu();
      break;
  }
}

menu();
