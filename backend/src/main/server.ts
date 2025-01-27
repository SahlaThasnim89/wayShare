import { Patch } from './../../node_modules/immer/src/types/types-external';
import express from 'express'
import { environment } from '../config/environment'
import { notFound,errorHandler } from '../infrastructure/http/middlewares/errorMiddleware'
import connectDB from '../config/database'
import userRoutes from '../infrastructure/http/routes/userRoutes';
import morgan from "morgan";
import cors from "cors"
import { trusted } from 'mongoose';

const app=express()
connectDB();
const port=environment.port

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan("dev"));
// app.use(cors({
//   origin:"*",
//   methods:["GET","POST","PUT","DELETE","PATCH"],
//   credentials:true
// }))
app.get('/ggg',(req,res)=>{
    res.send('tyu')
})
app.use('/api',userRoutes);

app.use(notFound)
app.use(errorHandler)

app.listen(3000, (err) => {
    if (err) {
      console.error('Failed to start server:', err);
    } else {
      console.log(`Server started on port ${3000}`);
    }
  });
