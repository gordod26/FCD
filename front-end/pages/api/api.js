import Cors from "cors";
import Morgan from "morgan";
import ErrorHandler from "errorhandler";

// Initializing the cors middleware
const cors = Cors();
const morgan = Morgan("dev");
const errorhandler = ErrorHandler();

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

async function handler(req, res) {
  //Run the middleware
  await runMiddleware(req, res, cors)
    .then(runMiddleware(req, res, morgan))
    .then(runMiddleware(req, res, errorhandler));

  res.json({ Message: `It's working!` });
}

export default handler;
