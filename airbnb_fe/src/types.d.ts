interface IRoomProps {
    pk: number;
    imageUrl: string;
    name: string;
    room_rate: number;
    price: number;
    city: string;
    country: string;
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
    name: string;
    kind: string;
}

interface IAmenity {
    name: string;
    description: string | null;
}

interface IRoomDetail {
    id: number;
    owner: IOwner;
    category: ICategory;
    amenity: IAmenity;
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
    toilerts: number;
    description: string;
    address: string;
    pet_allow: boolean;
    kink: string;
    review_count: number;
}