const graphql = require('graphql');
const InvoiceItem = require('../models/invoiceItem');
const Invoice = require('../models/invoice');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList
} = graphql;

const InvoiceItemType = new GraphQLObjectType({
    name: 'InvoiceItem',
    fields: ( ) => ({
        id: { type: GraphQLID },
        currency: { type: GraphQLString },
        description: { type: GraphQLString },
        amount: { type: GraphQLFloat },
        invoice: {
            type: InvoiceType,
            resolve(parent, args){
                //return _.find(invoicess, { id: parent.invoiceId });
            }
        }
    })
});

const InvoiceType = new GraphQLObjectType({
    name: 'Invoice',
    fields: ( ) => ({
        id: { type: GraphQLID },
        amount: { type: GraphQLFloat },
        currency: { type: GraphQLString },
        description: { type: GraphQLString },
        hosted_invoice_urls: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        invoiceItem: {
            type: InvoiceItemType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                //return _.find(invoiceItems, { id: args.id });
            }
        },
        invoice: {
            type: InvoiceType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                //return _.find(invoices, { id: args.id });
            }
        },
        invoiceItems: {
            type: new GraphQLList(InvoiceItemType),
            resolve(parent, args){
                //return invoiceItems;
            }
        },
        invoices: {
            type: new GraphQLList(InvoiceType),
            resolve(parent, args){
                //return invoices;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addInvoice: {
            type: InvoiceType,
            args: {
                amount: { type: GraphQLFloat },
                currency: { type: GraphQLString },
                description: { type: GraphQLString },
                hosted_invoice_urls: { type: GraphQLString }
            },
            resolve(parent, args){
                let invoice = new Invoice({
                    amount: args.amount,
                    currency: args.currency,
                    description: args.description,
                    hosted_invoice_urls: args.hosted_invoice_urls,
                });
                return invoice.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});