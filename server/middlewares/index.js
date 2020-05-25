// app.use((req, res, next) => {
//   if (!req.is('json')) return res.status(400).end();

//   let data = '';

//   req.on('data', chunk => {
//     console.log(chunk);
//     data += chunk.toString();
//   });

//   req.on('end', () => {
//     console.log('END')
//     data = JSON.parse(data);
//     req.body = data;
//     next();
//   })
// })