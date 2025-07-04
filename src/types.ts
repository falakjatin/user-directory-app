export interface IGeo {
    lat: string,
    lng: string,
};

export interface IAddress {
    street: string,
    suite: string,
    zipcode: string,
    city: string,
    geo: IGeo,
};

export interface ICompany {
    name: string,
    catchPhrase: string,
    bs: string,
};

export interface IUser {
    id: number,
    name: string,
    username: string,
    email: string,
    address: IAddress,
    phone: string,
    website: string,
    company: ICompany,
};

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
