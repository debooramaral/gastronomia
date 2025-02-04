import { Mongo } from "../database/mongo.js" //modulo do mongo salva o ID no data base
import { ObjectId } from 'mongodb' //fazer requisição, devido a forma que o mongo salva o ID no data base
import { serverError } from "../helpers/httpResponse.js"

const collectionName = 'orders'

export default class OrdersDataAccess {
    async getOrders() { //com AGGREGATE
        try {
            const result = await Mongo.db
                .collection(collectionName)
                .aggregate([
                    {
                        $lookup: { //olhe para
                            from: 'orderItems', //pra onde vai olhar
                            localField: '_id', //campo ID como referencia
                            foreignField: 'orderId', //campo estrangeiro
                            as: 'orderItems' //como vou chama-lo 
                        }
                    },
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'userId',
                            foreignField: '_id',
                            as: 'userDetails'
                        }
                    },
                    {
                        $project: { //Não passar os dados sensiveis de usuário (password e salt)
                            'userDetails.password': 0,
                            'userDetails.salt': 0,
                        }
                    },
                    { //Qual campo eu quero olhar a partir de agora 
                        $unwind: '$orderItems'
                    },
                    {
                        $lookup: { //Informações dos pratos
                            from: 'plates',
                            localField: 'orderItems.plateId', //prato definido na hora de criar a ordem, inserido
                            foreignField: '_id', //de pratos
                            as: 'orderItems.itemDetails' //nome dado a nossa nova tabela, no frontend/cliente
                        }
                    },

                ])
                .toArray()

            return result
        } catch (error) {
            return serverError(error)
        }
    }

    async addOrder(orderData) { //criando uma ordem
        //a ordem(comanda) e os itens da comanda, são duas collections
        const { items, ...orderDataRest } = orderData //desconstruido

        //quando foi criada
        orderDataRest.createdAt = new Date()
        //status da ordem: pendente, retirado, completo
        orderDataRest.pickupStatus = 'Pendente'
        //usuário referido a ordem
        orderDataRest.userId = new ObjectId(orderDataRest.userId) //Vem como string e vamos transformar em objeto ID

        //Inserir essa nova ordem
        const newOrder = await Mongo.db
            .collection(collectionName)
            .insertOne(orderDataRest)

        //em resposta ao mongo, que faz a inserção em novo ID, fazemos o controle se foi realmente inserido
        if (!newOrder.insertedId) {
            throw new Error('Ordem não foi inserida')
        }

        //Converter alguns campos dos itens na ordem, manipular, são eles: Id do prato, quantidade
        items.map((item) => {
            item.plateId = new ObjectId(item.plateId)
            item.orderId = new ObjectId(newOrder.insertedId) //Qual comanda os itens se referem
        })

        //como resultado fazemos uma coleção de itens da ordem, bem como os items podendo ser mais de um "many"
        const result = await Mongo.db
            .collection('orderItems')
            .insertMany(items)

        return result
    }

    async deleteOrder(orderId) {
        const result = await Mongo.db
            .collection(collectionName)
            .findOneAndDelete({ _id: new ObjectId(orderId) })

        return result
    }

    async updateOrder(orderId, orderData) {

        const result = await Mongo.db
            .collection(collectionName)
            .findOneAndUpdate(
                { _id: new ObjectId(orderId) },
                { $set: orderData }
            )
        return result
    }

}