import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UserAddEditComponent } from './pages/user-add-edit/user-add-edit.component';
import { UsersComponent } from './pages/users/users.component';

export const appRoutes: Routes = [
    { path: `:username`, component: IndexComponent },
    { path: `users/list`, component: UsersComponent },
    { path: `users/add`, component: UserAddEditComponent },
    { path: `users/edit/:customerId`, component: UserAddEditComponent },
    { path: `notFound`, component: NotFoundComponent },
    { path: `**`, component: NotFoundComponent },
];
