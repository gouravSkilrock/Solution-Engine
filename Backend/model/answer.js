const mongoose = require('mongoose');

// Define a schema
const { Schema } = mongoose;

const AnswerSchema = new Schema(
    {
        solution:{ type: String, required: [true, 'question required'] },
        beforeAnsDesc:{ type: String},       
        afterAnsDesc:{ type: String},
        upvote:{ type: Number},
        comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
    },
    {
        strict: false,
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    }
);
module.exports = mongoose.model('Answer', AnswerSchema);