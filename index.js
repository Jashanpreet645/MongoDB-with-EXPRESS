const express = require('express');
const app = express();
const path = require('path');
const Chat = require('./models/chat');
const methodOverride = require('method-override');
const ExpressError = require('./ExpressError');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // For PUT and DELETE requests

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
    res.render('homepage.ejs');
});
[]
app.get('/chats', async (req,res)=>{
    try{
    let chats = await Chat.find();
    console.log(chats);
    res.render('chatpage.ejs',{chats})
    }
    catch(err){
        next(err);
    }
})

app.get(('/chats/new'), (req,res)=>{
    res.render('newchat.ejs');
})

app.post('/chats', (req,res)=>{
    let {from,to,msg} = req.body;
    let newchat = new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at: new Date()
    })
    newchat.save()
        .then(() => {
            console.log('Chat saved successfully');
            res.redirect('/chats');
        })
        .catch((err) => {
            console.error('Error saving chat:', err);
            res.status(500).send('Internal Server Error');
        });
})

app.get('/chats/:id/edit', (req,res)=>{
    let {id} = req.params;
    console.log('Editing chat with ID:', id);
    let chat = Chat.findById(id)
        .then((chat) => {
            if (!chat) {
                return res.status(404).send('Chat not found');
            }
            res.render('editpage.ejs', {chat});
        })
        .catch((err) => {
            console.error('Error fetching chat:', err);
            res.status(500).send('Internal Server Error');
        });
})

app.put('/chats/:id', (req,res)=>{
    let {id} = req.params;
    let {from,to,msg} = req.body
    Chat.findByIdAndUpdate(id, {from, to, msg}, {new: true})
        .then(() => {
            console.log('Chat updated successfully');
            res.redirect('/chats');
        })
        .catch((err) => {
            console.error('Error updating chat:', err);
            res.status(500).send('Internal Server Error');
        });
})

app.delete('/chats/:id', (req,res)=>{
    let {id} = req.params;
    Chat.findByIdAndDelete(id)
        .then(() => {
            console.log('Chat deleted successfully');
            res.redirect('/chats');
        })
        .catch((err) => {
            console.error('Error deleting chat:', err);
            res.status(500).send('Internal Server Error');
        });
})

app.use((err, req, res, next) => {
    let {statusCode = 500, message = 'Something went wrong!'} = err;
    res.status(status).send(`<h1>${statusCode} - ${message}</h1>`); 
});
