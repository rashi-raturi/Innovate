const {getRecs} = require('../services/ai_recommendations')

const recommend = async (req,res) =>{
    try {
        const {user_meals_data, available_meals} = req.body

        const inputData = { user_meals_data, available_meals };

        const result = await getRecs(JSON.stringify(inputData))

        console.log(result)
        return res.status(200).json({recommendations: result})

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error})
    }
}

module.exports = {
    recommend
}