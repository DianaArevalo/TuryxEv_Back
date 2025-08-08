export class UserPassword {
    readonly value: string;

    constructor(value: string){
        this.value = value;
        this.ensureIsValid();
    }

    private ensureIsValid() {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(this.value);
        const hasLowerCase = /[a-z]/.test(this.value);
        const hasNumber = /\d/.test(this.value);
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(this.value);

         if (this.value.length < minLength) {
      throw new Error('La contraseña debe tener al menos 8 caracteres.');
    }

    if (!hasUpperCase) {
      throw new Error('La contraseña debe contener al menos una letra mayúscula.');
    }

    if (!hasLowerCase) {
      throw new Error('La contraseña debe contener al menos una letra minúscula.');
    }

    if (!hasNumber) {
      throw new Error('La contraseña debe contener al menos un número.');
    }

    if (!hasSymbol) {
      throw new Error('La contraseña debe contener al menos un carácter especial.');
    }
    }
}