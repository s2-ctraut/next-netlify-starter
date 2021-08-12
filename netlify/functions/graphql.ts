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

/*
import { Handler } from "@netlify/functions";
import { createLambdaServer } from "./server";

const server = createLambdaServer();

// const handler: Handler = server.createHandler();
const handler = server.createHandler();

export { handler };
*/

import { APIGatewayProxyEvent, Context, Callback } from "aws-lambda";
import { createLambdaServer } from "./server";

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
  cb: Callback
) => {
  // const server = await createLambdaServer(event, context);
  const server = await createLambdaServer();

  return new Promise((res, rej) => {
    // const cb = (err: Error, args: any) => (err ? rej(err) : res(args));
    server.createHandler()(event, context, cb);
  });
};
