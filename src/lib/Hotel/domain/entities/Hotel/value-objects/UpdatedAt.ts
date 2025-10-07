import { now } from "mongoose";
import { CreatedAt } from "./hotel-created-at";

export class UpdatedAt {
    readonly value: Date;
    private constructor(value: Date, createdAt: CreatedAt) {
        this.value = value;
        this.ensureIsValid(createdAt);
    }


    private ensureIsValid(createdAt: CreatedAt) {
        const now = new Date();
        if (!this.value) throw new Error("UpdatedAt is required");
        if (isNaN(this.value.getTime())) throw new Error("UpdatedAt must be a valid date");
       if (this.value > now) throw new Error("UpdatedAt must be in the past");
       if (this.value < createdAt.value) throw new Error("UpdatedAt must be greater than CreatedAt");

    }


    static now(createdAt: CreatedAt): UpdatedAt {
        return new UpdatedAt(new Date(), createdAt);
    }

    static create(value: Date, createdAt: CreatedAt): UpdatedAt {
        return new UpdatedAt(value, createdAt);
    }

    toPrimitives(): Date {
        return this.value;
    }
}