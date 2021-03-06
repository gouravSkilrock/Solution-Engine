const mongoose = require('mongoose');

// Define a schema
const { Schema } = mongoose;

const AnswerSchema = new Schema(
    {
        solution:{ type: String, required: [true, 'Solution required'] },
        beforeAnsDesc:{ type: String},       
        afterAnsDesc:{ type: String},
        upvote:{ type: Number},
        like:{ type: Number},
        comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
        userInfo:{ type: Schema.Types.ObjectId, ref: 'UserInfo'}
    },
    {
        strict: false,
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    }
);
module.exports = mongoose.model('Answer', AnswerSchema);