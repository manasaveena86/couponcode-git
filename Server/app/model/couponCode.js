const mongoose = require('mongoose')
const {Schema} = mongoose
const couponCodeSchema = new Schema({
    couponCode : {
        type : String
    },
    startDate : {
        type : String
    },
    endDate : {
        type : String
    },
    discountDetails : {
        typeOfDiscount : {
            type : String,
            required : true
        },
        predefineAmount : {
            type : Number
        },
        discountPercentage : {
            type : Number
        },
        maxDiscountAmount : {
            type : Number
        }
    },
    minCartAmount : {
        type : Number
    }
},{timestamps : true})
const CouponCode = mongoose.model('CouponCode',couponCodeSchema)
module.exports = {
    CouponCode
}