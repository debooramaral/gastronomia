import express from 'express'
import cors from 'cors'
import { mongoInstance } from './database/mongo.js'
import { config } from 'dotenv'
import authRouter from './auth/auth.js'
import usersRouter from './routes/users.js'
import platesRouter from './routes/plates.js'
import ordersRouter from './routes/orders.js'

config() // Já inicia pegando as configurações de dotenv

async function main() { 
    //Porta
    const hostname = 'localhost'
    const port = 3000

    //Criação de aplicação
    const app = express()

    //Conexão com o MongoDB antes de carregar as rotas - ChatGPT: chamamos await mongoInstance.connect() antes de carregar as rotas.
    await mongoInstance.connect({
        mongoConnectionString: process.env.MONGO_CS,
        mongoDbName: process.env.MONGO_DB_NAME
    })

    //Funcionalidades da aplicação
    app.use(express.json()) // arruma a resposta do servidor
    app.use(cors()) //evita interferencia ao rodar o app em local, mesma maquina

    //Rota Principal
    app.get('/', (req, res) => {
        res.send({
            sucess: true,
            statusCode: 200,
            body: 'Bem vindo ao Gastronomia'
        })
    })

    //Rotas Protegidas
    app.use('/auth', authRouter)
    app.use('/users', usersRouter)
    app.use('/plates', platesRouter)
    app.use('/orders', ordersRouter)

    //Rodar a aplicação
    app.listen(port, () => {
        console.log(`Servidor funcionando em http://${hostname}:${port}`)
    })

}

main()