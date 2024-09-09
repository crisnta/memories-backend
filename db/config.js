import mongoose from "mongoose"

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('DB Connect')

    } catch (error) {
        console.log(error)
        throw new Error('Error a la hora de inicializar Base de Datos')
    }
} 

export default dbConnection