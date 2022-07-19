
const generateResponse = (response, data, message) => {
    if (data) {
        response.status(200).json({      
            message: message,      
            data,
        })
    } else {
        response.status(400).json({       
            message: 'Bad request',
            data,
        })  
    }
}

module.exports = {
    generateResponse
}