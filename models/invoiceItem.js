const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceItemSchema = new Schema({
    item: String,
    currency: String,
    description: String,
    amount: Number,
    invoiceId: String
});

module.exports = mongoose.model('InvoiceItem', invoiceItemSchema);