type JpostaConfig = {
    host: string;
};
export type Address = {
    pref: string;
    prefNum: number;
    cityCode: number;
    city: string;
    area?: string;
};
export type City = {
    key: number;
    name: string;
};
export declare const getAddress: (zipCode: string) => Promise<Address | null>;
export declare const configureJposta: (config: Partial<JpostaConfig>) => void;
export declare const getPrefs: () => string[];
export declare const getCitiesByPref: (prefIndex: number) => Promise<City[]>;
export {};
