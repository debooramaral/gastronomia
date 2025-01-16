import { text } from "express"
import { MongoClient } from "mongodb"
import connect from "passport/lib/framework/connect.js"

export const Mongo = {
    async connect({ mongoConnectionString, mongoDbName }) {
        try {
            const client = new MongoClient(mongoConnectionString) //create client
            
            await client.connect() //conexão do client

            const db = client.db(mongoDbName) //Indicando qual é o database

            //Dois elementos que a conexão terá que trazer, nesta função
            this.client = client
            this.db = db

            return 'Conectado ao Mongo !'

        } catch (error) {
            return { text: 'Error durante a conexão com mongo', error }
        }
    }
}