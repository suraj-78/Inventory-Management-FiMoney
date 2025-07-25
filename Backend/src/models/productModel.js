const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const productSchema = new Schema({
    name : String, 
    type : String, 
    sku : String, 
    image_url : String, 
    description : String, 
    quantity : Number, 
    price : Number

});

const productModel = mongoose.model("product", productSchema);

module.exports = {
    productModel
}