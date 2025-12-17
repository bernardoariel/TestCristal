export interface User {
    name: string;
    pass: string;
}

export const users: Record<string, User> = {
    superadmin: {
        name: "superadmin",
        pass: "24159131"
    },
    stock: {
        name: "stock",
        pass: "123456"
    },
    vendedor: {
        name: "vendedor",
        pass: "123456"
    }
};