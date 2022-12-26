import express from 'express'
import cors from 'cors'
import { loadEmployees } from './empScrapper.js'
import employeesRoutes from './routes/employees.routes.js'
import indexRoutes from './routes/index.routes.js'

// Ejecución de Express
const app = express()

// Para la correcta interpretación de los mensajes en formato JSON
app.use(express.json())

// Para permitir peticiones desde otros dominios
app.use(cors())

// Ejecución de la carga de datos
loadEmployees()

app.use(indexRoutes)
app.use('/api', employeesRoutes)

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint not found'
    })
})

export default app