export enum UserAPIKeys {
    id = "id",
    firstName = "first_name",
    lastName = "last_name",
    email = "email",
    phone = "phone",
    adress = "adress",
    password = "password"
}

export interface UserAPI {
    [UserAPIKeys.id]: number;
    [UserAPIKeys.firstName]: string;
    [UserAPIKeys.lastName]: string;
    [UserAPIKeys.email]: string;
    [UserAPIKeys.phone]: string;
    [UserAPIKeys.adress]: string;
    [UserAPIKeys.password]: string;
}