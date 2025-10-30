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
      throw new Error('The password must be at least 8 characters long.');
    }

    if (!hasUpperCase) {
      throw new Error('The password must contain at least one uppercase letter.');
    }

    if (!hasLowerCase) {
      throw new Error('The password must contain at least one lowercase letter');
    }

    if (!hasNumber) {
      throw new Error('The password must contain at least one number.');
    }

    if (!hasSymbol) {
      throw new Error('The password must contain at least one special character.');
    }
    }
}