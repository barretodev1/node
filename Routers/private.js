import express from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const app = express.Router()

app.get('/listar', async (req, res) => {
    try{
    const myDB = await prisma.user.findMany()
    res.status(200).json(myDB)
    } catch(error) {
        return res.status(500).json({message: 'ERRO NO SERVIDOR TENTE NOVAMENTE'})
    }
})


export default app