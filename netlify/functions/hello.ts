import { Handler } from "@netlify/functions";

let counter = 0;

const handler: Handler = async (event, _context) => {
  const name = event?.queryStringParameters?.name || "World";

  console.log("Greetings from hello.ts");
  console.log(`Count = ${counter}`);
  counter++;

  return {
    statusCode: 200,
    body: JSON.stringify({ name, counter }),
  };
};

export { handler };
