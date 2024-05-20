//response generation format for api
const encLib=require('./encLib')

let generateEnc=(err,message,data)=>{
    let response={
        error:err,
        message:message,
        data:data?encLib.encrypt(data).toString('base64'):data
    }
    return response
}

let generate=(success,message,data)=>{
    let response={
        success:success,
        message:message,
        data:data
    }
    return response
}

module.exports={
    generate:generate,
    generateEnc:generateEnc
}