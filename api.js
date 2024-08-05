import express from 'express'
import meuApp from './Routers/public.js'
import meuApp2 from './Routers/private.js'
import auth1 from './Middlewares/auth.js'
import cors from 'cors'
const app = express()
app.use(cors())
app.use(express.json())
app.use(meuApp)
app.use(auth1, meuApp2)


app.listen(3000, () => console.log('SUA API ESTÁ RODANDO'))