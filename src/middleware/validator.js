
const responseLib=require('../libs/responseLib')
const Joi=require('joi').extend(require('@joi/date'))


const loginValidSchema=Joi.object({
    email: Joi.string().email().required(),
    password:Joi.string().max(20).required()
})
const registerValidateSchema=Joi.object({
    name:Joi.string().required(),
    password:Joi.string().required(),
    email:Joi.string().email().required(),
    address:Joi.string()
})
const addHotelValidateSchema = Joi.object({
    hotelName:Joi.string().required(),
    rating:Joi.number().required(),
    price:Joi.string().required()
})
const loginValidate=async(req,res,next)=>{
    try{
        const value=await loginValidSchema.validate(req.body)
        if(value.hasOwnProperty('error'))
        {
            throw new Error(value.error)
        }else{
            next()
        }
    }catch(err){
        let apiResponse=responseLib.generate(false,err.message,{})
        res.status(400).send(apiResponse)
    }
}

const registerValidate=async(req,res,next)=>{
    try{
        const value=await registerValidateSchema.validate(req.body)
        if(value.hasOwnProperty('error')){
            throw new Error(value.error)
        }
        else{
            next()
        }
    }catch(err){
        let apiResponse=responseLib.generate(false,err.message,{})
        res.status(400).send(apiResponse)
    }
}
const addHotelValidate=async(req,res,next)=>{
    try{
        const value=await addHotelValidateSchema.validate(req.body)
        if(value.hasOwnProperty('error'))
        {
            throw new Error(value.error)
        }else{
            next()
        }
    }catch(err){
        let apiResponse=responseLib.generate(false,err.message,{})
        res.status(400).send(apiResponse)
    }
}
module.exports={
    loginValidate:loginValidate,
    registerValidate:registerValidate,
    addHotelValidate:addHotelValidate
}