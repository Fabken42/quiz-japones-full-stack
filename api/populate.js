require('dotenv').config()

const connectDB = require('./db/connect')
const Pergunta = require('./models/Pergunta')

const jsonPerguntas = require('./perguntas.json')

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    await Pergunta.deleteMany()
    await Pergunta.create(jsonPerguntas)
    console.log('Sucesso!')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()