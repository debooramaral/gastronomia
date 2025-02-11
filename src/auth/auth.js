import express from 'express'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import crypto from 'crypto'
import { mongoInstance } from '../database/mongo.js'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'

const collectionName = 'users' //Coleção usada no SGBD

//Controle de Usuário e decriptação - ChatGPT:  acessamos mongoInstance.db corretamente.
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, callback) => {
    const user = await mongoInstance.db
        .collection(collectionName)
        .findOne({ email: email })

    if (!user) {
        return callback(null, false)
    }

    const saltBuffer = user.salt.buffer

    crypto.pbkdf2(password, saltBuffer, 310000, 16, 'sha256', (error, hashedPassword) => {
        if (error) {
            return callback(null, false)
        }

        const userPasswordBuffer = Buffer.from(user.password.buffer)

        if (!crypto.timingSafeEqual(userPasswordBuffer, hashedPassword)) {
            return callback(null, false)
        }

        const { password, salt, ...rest } = user

        return callback(null, rest)
    })
}))

const authRouter = express.Router() //Rota de Usuário

//Registrando Usuário
authRouter.post('/signup', async (req, res) => {
    const checkUser = await Mongo.db
        .collection(collectionName)
        .findOne({ email: req.body.email })

    if (checkUser) {
        return res.status(500).send({
            sucess: false,
            statusCode: 500,
            body: {
                text: 'Usuário já existe'
            }
        })
    }

    const salt = crypto.randomBytes(16)

    crypto.pbkdf2(req.body.password, salt, 310000, 16, 'sha256', async (error, hashedPassword) => {
        if (error) {
            return res.status(500).send({
                sucess: false,
                statusCode: 500,
                body: {
                    text: 'Erro na crypto da senha',
                    error: error
                }
            })
        }

        const result = await Mongo.db
            .collection(collectionName)
            .insertOne({
                email: req.body.email,
                password: hashedPassword,
                salt
            })

        if (result.insertedId) {
            const user = await Mongo.db
                .collection(collectionName)
                .findOne({ _id: new ObjectId(result.insertedId) })

            const token = jwt.sign(user, 'secret')

            return res.send({
                sucess: true,
                statusCode: 200,
                body: {
                    text: 'Usuário registrado corretamente',
                    token,
                    user,
                    logged: true
                }
            })
        }
    })
})

//Login e Controle de AUTENTICAÇÃO de Usuário
authRouter.post('/login', (req, res) => {
    passport.authenticate('local', (error, user) => {
        if (error) {
            return res.status(500).send({
                sucess: false,
                statusCode: 500,
                body: {
                    text: 'Error durante a autenticação',
                    error
                }
            })
        }

        if (!user) { //Se não existir o usuário, caso tente fazer login sem cadastrar
            return res.status(400).send({
                sucess: false,
                statusCode: 400,
                body: {
                    text: 'As credenciais não estão corretas'
                }
            })
        }

        //Caso contrario cria-se o token, para autenticar este usuário e se não tiver cadastro, informa erro de token invalido
        const token = jwt.sign(user, 'secret')
        return res.status(200).send({
            sucess: true,
            statusCode: 200,
            body: {
                text: 'Usuário fez login corretamente',
                user,
                token
            }
        })
    })(req, res)
})

export default authRouter