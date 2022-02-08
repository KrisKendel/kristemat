import { Pipe, PipeTransform } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserService } from '../services/users.service';

@Pipe({ name: 'name' })
export class NamePipe implements PipeTransform {
    constructor(private userService: UserService) { }
    transform(id: string): any {
        return this.userService.getUserById(id).pipe(map(el => el.userName));
    }
}