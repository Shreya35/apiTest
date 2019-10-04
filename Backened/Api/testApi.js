const testSchema = require('../Schema/testSchema');
module.exports = {
    createApi:function(data,callback){
        testSchema.create(data,(err,result)=>{
            if(err) {
                callback(err,null);
            }
            else{
                callback(null,result)
            }
        })

    },
    findApi:function(data,callback){
        testSchema.find(data,(err,result)=>{
            if(err) {
                callback(err,null);
            }
            else{
                callback(null,result)
            }
        })

    },
    updateApi:function(data,callback){
        testSchema.findOneAndUpdate({id:data.id},{$set:{value:data.value}},{new:true},(err,result)=>{
            if(err) {
                callback(err,null);
            }
            else{
                callback(null,result)
            }
        })
    },
    deleteApi:function(data,callback){
        testSchema.remove({id:data.id},(err,result)=>{
            if(err) {
                callback(err,null);
            }
            else{
                callback(null,result)
            }
        })
    }

}