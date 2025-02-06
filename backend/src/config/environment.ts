import dotenv from 'dotenv'

dotenv.config()

export const environment={
    port:process.env.PORT||5000,
    database:process.env.MONGO_URI as string,
    jwtSecret:process.env.JWT_SECRET||'secret',
    redisport:process.env.REDIS_PORT || 6379,
    redishost: process.env.REDIS_HOST || "127.0.0.1",
    userEmail:process.env.EMAIL_USER,
    userPassword:process.env.EMAIL_PASS,
    nodeEnv:process.env.NODE_ENV,
    clientId:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET
}