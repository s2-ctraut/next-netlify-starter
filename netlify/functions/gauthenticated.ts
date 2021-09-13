// See https://functions.netlify.com/playground/

import { Handler } from "@netlify/functions";

let counter = 0;

const handler: Handler = async (event, _context) => {
  const arg1 = Number(event?.queryStringParameters?.arg1) || 0;
  const arg2 = Number(event?.queryStringParameters?.arg2) || 0;
  const sum = arg1 + arg2;

  console.log("Greetings from gauthenticated.ts");
  console.log(`Count = ${counter}`);
  counter++;

  return {
    statusCode: 200,
    body: JSON.stringify({ sum, counter }),
  };
};

export { handler };
