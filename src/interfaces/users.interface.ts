export interface IUser {
    _id: number;
    name: string;
    email: string;
    password: string;
    salt: string;
}

export interface IUserInputDTO {
    name: string;
    email: string;
    password: string;
}

export interface INewUser extends IUserInputDTO {
    salt: string;
}

export interface IFindUser extends Omit<IUserInputDTO, 'name'> { }
