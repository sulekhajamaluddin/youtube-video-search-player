import setUpServer from './app';

const app = setUpServer();
const port = 3010;
const host = 'localhost';

//server
app.listen(port, host, () => {
  console.log(`Server is running on ${host}: ${port}`);
});
