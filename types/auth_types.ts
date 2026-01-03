export type signUpType = {
    name: string,
    email: string & { __brand: "LowercaseOnlyString" },
    password: string,
    confirm_password: string
}
export type signInType = {
    email: string & { __brand: "LowercaseOnlyString" },
    password: string,
}
export type verificationType = {
    verificationToken: string,
    code: string & { __brand: "NumericString" },
}