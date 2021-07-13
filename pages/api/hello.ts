// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Handler } from "@netlify/functions";

const handler: Handler = async (_event, _context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ name: "Jane Doe" }),
  };
};

// export { handler };
export default handler;
