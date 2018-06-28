const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var DashboardEntitySchema = new Schema({
    companyId: {
        type: String
    },
    fromDate: {
        type: String
    },
    toDate: {
        type: String
    },    
    totals: {
        sales: {
            type: Number
        },
        purchase: {
            type: Number
        },
        outstanding: {
            type: Number
        },
        stockAtHand: {
            type: Number
        }
    }
});

module.exports = mongoose.model('DashboardEntity', DashboardEntitySchema);