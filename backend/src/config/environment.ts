import dotenv from 'dotenv'

dotenv.config()

export const environment={
    port:process.env.PORT||5000,
    database:process.env.MONGO_URI as string,
    jwtSecret:process.env.JWT_SECRET||'secret'
}