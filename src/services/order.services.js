const cartService = require("../services/cart.services.js");
const Address = require("../models/address.model.js")
const OrderItem = require("../models/orderItem.model.js")
const Order = require("../models/order.model.js")
const Product = require("../models/product.model.js")

async function createOrder(user, shippAddress) {
    console.log("gg", shippAddress)
    let address;
    const sodienthoai = shippAddress.sodienthoai
    if (shippAddress.sodienthoai) {
        let isExist = await Address.findOne({sodienthoai});
        address = isExist;
    } else {
        address = new Address(shippAddress);
        address.user = user;
        // console.log(address)
        await address.save();
        user.address.push(address);
        await user.save();
    }
    const cart = await cartService.findUserCart(user._id);
    const orderItems = [];
    for (const item of cart.cartItem) {
        const orderItem = new OrderItem({
            price: item.price,
            product: item.product,
            quanity: item.quanity,
            discount: item.discount,
           
        })
        const creatOrderItem = await orderItem.save();
        orderItems.push(creatOrderItem);
        const product = await Product.findById(item.product);
        if (product) {
            if (product.quantity >= item.quanity) {
                product.quantity -= item.quanity;
                await product.save();
            } else {
                throw new Error(`Sản phẩm ${product.title} không đủ hàng trong kho.`);
            }
        }
    }
    const createOrder = new Order({
        user,
        tennguoinhan: shippAddress.firstName+" "+shippAddress.lastName,
        orderItems,
        total: cart.price,
        discount: cart.discount,
        totalItem: cart.totalItem,
        giaohangAddress: address,
        diachi: shippAddress.address,
        orderStatus:"PROCESSING"
    })
    const saveOrder = await createOrder.save();
    return saveOrder;
}
async function placeOrder(orderId) {
    const order = await findOrderById(orderId);
    console.log(order)
    order.orderStatus = "PLACED";
    order.orderStatus = "COMPLETED";
    return await order.save();
}
async function confirmOrder(orderId) {
    const order = await findOrderById(orderId);
    console.log(order)

    order.orderStatus = "XAC NHAN";
    return await order.save();
}
async function shipOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderStatus= "SHIPPED";
    console.log(order)

    return await order.save();
}
async function deliveryOrder(orderId) {
    const order = await findOrderById(orderId);
    order.orderStatus= "DELIVERED";
    console.log(order)
    return await order.save();
}
async function cancelOrder(orderId) {
    const order = await findOrderById(orderId);
    order.orderStatus = "CANCEL";
    console.log(order)

    return await order.save();
}
async function findOrderById(orderId) {
    // console.log(orderId)
    const order = await Order.findById(orderId)
        .populate({path: "user", populate:{path:"address"}})
        .populate({ path: "orderItems", populate: { path: "product" } })
        .populate("giaohangAddress")
    return order
}
async function usersOrderHistory(userId) {
    try {
        const orders = await Order.find({ user: userId})
            .populate({ path: "orderItems", populate: { path: "product" } })
            // console.log(orders)
        return orders;
        
    } catch (error) {
        throw new Error(error.message)
    }
}
async function getAllOrders() {
    return await Order.find()
        .populate({ path: "orderItems", populate: { path: "product" } })
        .populate("user")
}
async function deleteOrder(orderId) {
    const order = await findOrderById(orderId);
    await Order.findByIdAndDelete(order._id)
}
module.exports = {
    createOrder, placeOrder, confirmOrder, shipOrder, deliveryOrder, deleteOrder
    , getAllOrders, cancelOrder, usersOrderHistory, findOrderById
}
