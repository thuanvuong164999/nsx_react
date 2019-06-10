const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');

app.use(cors())

app.get('/api/hello',cors(), (req, res) => {
    res.send({
        members: 
        // {
        //     name:'thuan'
        // }
        [            
            {
                name:'Thuan',
                class:'PQ-Web-d002'
            },
            {
                name:'Son',
                class:'PQ-Web-d002'
            },
            {
                name:'Mai',
                class:'PQ-Web-d002'
            },
            {
                name:'An',
                class:'PQ-Web-d002'
            }
        ]  
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))