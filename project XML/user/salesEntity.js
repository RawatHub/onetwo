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
        type: String
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
            type: String
        },
        unit: {
            type: String
        },
        rate: {
            type: String
        },
        discount: {
            type: String
        },
        amount: {
            type: String
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