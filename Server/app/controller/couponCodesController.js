const express = require('express')
const router = express.Router()
const moment = require('moment')
const {CouponCode} = require('../model/couponCode')
router.post('/create',async (req,res)=>{
    try {
        const body = req.body
        const checkAvailability = await CouponCode.findOne({'couponCode' : body.couponCode})
        if(checkAvailability){
            res.send({
                message : 'Coupon code already existing,try with other name',
                success : false,
                status : 303
            })
        }
        else{
        const newCouponCode = new CouponCode(body)
        const saveCouponCode = await newCouponCode.save()
        res.send({
            message : 'Coupon Code created successfully',
            success : true,
            status : 201
        })
        }
        
    } catch (error) {
        res.send({
            message : 'Something went wrong,please try again',
            success : false,
            error : error.message,
            status : 400
        })
    }
})
router.get('/list',async (req,res)=>{
    try {
        const couponCodesList = await CouponCode.find().sort("-_id")
        res.send({
            couponCodesList,
            success : true,
            status : 200
        })
    } catch (error) {
        res.send({
            message : 'Something went wrong,please try again',
            success : false,
            error : error.message,
            status : 400
        })
    }
})
router.post('/validate',async (req,res)=>{
    try {
        const body = req.body
        console.log('incoming body',body)
        let discountAmountToDeduct = 0
        const todayDate = moment().format('DD/MM/YYYY')
        const checkCouponCode = await CouponCode.findOne({'couponCode' : body.couponCode,endDate : {$gte : todayDate},minCartAmount : {$lte : body.cartAmount}})
        console.log('coupon data',checkCouponCode)
        if(checkCouponCode){
            if(checkCouponCode.discountDetails.typeOfDiscount == 'flatDiscount'){
                discountAmountToDeduct = checkCouponCode.discountDetails.predefineAmount
            }
            else if(checkCouponCode.discountDetails.typeOfDiscount == 'percentageDiscount'){
                calDisAmount = body.cartAmount*checkCouponCode.discountDetails.discountPercentage/100
                console.log('discount amount',calDisAmount)
                if(calDisAmount<=checkCouponCode.discountDetails.maxDiscountAmount){

                    discountAmountToDeduct = calDisAmount
                }
            }
            res.send({
                discountAmountToDeduct ,
                success : true,
                status : 200
            })
        }
        else{
            res.send({
                message : 'Coupon you have entered has been expired/ cart amount is less than minumum amount',
                success : false
                
            })
        }
    } catch (error) {
        res.send({
            message : 'Something went wrong,please try again',
            success : false,
            error : error.message,
            status : 400
        })
    }
})
module.exports = {
    couponCodesController : router
}