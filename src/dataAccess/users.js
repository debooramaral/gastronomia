import { Mongo } from "../database/mongo.js" //modulo do mongo salva o ID no data base
import { ObjectId } from 'mongodb' //fazer requisição, devido a forma que o mongo salva o ID no data base
import crypto from 'crypto' //se o usuario mandar requisição de alterar a password/senha

const collectionName = 'users'

export default class UsersDataAccess {
    async getUsers() {
        const result = await Mongo.db
            .collection(collectionName)
            .find({})
            .toArray()

        return result
    }

    async deleteUser(userId) {
        const result = await Mongo.db
            .collection(collectionName)
            .findOneAndDelete({ _id: new ObjectId(userId) })

        return result
    }

    async updateUser(userId, userData) {
        if (userData.password) {
            const salt = crypto.randomBytes(16)

            crypto.pbkdf2(userData.password, salt, 310000, 16, 'sha256', async (error, hashedPassword) => {
                if (error) {
                    throw new Error('Error durante a hash da senha')
                }

                userData = { ...userData, password: hashedPassword, salt }

                const result = await Mongo.db
                    .collection(collectionName)
                    .findOneAndUpdate(
                        { _id: new ObjectId(userId) },
                        { $set: userData }
                    )
                return result
            })
        } else {
            const result = await Mongo.db
                .collection(collectionName)
                .findOneAndUpdate(
                    { _id: new ObjectId(userId) },
                    { $set: userData }
                )
            return result
        }

    }
}