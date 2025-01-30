import { Mongo } from "../database/mongo.js" //modulo do mongo salva o ID no data base
import { ObjectId } from 'mongodb' //fazer requisição, devido a forma que o mongo salva o ID no data base

const collectionName = 'plates'

export default class PlatesDataAccess {
    async getPlates() {
        const result = await Mongo.db
            .collection(collectionName)
            .find({})
            .toArray()

        return result
    }

    async getAvailablesPlates() { //pega apenas os pratos disponiveis
        const result = await Mongo.db
            .collection(collectionName)
            .find({ availables: true })
            .toArray()

        return result
    }

    async addPlate(plateData) { //criando o prato
        const result = await Mongo.db
            .collection(collectionName)
            .insertOne(plateData)

        return result
    }

    async deletePlate(plateId) {
        const result = await Mongo.db
            .collection(collectionName)
            .findOneAndDelete({ _id: new ObjectId(plateId) })

        return result
    }

    async updatePlate(plateId, plateData) {

        const result = await Mongo.db
            .collection(collectionName)
            .findOneAndUpdate(
                { _id: new ObjectId(plateId) },
                { $set: plateData }
            )
        return result
    }

}