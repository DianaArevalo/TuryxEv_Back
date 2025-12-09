import { City } from "./city";
import { CityCountry, CityDepartment, CityId, CityName } from "./value-objects";

describe("City - Domain Entity", () => {
  let idVO: CityId;
  let nameVO: CityName;
  let departmentVO: CityDepartment;
  let countryVO: CityCountry;

  beforeEach(() => {
    idVO = new CityId("123");
    nameVO = new CityName("Medellín");
    departmentVO = new CityDepartment("Antioquia");
    countryVO = new CityCountry("Colombia");
  });

  it("should create a valid City entity from value objects", () => {
    const city = new City({
      cityId: idVO,
      name: nameVO,
      department: departmentVO,
      country: countryVO,
    });

    expect(city).toBeInstanceOf(City);
    expect(city.cityId.value).toBe("123");
    expect(city.name.value).toBe("Medellín");
    expect(city.department.value).toBe("Antioquia");
    expect(city.country.value).toBe("Colombia");
  });

  it("should return a correct response object from toResponse()", () => {
    const city = new City({
      cityId: idVO,
      name: nameVO,
      department: departmentVO,
      country: countryVO,
    });

    const response = city.toResponse();

    expect(response).toEqual({
      id: "123",
      name: "Medellín",
      department: "Antioquia",
      country: "Colombia",
    });
  });

  it("should fail if one of the value objects is invalid", () => {
    const invalidName = {
      get value() {
        throw new Error("Invalid city name");
      },
    };

    const city = new City({
      cityId: idVO,
      name: invalidName as any,
      department: departmentVO,
      country: countryVO,
    });

    expect(() => city.toResponse()).toThrow("Invalid city name");
  });
});
