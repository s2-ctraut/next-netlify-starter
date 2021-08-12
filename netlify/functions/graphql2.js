const { createLambdaServer } = require('./server2')

const server2 = createLambdaServer();

exports.handler = server2.createHandler({
  cors: {
    origin: '*'
  }
});