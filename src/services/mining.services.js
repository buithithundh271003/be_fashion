const node_fpgrowth = require('node-fpgrowth')
const Order = require('../models/order.model')
const Product = require('../models/product.model')

async function mining() {
    let transactions = await Order.aggregate([
        {
            $lookup: {
                from: 'orderitems',
                localField: 'orderItems',
                foreignField: '_id',
                as: 'products'
            }
        },
        {
            $project: {
                _id: 1,
                productIds: '$products.product'
            }
        },
        {
            $lookup: {
                from: 'products',
                localField: 'productIds',
                foreignField: '_id',
                as: 'products'
            }
        },
        {
            $project: {
                _id: 1,
                'products.title': 1
            }
        },
    ])

    transactions = transactions.map(transaction => {
        return transaction.products.map(product => product.title)
    })

    var fpgrowth = new node_fpgrowth.FPGrowth(.4);
    console.log(`Executing FPGrowth...`);

    fpgrowth.on('data', function (itemset) {
        var support = itemset.support;
        var items = itemset.items;
        console.log(`Itemset { ${items.join(',')} } is frequent and have a support of ${support / transactions.length * 100}%`);
    });

    const itemsets = await fpgrowth.exec(transactions)
    const productSet = new Set();
    itemsets.forEach(itemset => {
        itemset.items.forEach(item => productSet.add(item))
    })
    console.log(`Finished executing FPGrowth. ${itemsets.length} frequent itemset(s) were found.`);

    const products = await Product.find(
        {
            title: {
                $in: Array.from(productSet)
            },
        },
            'author createdAt description discount images numRatings price quantity ratings reviews sizes title ')
    console.log(products)
    return products
}

module.exports = { mining }