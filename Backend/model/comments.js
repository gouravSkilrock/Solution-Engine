const mongoose = require('mongoose');

// Define a schema
const { Schema } = mongoose;

const CommentSchema = new Schema(
    {
        title:{ type: String },
        liked:{ type: Number},
        userCommentInfo:{ type: Schema.Types.ObjectId, ref: 'UserInfo'}
    },
    {
        strict: false,
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    }
);
module.exports = mongoose.model('Comment', CommentSchema);