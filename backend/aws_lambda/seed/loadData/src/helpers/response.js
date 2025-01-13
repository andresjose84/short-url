const responseData = ( statusCode, body, headers = {} ) => {
    return {
        statusCode: statusCode,
        body: JSON.stringify( body ),
        headers: {
            ...headers
        }
    };
}

module.exports = {
    responseData
};