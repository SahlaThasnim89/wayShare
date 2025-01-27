import express from 'express'
import { environment } from '../config/environment'
import { notFound,errorHandler } from '../infrastructure/http/middlewares/errorMiddleware'
import connectDB from '../config/database'
import userRoutes from '../infrastructure/http/routes/userRoutes'

const app=express()
connectDB();
const port=environment.port

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.send('tyu')
})

app.use(notFound)
app.use(errorHandler)
app.use('/api',userRoutes)

app.listen(port, (err) => {
    if (err) {
      console.error('Failed to start server:', err);
    } else {
      console.log(`Server started on port ${port}`);
    }
  });

