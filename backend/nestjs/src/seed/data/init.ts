export interface InitSeed {
    user: User[]
    urls: string
}

export interface User {
    user: string
    user_image: string
    user_name: string
    user_last_name: string
    user_email: string
    user_password: string
    created: number
    modified: number
    user_type: number
    status: boolean
}

export interface Urls {}

export const initSeed: InitSeed = {
    "user": [ {
        "user": "admin",
        "user_image": "",
        "user_name": "Root",
        "user_last_name": "Admin",
        "user_email": "root-admin@gmail.com",
        "user_password": "P4$$W0rd",
        "created": 123,
        "modified": 123,
        "user_type": 1,
        "status": true
    },
    {
        "user": "user1",
        "user_image": "https://example.com/images/user1.jpg",
        "user_name": "John",
        "user_last_name": "Doe",
        "user_email": "johndoe@example.com",
        "user_password": "Password123!",
        "created": 1672531200,
        "modified": 1672531300,
        "user_type": 2,
        "status": true
    },
    {
        "user": "user2",
        "user_image": "https://example.com/images/user2.jpg",
        "user_name": "Jane",
        "user_last_name": "Smith",
        "user_email": "janesmith@example.com",
        "user_password": "SecurePass456!",
        "created": 1672531400,
        "modified": 1672531500,
        "user_type": 2,
        "status": true
    },
    {
        "user": "user3",
        "user_image": "https://example.com/images/user3.jpg",
        "user_name": "Alice",
        "user_last_name": "Johnson",
        "user_email": "alicejohnson@example.com",
        "user_password": "MyPassword789!",
        "created": 1672531600,
        "modified": 1672531700,
        "user_type": 2,
        "status": false
    },
    {
        "user": "user4",
        "user_image": "https://example.com/images/user4.jpg",
        "user_name": "Bob",
        "user_last_name": "Brown",
        "user_email": "bobbrown@example.com",
        "user_password": "PassWord101!",
        "created": 1672531800,
        "modified": 1672531900,
        "user_type": 2,
        "status": false
    },
    {
        "user": "user5",
        "user_image": "https://example.com/images/user5.jpg",
        "user_name": "Charlie",
        "user_last_name": "Davis",
        "user_email": "charliedavis@example.com",
        "user_password": "StrongPass202!",
        "created": 1672532000,
        "modified": 1672532100,
        "user_type": 2,
        "status": true
    }
    ],
    "urls": "https://example.com/long-url-"
}