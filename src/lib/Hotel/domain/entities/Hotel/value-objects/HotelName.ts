export class HotelName {
    // no puede estar vacio
    // al menos 3 caracteres

      value: string;

    constructor(value: string){
        this.value = value;
        this.ensureIsValid();
    }

    private ensureIsValid(){
         if (!this.value || this.value.trim().length === 0) {
            throw new Error("El nombre no puede estar vacío");
        }
        if (this.value.length < 3) {
            throw new Error("El nombre debe tener al menos 3 caracteres")
        }
    }

    getValue(): string {
        return this.value;
    }
}