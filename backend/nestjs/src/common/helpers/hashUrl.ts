
import { v4 as uuidv4 } from 'uuid';

export const generateUniqueShortHash = async (): Promise<string> => {
    const uuid = uuidv4();
    try {
        const { createHash } = await import( 'node:crypto' );
        return createHash( 'md5' )
            .update( uuid )
            .digest( 'hex' )
            .substring( 0, 6 );
    } catch ( error ) {
        console.log( 'Caught error', error );
        console.log( 'Falling back to UUID' );

        return uuid.substring( 0, 6 );
    }

};