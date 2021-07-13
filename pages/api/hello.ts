// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Handler } from "@netlify/functions";

let counter = 0;

const handler: Handler = async (_event, _context) => {
  console.log("Greetings from hello.ts");
  console.log(`Cpunt = ${counter}`);
  counter++;
  return {
    statusCode: 201,
    body: 'JSON.stringify({ name: "Jane Doe" })',
  };
};

export default handler;
