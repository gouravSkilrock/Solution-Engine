const mongoose = require('mongoose');

// Define a schema
const { Schema } = mongoose;

const UserInfo = new Schema(
    {
        username:{ type: String },
        designation:{ type: String},
        post:{ type: String}
    },
    {
        strict: false,
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    }
);
module.exports = mongoose.model('UserInfo', UserInfo);