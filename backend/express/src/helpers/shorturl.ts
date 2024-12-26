import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

export const generateUniqueShortHash = (): string => {
    const uuid = uuidv4();
    return crypto.createHash( 'md5' )
        .update( uuid )
        .digest( 'hex' )
        .substring( 0, 6 );
};
