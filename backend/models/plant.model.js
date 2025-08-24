const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true,
    },
    categories : {
        type : String,
        enum : ["Indoor", "Outdoor", "Succulent", "Medicinal", "Flowering"],
        required : true,
    },
    qty : {
        type : Number,
        required : true
    }
})

const Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;