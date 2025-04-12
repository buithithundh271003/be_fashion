const categoryService = require("../services/category.services");
const creatCategory = async(req, res)=>{
    console.log("iiii");
    try{
        const categorys = await categoryService.createCategory(req.body);
        // console.log(reviews)
        return res.status(201).send(categorys);
    }catch(error){
        return res.status(500).send({error:error.message})

    }
}
const getAllCategorys = async(req, res)=>{
    
    try {
        const product = await categoryService.getAllCategorys(req);
        return res.status(201).send(product);
    } catch (error) {
        return res.status(500).send({error:error.message})
        
    }
}
const deleteCategory = async(req, res)=>{
    const productId = req.params.id
    console.log("xoa cate",productId)
    try {
        const product = await categoryService.deleteCategory(productId);
        return res.status(201).send(product);
    } catch (error) {
        return res.status(500).send({error:error.message})
        
    }
}
const findCategoryById = async(req, res)=>{
    const productId = req.params.id
    try {
        const product = await categoryService.findCategoryById(productId);
        return res.status(201).send(product);
    } catch (error) {
        return res.status(500).send({error:error.message})
        
    }
}
module.exports = {
    creatCategory,
    getAllCategorys,
    deleteCategory,
    findCategoryById,
}