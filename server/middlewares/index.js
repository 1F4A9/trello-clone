function JSONparse(req, res, next) {
  if (!req.is('json')) return next();

  let data = '';

  req.on('data', chunk => {
    data += chunk.toString();
  });

  req.on('end', () => {
    data = JSON.parse(data);
    req.body = data;
    next();
  });
};

function logger(req, res, next) {
  let timer = Date.now();
  res.once('finish', () => {
    console.log(`Method: ${req.method}, Path: ${req.path}, Status: ${res.statusCode} Response Time: ${Date.now()-timer}ms`);
  });
  next();
};

module.exports = {
  JSONparse,
  logger
};