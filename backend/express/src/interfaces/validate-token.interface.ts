
export interface TokenValidate {
    uid: string;
    name: string;
    email: string;
    header: { 'x-token': string }
}