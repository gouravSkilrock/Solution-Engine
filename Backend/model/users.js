const mongoose = require('mongoose');

// Define a schema
const { Schema } = mongoose;

const Users = new Schema(
    {
        username:{ type: String },
        designation:{ type: String},
        name:{ type: String}
    },
    {
        strict: false,
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    }
);
module.exports = mongoose.model('Users', Users);