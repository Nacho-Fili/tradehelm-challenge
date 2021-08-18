export interface User {
  id: number;
}

export interface UserService {
  createUser: () => Promise<User>;
}

export default User;
