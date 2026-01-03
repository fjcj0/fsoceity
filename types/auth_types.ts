export type signUpType = {
    name: string,
    email: string,
    password: string,
    confirm_password: string
}
export type signInType = {
    email: string,
    password: string,
}
export type verificationType = {
    verificationToken: string,
    code: string
}