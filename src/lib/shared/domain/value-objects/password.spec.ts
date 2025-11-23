import { PasswordValueObject } from './password';
import { HttpError } from '../exeptions';

describe('PasswordValueObject', () => {
  it('should create a valid password', () => {
    const vo = PasswordValueObject.create('Abcdef1!');
    expect(vo.value).toBe('Abcdef1!');
  });

  it('should throw if password is too short', () => {
    expect(() => {
      PasswordValueObject.create('Ab1!');
    }).toThrow(HttpError);
  });

  it('should throw if missing uppercase letter', () => {
    expect(() => {
      PasswordValueObject.create('abcdef1!');
    }).toThrow(HttpError);
  });

  it('should throw if missing lowercase letter', () => {
    expect(() => {
      PasswordValueObject.create('ABCDEF1!');
    }).toThrow(HttpError);
  });

  it('should throw if missing number', () => {
    expect(() => {
      PasswordValueObject.create('Abcdefg!');
    }).toThrow(HttpError);
  });

  it('should throw if missing special character', () => {
    expect(() => {
      PasswordValueObject.create('Abcdef12');
    }).toThrow(HttpError);
  });

  it('should allow longer valid passwords', () => {
    const vo = PasswordValueObject.create('Str0ngPassw0rd!');
    expect(vo.value).toBe('Str0ngPassw0rd!');
  });
});
