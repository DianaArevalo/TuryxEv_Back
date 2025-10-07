import {
    CreatedAt, 
    UpdatedAt, 
    HotelId, 
    HotelName, 
    HotelEmail, 
    HotelRole, 
    HotelScore,
    HotelPassword, 
    HotelLocation, 
    HotelPlan, 
    HotelStatus,
    ProviderData} from "./value-objects"


    export interface HotelI {
        hotelId?: HotelId
        name: HotelName
        email: HotelEmail
        password?: HotelPassword
        location: HotelLocation
        plan: HotelPlan
        role: HotelRole
        score: HotelScore
        status: HotelStatus
        createdAt: CreatedAt
        updatedAt: UpdatedAt
        providerData: ProviderData
    }

    export class Hotel implements HotelI {

        hotelId?: HotelId;
        name: HotelName;
        email: HotelEmail;
        password?: HotelPassword;
        location: HotelLocation;
        plan: HotelPlan;
        role: HotelRole;
        score: HotelScore
        status: HotelStatus;
        createdAt: CreatedAt;
        updatedAt: UpdatedAt;
        providerData: ProviderData;


        constructor(attr: HotelI) {
            this.hotelId = attr.hotelId;
            this.name = attr.name;
            this.email = attr.email;
            this.password = attr.password;
            this.location = attr.location;
            this.plan = attr.plan;
            this.role = attr.role;
            this.score = attr.score
            this.status = attr.status;
            this.createdAt = attr.createdAt;
            this.updatedAt = attr.updatedAt;
            this.providerData = attr.providerData;
        }

        toResponse() {
            return {
                hotelId: this.hotelId?.value,
                name: this.name.getValue(),
                email: this.email.getValue(),
                password: this.password?.getValue(),
                location: this.location.getValue(),
                plan: this.plan.getValue(),
                role: this.role.getValue(),
                score: this.score.getValue(),
                status: this.status.getValue(),
                createdAt: this.createdAt.value,
                updatedAt: this.updatedAt.value,
                providerData: this.providerData.getValue(),
            };
        }


    }