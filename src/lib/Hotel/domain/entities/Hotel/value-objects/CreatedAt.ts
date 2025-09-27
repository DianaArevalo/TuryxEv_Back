export class CreatedAt {
    value: Date;
    constructor(value: Date) {
        this.value = value;
        this.ensureIsValid();
    }

    private ensureIsValid() {
       const now = Date.now();
        const toleranceMs = 1000; // 1 segundo de margen
       if (!this.value) throw new Error("CreatedAt is required");
       if (isNaN(this.value.getTime())) throw new Error("CreatedAt must be a valid date");
       if (this.value.getTime() > now + toleranceMs) throw new Error("CreatedAt must be in the past or present");
    }


    static now(): CreatedAt {
        return new CreatedAt(new Date());
    }

    toPrimitives(): Date {
        return this.value;
    }
}