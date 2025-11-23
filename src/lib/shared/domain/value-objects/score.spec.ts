import { ScoreValueObject } from './score';
import { HttpError } from '../exeptions';

describe('ScoreValueObject', () => {
  it('should create a valid score', () => {
    const vo = ScoreValueObject.create(0);
    expect(vo.value).toBe(0);
  });

  it('should create a valid score at upper boundary', () => {
    const vo = ScoreValueObject.create(5);
    expect(vo.value).toBe(5);
  });

  it('should create a valid decimal score', () => {
    const vo = ScoreValueObject.create(3.5);
    expect(vo.value).toBe(3.5);
  });

  it('should throw if value is less than 0', () => {
    expect(() => {
      ScoreValueObject.create(-1);
    }).toThrow(HttpError);
  });

  it('should throw if value is greater than 5', () => {
    expect(() => {
      ScoreValueObject.create(6);
    }).toThrow(HttpError);
  });
});
