const mongoose =require("mongoose")

const { Schema } = mongoose;
const productSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
    },
    sizes: [{
        type: String,
        
    }],

    images: [
        {
            type: Object,
            required: true,
        }
    ],
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
    },
    chuyenMucId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chuyenmuc',
    },
    ratings:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'ratings'
    }],
    reviews:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'reviews'
    }],
    discount:{
        type: Number,
        require: true
    },
    numRatings:{
        type: Number,
        default: 0
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

const Product = mongoose.model('products', productSchema);

// Example of creating a new product
/*
const product = new Product({
    title: reqData.title,
    author: reqData.author,
    description: reqData.description,
    price: reqData.price,
    quantity: reqData.quantity,
    sizes: reqData.sizes,
    colors: reqData.colors,
    images: reqData.images,
    categoryId: reqData.categoryId,
    chuyenMucId: reqData.chuyenMucId
});
*/

module.exports = Product