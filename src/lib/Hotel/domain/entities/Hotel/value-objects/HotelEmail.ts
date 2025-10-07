export class HotelEmail {
    value: string

    constructor(value: string){

        this.value = value
        this.ensureIsValid();
    }

    private ensureIsValid() {
        // email con regex

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(this.value)) {
            throw new Error("UserEmail must be a valid email address");
        }
        //no exceda el numero maximo de caracteres 254
        // Estándar RFC 5321: El estándar para correos electrónicos establece que la longitud total de un correo electrónico (incluyendo la parte local, el @, y el dominio) no debe exceder 254 caracteres. Esto asegura compatibilidad con la mayoría de los sistemas de correo.

        if (this.value.length > 254) {
             throw new Error("UserEmail exceeds maximum length of 254 characters");
        }
        // no utilice los formatos invalidos .. /. inicio /final .

        const [localPart] = this.value.split("@");
        if (this.value.includes('..') || localPart.startsWith('.') || localPart.endsWith('.')) {
            throw new Error("UserEmail contains invalid consecutive or misplaced dots")
        }
    }

    getValue(): string {
        return this.value;
    }


}