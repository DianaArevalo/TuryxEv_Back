// 0: Client, 1: Hotel, 2: HotelAdmin, 3: Business, 4: AdminBusiness, 5: SuperAdmin
export type HotelRoleT =  "HOTEL" | "HOTELADMIN" ;

const HotelRoleTMap: Record<HotelRoleT, 1 |2> = {    
    HOTEL: 1,
    HOTELADMIN: 2,    
};


const HotelRoleTReverseMap: Record< 1 | 2 , HotelRoleT> = {
    1: "HOTEL",
    2: "HOTELADMIN"   
};

export class HotelRole {
    constructor(readonly value: HotelRoleT) {}

    static create(value: HotelRoleT): HotelRole {
       if (!Object.values(HotelRoleTMap).includes(value as any)) {           
            throw new Error(`Invalid value: ${value}`);
        }
        return new HotelRole(value);
    }

    static fromPrimitives(value:  1 | 2 ) : HotelRole {
        const mapped = HotelRoleTReverseMap[value];
        if (!mapped) {          
            throw new Error(`Invalid value: ${value}`);
        }

        return new HotelRole(mapped);        
    }   
    
    toPrimitives():  1 | 2  {
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




   
