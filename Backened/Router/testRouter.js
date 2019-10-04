const express = require('express');
const router = express.Router();
const testApi = require('../Api/testApi');

router.post('/createApi',(req,res)=>{
    console.log('data from client',req.body)
    testApi.createApi(req.body,(err,result)=>{
        if(err) {
            console.log('err in create',err);
            res.send({error:err})
        }
        else {
            console.log('result in create',result);
            res.send({success:result})
        }
    })
});

router.get('/findApi',(req,res)=>{
    let data={};
    testApi.findApi(data,(err,result)=>{
        if(err) {
            res.send({error:err})
        }
        else {
            res.send({success:result})
        }
    })
});

router.put('/updateApi',(req,res)=>{
    testApi.updateApi(req.body,(err,result)=>{
        if(err) {
            res.send({error:err})
        }
        else {
            res.send({success:result})
        }
    })
});

router.delete('/deleteApi',(req,res)=>{
     testApi.deleteApi(req.body,(err,result)=>{
         if(err) {
             res.send({error:err})
         }
         else {
             res.send({success:result})
         }
     })
 });


module.exports = router;