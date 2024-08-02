import express from 'express'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()
const app = express()
const JWT_SECRET = process.env.JWT_SECRET

app.post('/cadastro', async (req,res) => {
    try{
    const user = req.body
    const crypt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash( user.password, crypt )
    const userDB = await prisma.user.create({
        data: {
            name: user.name,
            email: user.email,
            password: hashPassword
        }
    })
    res.status(201).json(userDB)

    } catch(error) {
        res.status(500).json({message: 'ERRO NO SERVIDOR, TENTE NOVAMENTE'})
    }
})



app.post('/login', async (req,res) => {
    const userInfo = req.body
    const userMyDB = await prisma.user.findUnique({
        where: {
            email: userInfo.email
        }
    })

    if(!userMyDB) {
        return res.status(400).json({message: 'USUÁRIO NÃO ENCONTRADO'})
    }

    const passwordMatch = await bcrypt.compare(userInfo.password, userMyDB.password)

    if(!passwordMatch) {
        return res.status(404).json({message: 'SENHA INSERIDA ESTÁ INCORRETA'})
    }

    const token = jwt.sign({ id: userMyDB.id }, JWT_SECRET, {expiresIn: '7d'})

    res.status(201).json(token)
})

export default app


