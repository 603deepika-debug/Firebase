const express=require('express');
const bodyParser=require('body-parser');
const methodOverride=require('method-override');     
const path=require('path');
const dotenv=require('dotenv');
dotenv.config();
const compression=require('compression');
const app=express();

app.use(compression());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

const userRoutes= require('./routes/userRoutes');
app.use('/',userRoutes);
const PORT=process.env.PORT || 3000;
const server= app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});

process.on('inhandledRejection',err =>{
    console.log('UNHANDLED REJECTION! Shutting down...');
    console.log(err.name, err.message);
    server.close(()=>{
        process.exit(1);
    });
});

process.on('SIGTERM',()=>{
    console.log('SIGTERM RECEIVED. Shutting down gracefully');
    server.close(()=>{
        console.log('Process terminated!');
    });
});