import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js";

export const sendMessage = async (req , res)=>{
   try {
    const { message } = req.body;
    const {id:receverId} = req.params;
    const senderId = req.user._id;

   let conversation = await Conversation.findOne({
       participants:{$all:[senderId,receverId]},
    })

    if(!conversation){
        conversation = await Conversation.create({
            participants:[senderId,receverId]
        })
    }

    const newMessage = new Message({
        senderId,
        receverId,
        message,
    });

    if(newMessage){
        conversation.messages.push(newMessage._id)
    }
     //this will run one after other
    // await conversation.save();
    // await newMessage.save();

    //this will run parallely
    await Promise.all([conversation.save(),newMessage.save()])

    res.status(201).json(newMessage)

   }
   catch(error){
    console.log("error is in sendMessage controller :",error.message)
    res.status(500).json({error:"internal server error"})

   }
};