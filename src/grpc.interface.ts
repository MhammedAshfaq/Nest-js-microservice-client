import { Observable } from 'rxjs';

export interface GrpcService {
  accumulate(userId: NumberId): Observable<any>;
  addUser(userDto: UserDtos): Observable<any>;
  getAllUsers(none: Null): Observable<any>;
}

interface NumberId {
  id: number;
}
interface Null {}

interface UserDtos {
  firstName: string;
  lastName: string;
  email: string;
}
