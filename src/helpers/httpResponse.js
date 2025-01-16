export const ok = (body) => { 
    return {
        sucess: true,
        statusCode: 200,
        body
    }
}

export const notFound = () => {
    return {
        sucess: false,
        statusCode: 400,
        body: 'Não Encontrado'
    }
 }

export const serverError = (error) => {
    return{
        sucess: false,
        statusCode: 400,
        body: error
    }
 }