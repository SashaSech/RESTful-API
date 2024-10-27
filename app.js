const Joi = require('joi')
const express = require('express')
const app = express()

app.use(express.json());

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
    if (!product) return res.status(404).send('Продукт с таким ID не найден')// 404
    res.send(product);
})
// Получение одного продукта по ID

app.post('/api/products', (req, res) => {
    const { error } = validateProduct(req.body); // result.error
    if (error) return res.status(400).send(error.details[0].message);
    const product = {
        id: products.length + 1,
        title: req.body.title,
        salary: req.body.salary,
        description: req.body.description
    };
    products.push(product);
    res.send(product);
});

// Добавление продукта в список продуктов по свойствам объекта

app.put('/api/products/:id', (req, res) => {
    const product = products.find(elem => elem.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Продукт с таким ID не найден')// 404

    const { error } = validateProduct(req.body); // result.error
    if (error) return res.status(400).send(error.details[0].message);
    

    product.title = req.body.title;
    product.salary = req.body.salary;
    product.description = req.body.description;

    res.send(product)
});

// Изменение продукта по ID

app.delete('/api/products/:id' , (req, res) =>
{
    const product = products.find(elem => elem.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Продукт с таким ID не найден')// 404

    const index = products.indexOf(product);
    products.splice(index, 1);

    res.send(product);
});

function validateProduct(product) {
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        salary: Joi.number().min(0).required(),
        description: Joi.string().min(3).required()
    });

   return schema.validate(product);
}

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on the port ${port}...`));
