const Plant = require("../models/plant.model")

const createPlants = async (req, res) => {
    try {
        const {name, price, categories, qty} = req.body;
        if(!name || !price || !categories || !qty){
            return res.status(400).json({
                success : false,
                message: "Please fill all fields!"
            })
        }

        const existingPlant = await Plant.findOne({ name });

        if(existingPlant){
            return res.status(400).json({
                success : false,
                message: "Plant already exists in database"
            })
        }

        const newPlants = await Plant.create({
            name,
            price,
            categories,
            qty
        })

        return res.status(200).json({
            success : true,
            message : "Plant created successfully",
            plants : newPlants
        })
    }catch (error) {
        console.log("Server Internal Error", error)
    }
}

const fetchAllPlants = async (req, res) => {
    try{
        const plants = await Plant.find({});

        return res.status(200).json({
            success : true,
            message : "All plants fetch successfully",
            plants
        })
    }catch(error){
        console.log("Server Internal Error", error);
        return res.status(400).json({
            success : false,
            message : "Internal Server Error"
        })
    }
}

const plantController = {
    createPlants,
    fetchAllPlants
}

module.exports = plantController;