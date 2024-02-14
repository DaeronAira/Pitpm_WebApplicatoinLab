// Подключение необходимых модулей
const express = require('express');
const fs = require('fs');

// Создание экземпляра приложения Express
const app = express();

// Задание порта сервера
const PORT = 3000;

// Путь к файлу с данными о продуктах
const dataPath = './products.json';

// Подключение middleware для обработки JSON-запросов
app.use(express.json());

// Массив для хранения продуктов
let products = [];

// Чтение данных из файла при запуске сервера
fs.readFile(dataPath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  try {
    // Парсинг JSON-данных
    products = JSON.parse(data);
    if (!Array.isArray(products)) {
      throw new Error('Data is not an array');
    }
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
});

// Функция для сохранения данных о продуктах в файл
const saveProducts = () => {
  fs.writeFile(dataPath, JSON.stringify(products, null, 2), 'utf8', err => {
    if (err) {
      console.error(err);
    }
  });
};

// Обработчик GET-запроса на получение списка продуктов
app.get('/products', (req, res) => {
  res.json(products);
});

// Обработчик GET-запроса на получение информации о конкретном продукте
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(product => product.id === productId);

  if (!product) {
    res.status(404).send('Product not found');
  } else {
    res.json(product);
  }
});

// Обработчик POST-запроса на добавление нового продукта
app.post('/products', (req, res) => {
  const { name, description, price } = req.body;
  const newProduct = {
    id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
    name,
    description,
    price
  };
  products.push(newProduct);
  saveProducts();
  res.status(201).json(newProduct);
});

// Обработчик PUT-запроса на обновление информации о продукте
app.put('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const { name, description, price } = req.body;
  const productIndex = products.findIndex(product => product.id === productId);

  if (productIndex === -1) {
    res.status(404).send('Product not found');
  } else {
    products[productIndex] = { ...products[productIndex], name, description, price };
    saveProducts();
    res.json(products[productIndex]);
  }
});

// Обработчик DELETE-запроса на удаление продукта
app.delete('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  products = products.filter(product => product.id !== productId);
  saveProducts();
  res.send('Product deleted successfully');
});

// Запуск сервера на указанном порту
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
