import PlatesDataAccess from '../dataAccess/plates.js'
import { ok, serverError } from '../helpers/httpResponse.js'

export default class PlatesControllers {
    constructor() {
        this.dataAccess = new PlatesDataAccess()
    }

    async getPlates() {
        try {
            const plates = await this.dataAccess.getPlates()

            return ok(plates)

        } catch {
            return serverError(error)
        }
    }

    async getAvailablesPlates() {
        try {
            const plates = await this.dataAccess.getAvailablesPlates()

            return ok(plates)

        } catch {
            return serverError(error)
        }
    }

    async addPlate(plateData) {
        try {
            const plates = await this.dataAccess.addPlate(plateData)

            return ok(plates)

        } catch {
            return serverError(error)
        }
    }

    async deletePlate(plateId) {
        try {
            const result = await this.dataAccess.deletePlate(plateId)

            return ok(result)

        } catch {
            return serverError(error)
        }
    }

    async updatePlate(plateId, plateData) {
        try {
            const result = await this.dataAccess.updatePlate(plateId, plateData)

            return ok(result)

        } catch {
            return serverError(error)
        }
    }
}