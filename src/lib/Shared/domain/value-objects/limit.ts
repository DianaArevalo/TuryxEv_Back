import { ValidationError } from "../exeptions";

const DEFAULT_LIMIT = 50
export class Limit {
    private constructor(readonly value: number){}

    static create(value?: number): Limit {
        if (value === undefined || value === null)
            return new Limit(DEFAULT_LIMIT);

        if(!Number.isInteger(value))
            throw new ValidationError("Limit must be an integer");

        if(value <= 0 || value > 1000)
            throw new ValidationError("Limit must be greater than 0 and less than 1000");

        return new Limit(value)
    }
}
