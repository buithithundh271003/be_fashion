const Category = require("../models/category.model.js");
async function createCategory(reqData){
    const category = new Category({
        title: reqData.title,
    })
    await category.save();
    return "Create successfully"
}
async function deleteCategory(categoryId){
    const category = await findCategorytById(categoryId);
    await Category.findOneAndDelete(category);
    return "Product deleted Successfuly"
}
async function findCategorytById(categoryId){

    const category = await Category.findById(categoryId).exec();

    if(!category){
        throw new Error("Product not found with id");

    }
    return category;
}
async function getAllCategorys(reQuery){
    
    const category = await Category.find({})
    return category
}

module.exports ={
    createCategory,
    deleteCategory,
    findCategorytById,
    getAllCategorys,
}