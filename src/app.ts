import 'dotenv/config'
import express from 'express'
import router from './routes'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'

const swaggerDocument = YAML.load('./docs/api-spec.yaml')

const app = express()

app.use(`${process.env.API_VERSION}/repo/stats`, router)
app.use(`${process.env.API_VERSION}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`)
})
