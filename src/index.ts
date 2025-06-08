// src/server.ts
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { createConnection } from 'typeorm'
import { routes } from './route'
import dotenv from 'dotenv'
import { Employee } from './entities/employee.entity'
import { Attendance } from './entities/attendance.entity'
import { Payroll } from './entities/payroll.entity'
import { Salary } from './entities/salary.entity'

dotenv.config()

const app = express()

app.use(cors({ origin: true, credentials: true }))
app.use(cookieParser())
app.use(bodyParser.json())

createConnection({
  type: 'mysql',
  host: process.env.DBHOST || 'localhost',
  port: Number(process.env.DBPORT) || 3306,
  username: process.env.DBUSER || 'root',
  password: '',
  database: process.env.DBNAME || 'employee-data',
  entities: [Employee,Attendance,Payroll,Salary],
  synchronize: true,
  logging: false,
})
  .then(() => {
    console.log('DB Connected')

    app.use(routes)

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`)
    })
  })
  .catch((err) => {
    console.error('Database connection failed:', err)
  })
