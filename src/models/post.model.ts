
import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({

    image: {
        type: String
    },

    title: {
        type: String,
        required: true 
    },

    content: {
        type: String,
        required: 'enter the content of your comment'
    },

    comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],

    created_date:
    {
        type: Date, default: Date.now
    }
},
    { timestamps: true }
)
module.exports = mongoose.model('Post', schema)