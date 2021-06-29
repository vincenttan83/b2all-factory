import { ISecurity } from '../security.interface';

export interface IEntityUserProfile extends ISecurity {
    user_uid: string;
    name: string;
    billing_addresses?: {
        default: boolean;
        address1: string;
        address2: string;
        city: string;
        state: string;
        country: string;
    }[];
    shipping_addresses?: {
        default: boolean;
        address1: string;
        address2: string;
        city: string;
        state: string;
        country: string;
    }[];
    phone_numbers: string[];
}
