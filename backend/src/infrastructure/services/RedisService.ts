import Redis from 'ioredis'
import { environment } from '../../config/environment'


const redis=new Redis({
    host:environment.redishost,
    port:Number(environment.redisport),
})

export default redis;