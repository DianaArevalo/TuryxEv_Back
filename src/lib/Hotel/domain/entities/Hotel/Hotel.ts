import {
    CreatedAt, 
    UpdatedAt, 
    HotelId, 
    HotelName, 
    HotelEmail, 
    HotelPassword, 
    HotelLocation, 
    HotelPlan, 
    HotelStatus,
    ProviderData} from "./value-objects"


    export interface HotelI {
        hotelId: HotelId
        name: HotelName
        email: HotelEmail
        password: HotelPassword
        location: HotelLocation
        plan: HotelPlan
        status: HotelStatus
        createdAt: CreatedAt
        updatedAt: UpdatedAt
        providerData: ProviderData
    }

    export class Hotel implements HotelI {

        hotelId: HotelId;
        name: HotelName;
        email: HotelEmail;
        password: HotelPassword;
        location: HotelLocation;
        plan: HotelPlan;
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
            this.status = attr.status;
            this.createdAt = attr.createdAt;
            this.updatedAt = attr.updatedAt;
            this.providerData = attr.providerData;
        }

        toResponse() {
            return {
                hotelId: this.hotelId.value,
                name: this.name.value,
                email: this.email.value,
                password: this.password.value,
                location: this.location.getValue(),
                plan: this.plan.value,
                status: this.status.getValue(),
                createdAt: this.createdAt.value,
                updatedAt: this.updatedAt.value,
                providerData: this.providerData.value
            };
        }


    }