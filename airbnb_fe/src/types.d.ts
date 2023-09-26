interface IRoomProps {
    pk: number;
    imageUrl: string;
    name: string;
    room_rate: number;
    price: number;
    city: string;
    country: string;
    is_owner: boolean;
}

interface IPhotoSet {
    pk: number;
    file: string;
    description: string;
}

interface IRoom {
    pk: number;
    name: string;
    country: string;
    city: string;
    price: number;
    room_rate: number;
    is_owner: boolean;
    photo_set: IPhotoSet[];
}

interface IOwner {
    name: string;
    username: string;
    email: string;
    profile_picture: string;
}

interface ICategory {
    pk: number;
    name: string;
    kind: string;
}

interface IAmenity {
    pk: number;
    name: string;
    description: string | null;
}

interface IRoomDetail {
    id: number;
    owner: IOwner;
    category: ICategory;
    amenity: IAmenity[];
    room_rate: number;
    is_owner: boolean;
    is_liked: boolean;
    photo_set: IPhotoSet[];
    created_at: string;
    updated_at: string;
    name: string;
    country: string;
    city: string;
    price: number;
    rooms: number;
    toilets: number;
    description: string;
    address: string;
    pet_allow: boolean;
    kind: string;
    review_count: number;
}

interface IReview {
    user: IOwner;
    review: string;
    rating: number;
}

interface IMe {
    last_login: string;
    username: string;
    email: string;
    date_joined: string;
    name: string;
    profile_picture: string;
    gender: string;
    language: string;
    currency: string;
    is_host: boolean;
}

interface IUsernameLogInVariables {
    username: string;
    password: string;
}

interface IUsernameLogInSuccess {
    login_success: boolean;
}

interface IUsernameLogInFail {
    login_success: boolean;
}

interface ISignUpVariables {
    name: string;
    username: string;
    email: string;
    password: string;
}

interface ISignUpSuccess {
    success: string;
}

interface ISignUpError {
    fail: string;
}

interface IRoomForm {
    id: number;
    name: string;
    country: string;
    city: string;
    price: number;
    rooms: number;
    toilets: number;
    description: string;
    address: string;
    pet_allow: boolean;
    kind: string;
    category: number;
    owner: string;
    amenity: number[];
}

interface IUproadRoomPhotoVariables {
    roomPk: string;
    file: string;
    description: string;
}
