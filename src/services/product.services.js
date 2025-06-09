const Product = require("../models/product.model.js");
const Category = require("../models/category.model.js");
async function createProduct(reqData){
    console.log("kksẻvice product",reqData);
    const product = new Product({
    title: reqData.title,
    author: reqData.author,
    description: reqData.description,
    price: reqData.price,
    discount:reqData.discount,
    quantity: reqData.quantity,
    sizes: reqData.sizes,         // Should be an array like ['S', 'M', 'L']
         // Should be an array like ['den', 'trang']
    images: reqData.images,       
    categoryId: reqData.categoryId,
    chuyenMucId: reqData.chuyenMucId
    })
    // const product = await Product.create(reqData);
    console.log("kkkkkkkkkkkkkkkk",product);
    await product.save();
    return "Create successfully"
}
async function deleteProduct(productId){
    const product = await findProductById(productId);
    await Product.findOneAndDelete(product);
    return "Product deleted Successfuly"
}
async function updateProduct(productId, reqData){
    return await Product.findByIdAndUpdate(productId, reqData);
}
async function findProductById(productId){
    const product = await Product.findById(productId).exec();
    if(!product){
        throw new Error("Product not found with id");

    }
    return product;
}
async function getAllProducts(reQuery){
    
    const product = await Product.find({})
    return product
}
async function creatMultipleProduct(products){
    for(let product of products){
        await createProduct(product);
    }
}
module.exports ={
    createProduct,
    deleteProduct,
    updateProduct,
    findProductById,
    creatMultipleProduct,
    getAllProducts
}