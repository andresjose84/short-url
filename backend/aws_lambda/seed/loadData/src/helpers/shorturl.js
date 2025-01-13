const uuidv4 = require('uuid').v4;
const crypto = require('crypto');


const generateUniqueShortHash = () => {
    const uuid = uuidv4();
    return crypto.createHash( 'md5' )
        .update( uuid )
        .digest( 'hex' )
        .substring( 0, 6 );
};

module.exports = generateUniqueShortHash;
