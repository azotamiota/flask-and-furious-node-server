const fs = require('fs')
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    console.log('Welcome to Flask & Furious second server');
    res.json({message: 'Welcome to Flask & Furious second server'})
})

app.post('/code', (req, res) => {
    console.log('req.body: ', req.body);
    // console.log('snippet: ', typeof snippet.add);
    const moduleToExport = req.body['code-package']['snippet']['import']
    console.log('moduleToExport: ', moduleToExport);
    fs.writeFileSync('snippet.js', `${req.body['code-package']['snippet']['body']}\n\nmodule.exports = {${moduleToExport}}`, (err, data) => {
            if (err) throw err;
            // console.log(eval('snippet.multiply(2,3)'))
        }
    )
    const snippet = require('./snippet')
    const return1 = (eval(`snippet.${req.body['code-package']['snippet']['to-execute-1']}`))
    const return2 = (eval(`snippet.${req.body['code-package']['snippet']['to-execute-2']}`))
    res.send([return1, return2])

})

app.listen(3000, () => {
    console.log('Server listening on port 3000...')
})
