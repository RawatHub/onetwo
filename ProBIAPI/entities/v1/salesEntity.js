const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SalesEntitySchema = new Schema({
    companyId: {
        type: String
    },
    voucherType: {
        type: String
    },
    voucherNumber: {
        type: String
    },
    voucherDate: {
        type: Date
    },
    deliverAt: {
        type: String
    },
    truckNumber: {
        type: String
    },
    buyerDetails: {
        buyerName: {
            type: String
        },
        buyerAddress: {
            type: String
        },
        buyerState: {
            type: String
        },
        buyerPinCode: {
            type: String
        },
        buyerPhone: {
            type: String
        },
        buyerMobile: {
            type: String
        }
    },
    inventoryEntries: [{
        productName: {
            type: String
        },
        quantity: {
            type: Number
        },
        unit: {
            type: String
        },
        rate: {
            type: Number
        },
        discount: {
            type: Number
        },
        amount: {
            type: Number
        }
    }],
    ledgerEntries: [{
        ledgerName: {
            type: String
        },
        isPartyLedger: {
            type: Boolean
        },
        amount: {
            type: Number
        }
    }]
});

module.exports = mongoose.model('SalesEntity', SalesEntitySchema);