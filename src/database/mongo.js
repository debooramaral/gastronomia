import { MongoClient } from "mongodb"

//ChatGPT: criamos uma classe Mongo e exportamos uma única instância mongoInstance.
class Mongo {
    constructor() { //Dois elementos que a conexão terá que trazer, nesta função
        this.client = null
        this.db = null
    }
}

    // Método para conectar ao MongoDB
    async connect({ mongoConnectionString, mongoDbName }) {
    try {
        this.client = new MongoClient(mongoConnectionString) // Cria o cliente
        await this.client.connect() // Conexão do cliente
        console.log("Conectado ao Mongo!")

        this.db = this.client.db(mongoDbName) // Define o banco de dados
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB:", error)
        throw error
    }
}
}

// Criamos e exportamos uma única instância da classe
const mongoInstance = new Mongo();
