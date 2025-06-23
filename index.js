const express = require('express');
const app = express();
const path = require('path');
const Chat = require('./models/chat');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

const mongoose = require('mongoose');
main()
    .then(() => {
        console.log('Connected to DATABASE')
    })
    .catch((err) => {
        console.log(err)
    });

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

const port  = 8080;
app.listen(port, () => {
    console.log(`Server is running on port -> ${port}`);
});

app.get('/', (req,res) => {
    console.log('Received a request');
    res.send('working');
});

app.get('/chats', async (req,res)=>{
    let chats = await Chat.find();
    console.log(chats);
    res.render('index.ejs',{chats})
})

