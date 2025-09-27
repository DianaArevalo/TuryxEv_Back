// 0: Client, 1: Hotel, 2: HotelAdmin, 3: Business, 4: AdminBusiness, 5: SuperAdmin
export type HotelRoleT = "CLIENT" | "HOTEL" | "HOTELADMIN" | "BUSINESS" | "ADMINBUSINESS" | "SUPERADMIN";

const HotelRoleTMap: Record<HotelRoleT, 0 | 1 | 2 | 3 | 4 | 5> = {
    CLIENT: 0,
    HOTEL: 1,
    HOTELADMIN: 2,
    BUSINESS: 3,
    ADMINBUSINESS: 4,
    SUPERADMIN: 5,
};


const HotelRoleTReverseMap: Record<0 | 1 | 2 | 3 | 4 | 5, HotelRoleT> = {
    0: "CLIENT",
    1: "HOTEL",
    2: "HOTELADMIN",
    3: "BUSINESS",
    4: "ADMINBUSINESS",
    5: "SUPERADMIN",
};

export class HotelRole {
    constructor(readonly value: HotelRoleT) {}

    static create(value: HotelRoleT): HotelRole {
       if (!Object.values(HotelRoleTMap).includes(value as any)) {           
            throw new Error(`Invalid value: ${value}`);
        }
        return new HotelRole(value);
    }

    static fromPrimitives(value: 0 | 1 | 2 | 3 | 4 | 5) : HotelRole {
        const mapped = HotelRoleTReverseMap[value];
        if (!mapped) {          
            throw new Error(`Invalid value: ${value}`);
        }

        return new HotelRole(mapped);        
    }   
    
    toPrimitives(): 0 | 1 | 2 | 3 | 4 | 5 {
        const numberValue = HotelRoleTMap[this.value as HotelRoleT];
        if (numberValue === undefined) {          
            throw new Error(`Invalid value: ${this.value}`);
        }
        return numberValue;
    }


    getValue(): HotelRoleT {
        return this.value;
    }

}




   
