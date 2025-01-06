
const app = async event => {
    return {
        statusCode: 200,
        body: "",
        headers: {
            "Content-Type": "application/json"
        }
    }
}

module.exports = app;