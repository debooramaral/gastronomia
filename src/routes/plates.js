import express from 'express'
import PlatesControllers from '../controllers/plates.js'

const platesRouter = express.Router()

const platesControllers = new PlatesControllers()

platesRouter.get('/', async (req, res) => {
    const { sucess, statusCode, body } = await platesControllers.getPlates()

    res.status(statusCode).send({ sucess, statusCode, body })
})

platesRouter.get('/availables', async (req, res) => {
    const { sucess, statusCode, body } = await platesControllers.getAvailablesPlates()

    res.status(statusCode).send({ sucess, statusCode, body })
})

platesRouter.post('/', async (req, res) => {
    const { sucess, statusCode, body } = await platesControllers.addPlate(req.body)

    res.status(statusCode).send({ sucess, statusCode, body })
})

platesRouter.delete('/:id', async (req, res) => {
    const { sucess, statusCode, body } = await platesControllers.deletePlate(req.params.id)

    res.status(statusCode).send({ sucess, statusCode, body })
})

platesRouter.put('/:id', async (req, res) => {
    const { sucess, statusCode, body } = await platesControllers.updatePlate(req.params.id, req.body)

    res.status(statusCode).send({ sucess, statusCode, body })
})

export default platesRouter