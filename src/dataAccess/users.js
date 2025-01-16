import { Mongo } from "../database/mongo.js" //modulo do mongolva o ID no daa base
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

    async deleteUser() { }

    async updateUser() { }
}