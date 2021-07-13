// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// See https://functions.netlify.com/playground/

let counter = 0;

exports.handler = async (event, _context) => {
  const name = event.queryStringParameters.name || "World";

  console.log("Greetings from hello.ts");
  console.log(`Count = ${counter}`);
  counter++;

  return {
    statusCode: 200,
    body: `Hello, ${name}`,
  };
};
