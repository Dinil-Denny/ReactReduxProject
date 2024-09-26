//----------------entry point for our backend or server----------------------//

import express from 'express';
const port = 5000;

const app = express();

app.get('/',(req,res)=>res.send('Server is ready'))

app.listen(port,()=>{console.log(`server started at ${port}`)});
