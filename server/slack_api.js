const { RTMClient, WebClient } = require('@slack/client');
const mongoose = require('mongoose');
const conversation_model = require('./models/conversationModel');

const token = 'xoxb-154966377728-379472016500-tmzYflE4ynkTMQikM8eP8BYg'

if (!token) { console.log('You must specify a token to use this example'); process.exitCode = 1; return; }

// Initialize an RTM API client
const rtm = new RTMClient(token);

// Start the connection to the platform
rtm.start();


setInterval(() => {
    conversation_model.find({})
        .then(conversations => {
            let d = new Date();            
            
            if(conversations.time >= d.getHours() && conversations.question.sent == false)
            {
                Send(conversations.participants, conversations.question)
            }
        }).catch(err => {
            res.send(err);
        });
}, 60000);

const Send = (participants, question) => {

    const update_resp = (content) => {
        console.log(content, "inserted");
    }

    // loop users
    model.participants.forEach(user => {
        rtm.sendMessage(question, user)
            .then(res => {
                // console.log(res)
            })
    })

    // catch message
    rtm.on('message', (event) => {
        model.participants.forEach(user => {
            if (user == event.channel) update_resp(event.text);
        });
    });

}