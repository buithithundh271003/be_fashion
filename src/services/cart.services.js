const Cart = require("../models/cart.model.js");
const CartItem = require("../models/cartItem.model.js");
const Product = require("../models/product.model.js")
async function createCart(user){
    try {
    const cart = new Cart({user})
    const creatCart = await cart.save();
    return creatCart;
    } catch (error) {
        throw new Error(error.message)
    }
    
}
const findUserCart = async (userId)=>{
    try {
        // console.log(userId);
        let cart = await Cart.findOne({user:userId});
        let cartItems = await CartItem.find({cart:cart._id}).populate("product");
        
        cart.cartItem = cartItems;
        if(!cartItems){
            let totalPrice = 0;
        let totalItem = 0;
        let totalDiscount = 0;
        // console.log(cart.cartItem);
       for(let item of cart.cartItem){
        totalItem += item.quanity;
            totalDiscount += item.discount;
            totalPrice += item.price;
       }
        cart.total = totalPrice;
        cart.totalItem = totalItem;
        cart.discount = totalDiscount;
        }
        // console.log(cart)
        return cart;
    } catch (error) {
        throw new Error(error.message)
    }
}
async function addCartItem(userId, req){
    try {
        console.log("peishiqiu",req);
        // console.log(userId)
        const cart = await Cart.findOne({user:userId});
        console.log("id",cart._id);

        const product = await Product.findById(req.productId);
        console.log("id",product._id);

        const isPresent = await CartItem.findOne({cart:cart._id, product: product._id, userId});

        console.log(isPresent);
        if(!isPresent){
            console.log("cảt ne");
            const cartItem = new CartItem({
                product:product._id,
                cart: cart._id,
                userId,
                quanity: req.quantity,
                colors:req.colors,
                price: product.price,
                discount: product.discount
            })
            const creatCartItem = await cartItem.save();
            cart.cartItem.push(creatCartItem);
            return "Item added to cart"
        }
        else {
        
            isPresent.quanity += req.quantity; // Cộng dồn
            await isPresent.save();
       
        }
    } catch (error) {
        throw new Error(error.message)
    }
}
module.exports = {createCart, findUserCart, addCartItem}