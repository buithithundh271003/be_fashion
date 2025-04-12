const mongoose =require("mongoose")

const { Schema } = mongoose;
const categorySchema = new  Schema({
 
    title:{
        type: String,
        require: true
    },
    
    creatAt:{
        type: Date,
        default: Date.now()
    }
})
const Category= mongoose.model('categorys', categorySchema);
module.exports = Category;
 