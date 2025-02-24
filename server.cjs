const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("src/mockData/attendanceServer.json");
const middlewares = jsonServer.defaults();

// Enable CORS
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

server.use(middlewares);
server.use(router);

server.listen(4000, () => {
  console.log("JSON Server is running on http://localhost:4000");
});
