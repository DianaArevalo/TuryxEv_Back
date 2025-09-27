export class HotelScore{
    value: number

    constructor(value: number) {
        this.value = value
    }

    //Validar que el score este entre 0 y 5
    ensureIsValid() {
        if (this.value < 0 || this.value > 5) {
            throw new Error("El score debe estar entre 0 y 5");
        }
    }

    static create(value: number): HotelScore {
        const score = new HotelScore(value);
        score.ensureIsValid();
        return score;
    }

}