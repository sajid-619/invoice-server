const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
    amount: Number,
    currency: String,
    description: String,
    hosted_invoice_urls: String


});

module.exports = mongoose.model('Invoice', invoiceSchema);