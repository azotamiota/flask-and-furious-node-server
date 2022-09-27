const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    console.log('Welcome to Flask & Furious second server');
    res.json({message: 'Welcome to Flask & Furious second server'})
})

app.post('/code', (req, res) => {
    const moduleToExport = req.body['code-package']['snippet']['import']
    console.log('moduleToExport: ', moduleToExport);
  
    console.log('snippet path: ', path.resolve('./snippet.js'))
    const return1 = eval(`${req.body['code-package']['snippet']['body']}\n\n
    ${req.body['code-package']['snippet']['to-execute-1']}`)
    const return2 = eval(`${req.body['code-package']['snippet']['body']}\n\n
    ${req.body['code-package']['snippet']['to-execute-2']}`)
    console.log('return: ', return1, return2)
    res.send([return1, return2])

})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server listening on port ${port}...`)
})
