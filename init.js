const mongoose = require('mongoose');
const Chat = require('./models/chat');

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

let allChats = [
    {
        from: 'Bob',
        to: 'Alice',
        msg: 'I’m doing great! Just been a bit busy with work lately.',
        created_at: new Date()
    },
    {
        from: 'Alice',
        to: 'Bob',
        msg: 'Totally get that. Same here, but trying to balance things out.',
        created_at: new Date()
    },
    {
        from: 'Bob',
        to: 'Alice',
        msg: 'Glad to hear that! Did you finish that project you were working on?',
        created_at: new Date()
    },
    {
        from: 'Alice',
        to: 'Bob',
        msg: 'Yes, finally wrapped it up last week! Feels like a huge relief 😅',
        created_at: new Date()
    },
    {
        from: 'Bob',
        to: 'Alice',
        msg: 'That’s awesome! We should catch up sometime soon. Coffee maybe?',
        created_at: new Date()
    },
    {
        from: 'Alice',
        to: 'Bob',
        msg: 'I’d love that! Let’s plan for the weekend?',
        created_at: new Date()
    },
    {
        from: 'Bob',
        to: 'Alice',
        msg: 'Sounds perfect. Saturday afternoon work for you?',
        created_at: new Date()
    },
    {
        from: 'Alice',
        to: 'Bob',
        msg: 'Absolutely! Let’s meet at that café near the park. 3 PM?',
        created_at: new Date()
    },
    {
        from: 'Bob',
        to: 'Alice',
        msg: 'Done! Looking forward to it 😊',
        created_at: new Date()
    }
];

Chat.insertMany(allChats)
    .then(() => {
        console.log('Chats inserted successfully');
    })
    .catch((err) => {
        console.error('Error inserting chats:', err);
    });
