const MONGODB_URL = "mongodb+srv://buithithundh2003:gqyfoZL6OVHCHENM@cluster0.k9gfi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const mongoose = require("mongoose")
const connectDb = ()=>{
    return mongoose.connect(MONGODB_URL);

}
// gqyfoZL6OVHCHENM
// buithithundh2003
module.exports = {connectDb};