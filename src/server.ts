import express from 'express';
import routes from './routes';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(routes);

app.get('/', (req, res) => {
    return res.json({ message: 'Hello world!' });
});

app.listen(3333, () => {
    console.log('Server started on port 3333.');
});