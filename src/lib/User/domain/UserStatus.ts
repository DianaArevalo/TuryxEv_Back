

export class UserStatus {
    readonly value: boolean;

    constructor( value: boolean) {
        if (typeof value !== 'boolean') {
            throw new Error('Status must be a boolean')
        }

        this.value = value
    }
}