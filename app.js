const express = require('express')
const app = express()

const products = [
    { id: 1, title: 'product1', salary: 200, description: 'it is product 1' },
    { id: 2, title: 'product2', salary: 400, description: 'it is product 2' },
    { id: 3, title: 'product3', salary: 600, description: 'it is product 3' }
]; 
// Тестовые значения продуктов

app.get('/', (req, res) => {
    res.send('Hello world')
});
// Тестовый запуск

app.get('/api/products', (req, res) =>{
    res.send(products);
});
// Получение списка всех продуктов

app.get('/api/products/:id', (req, res) => {
    const product = products.find(elem => elem.id === parseInt(req.params.id));
    if (!product) res.status(404).send('Продукт с таким ID не найден')// 404
    res.send(product);
})
// Получение одного продукта по ID

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on the port ${port}...`));
