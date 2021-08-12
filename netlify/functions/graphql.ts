// See https://functions.netlify.com/playground/

/*
import { Handler } from "@netlify/functions";

let counter = 0;

const handler: Handler = async (event, _context) => {
  const name = event?.queryStringParameters?.name || "World";

  console.log("Greetings from graphql.ts");
  console.log(`Count = ${counter}`);
  counter++;

  return {
    statusCode: 200,
    body: JSON.stringify({ name, counter }),
  };
};

export { handler };
*/

import { createLambdaServer } from "./server";

const server = createLambdaServer();

const handler = server.createHandler();

export { handler };
