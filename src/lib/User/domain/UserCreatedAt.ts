export class UserCreatedAt {
    readonly value: Date;

constructor(value: Date | string | number) {
    const asDate = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(asDate.getTime())) {
    throw new Error("Fecha de creación inválida");
    }
    this.value = asDate;
    this.ensureIsValid();
}

private ensureIsValid() {
    const now = Date.now();
    const toleranceMs = 1000; // 1 segundo de margen
    if (this.value.getTime() > now + toleranceMs) {
    throw new Error("La fecha de creacion debe estar en pasado o igual al presente");
    }
  }
}