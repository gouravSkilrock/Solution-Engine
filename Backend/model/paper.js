const mongoose = require('mongoose');

// Define a schema
const { Schema } = mongoose;

const PaperSchema = new Schema(
{
    question:{ type: String, required: [true, 'question required']},
    afterDesc:{ type: String},
    beforeDesc:{ type: String},
    viewed:{ type: Number},
    answer: [{ type: Schema.Types.ObjectId, ref: 'Answer'}],
},
{
 strict: false,
 timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
}
);

module.exports = mongoose.model('Paper', PaperSchema);