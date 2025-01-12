const responseData = ( statusCode, body, headers = {} ) => {
    return {
        statusCode: statusCode,
        body: JSON.stringify( body ),
        headers: {
            ...headers
        }
    };
}

const setResponse301 = url => (
    {
        'statusCode': 301,
        'headers': {
            'Content-Type': 'text/html',
            'Connection': 'keep-alive',
            'Location': url,
            'Cache-Control': 'max-age=3600'
        }
    }
);

module.exports = {
    responseData,
    setResponse301
};