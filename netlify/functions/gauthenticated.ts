import { Handler, HandlerResponse } from "@netlify/functions";
import urllib from "urllib";

let calls = 0;

const handler: Handler = async (event, _context): Promise<HandlerResponse> => {
  const id_token = event?.queryStringParameters?.id_token || "";

  console.log("Greetings from gauthenticated.ts");
  calls++;
  console.log(`calls = ${calls}`);

  return new Promise<HandlerResponse>(function (resolve, reject) {
    urllib
      .request(`https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`)
      .then((result) => {
        const token = JSON.parse(result.data);
        console.log(token.name);
        resolve({ statusCode: result.status, body: JSON.stringify(token) });
      })
      .catch((err) => {
        reject({ statusCode: 401, body: err });
      });
  });
};

export { handler };
