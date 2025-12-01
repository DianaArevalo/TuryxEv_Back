import { User } from './user';
import {
  UserName,
  UserEmail,
  UserPlan,
  UserRole,
  UserProviderData,
  UserScore,
  UserStatus,
  UserCreatedAt,
  UserUpdatedAt,
} from './value-objects';

import { HotelId } from '~/lib/hotel/domain';

describe('User', () => {
  const baseAttrs = {
    name: new UserName('John Doe'),
    email: new UserEmail('test@example.com'),
    plan: new UserPlan('FREE'),
    role: new UserRole('USER'),
    providerData: new UserProviderData('AUTH'),
    createdAt: new UserCreatedAt(new Date()),
    updatedAt: new UserUpdatedAt(new Date()),
  };

  it('should create user with default values', () => {
    const user = new User(baseAttrs);

    expect(user.idUser).toBeInstanceOf(HotelId);
    expect(user.score.value).toBe(1);
    expect(user.status.value).toBe(true);
  });

  it('should use provided optional values', () => {
    const user = new User({
      ...baseAttrs,
      idUser: new HotelId('abc123'),
      score: new UserScore(5),
      status: new UserStatus(false),
    });

    expect(user.idUser.value).toBe('abc123');
    expect(user.score.value).toBe(5);
    expect(user.status.value).toBe(false);
  });

  it('should map correctly to response', () => {
    const user = new User({
      ...baseAttrs,
      idUser: new HotelId('user-id-1'),
      score: new UserScore(3),
      status: new UserStatus(true),
    });

    const response = user.toResponse();

    expect(response).toEqual({
      idUser: 'user-id-1',
      name: 'John Doe',
      email: 'test@example.com',
      picture: undefined,
      plan: 'FREE',
      role: 'USER',
      score: 3,
      providerData: 'AUTH',
      status: true,
    });
  });
});
