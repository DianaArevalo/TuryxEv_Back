import { ValidationError } from "../exeptions";

const DEFAULT_PAGE = 1;
export class Page {
    private constructor(readonly value: number){}

    static create(value?: number): Page {
        if (value === undefined || value === null)
            return new Page(DEFAULT_PAGE);

        if (!Number.isInteger(value) || value < 1) 
            throw new ValidationError(
        "Page must be a positive integer greater than 0");
        
        return new Page(value);        
            
        
    }
}
