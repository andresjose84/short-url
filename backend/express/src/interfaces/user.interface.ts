export interface User {
    user: string;
    user_image: string;
    user_name: string;
    user_last_name: string;
    user_email: string;
    user_password: string;
    created: number;
    modified: number;
    user_type: 1 | 2;
    status: boolean;
}

export interface UserQuery {
    _id?: string;
    user?: string;
    user_image?: string;
    user_name?: string;
    user_last_name?: string;
    user_email?: string;
    user_password?: string;
    created?: number;
    modified?: number;
    user_type?: 1 | 2;
    status?: boolean;
}

export interface UserLogin {
    headers: {
        'x-token': string;
    },
    body: {
        user: string;
        password: string;
    }
}