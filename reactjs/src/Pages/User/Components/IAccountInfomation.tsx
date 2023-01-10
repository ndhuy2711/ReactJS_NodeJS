interface IAccountInfomation {
    name: string,
    email: string,
    phone_number: string,
    gender: string,
    role: string,
    getItemActive: string[]
}

//In hoa chữ cái đầu tiên
export function keyUCFirst(key: string) {
    return key.charAt(0).toUpperCase() + key.slice(1);
}

export default IAccountInfomation