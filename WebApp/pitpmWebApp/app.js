const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Подключение маршрутов
const routes = require('./routes/productRoutes');
app.use('/', routes);

app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});