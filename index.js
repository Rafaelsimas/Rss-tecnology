const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')
const Contract = require('./models/Contract')
const app = express()
const port = 3333

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.static('images'));
app.use(express.static('public'))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/contract/create', (req, res) => {
    res.render('addcontract')
})

app.post('/contract/create', async (req, res) => {
    const name = req.body.name
    const contractstart = req.body.contractstart
    const descriptionservice = req.body.descriptionservice

    await Contract.create({name, contractstart, descriptionservice})
    res.redirect('/contracts')
})

app.get('/contracts', async (req, res) => {
    const contracts = await Contract.findAll({raw: true})

    res.render('contracts', {contracts: contracts})
})

app.post('/contracts/delete/:id', async (req, res) => {
    const id = req.params.id
    await Contract.destroy({where: {id: id}})
    res.render('contracts')
})

app.get('/contracts/edit/:id', async (req, res) => {
    const id = req.params.id
    const contract = await Contract.findOne({raw: true, where: {id: id}})
    res.render('contractedit', {contract})
})

app.post('/contracts/update', async (req, res) => {
    const id = req.body.id
    const name = req.body.name
    const contractstart = req.body.contractstart
    const descriptionservice = req.body.descriptionservice

    const contractData = {
        id,
        name,
        contractstart,
        descriptionservice
    }

    await Contract.update(contractData, {where: {id: id}})
    res.redirect('/')
})


app.get('/', (req, res) => {
    res.render('home')
})

conn.sync()
.then(() => {

    app.listen(port, () => {
        console.log(`Server running with success in port ${port}`);
    })
})
.catch((err) => {
    console.log(err);
})

