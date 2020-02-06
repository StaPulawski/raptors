import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GraphcreatorComponent } from './components/map/graphcreator/graphcreator.component';
import { PolygonsComponent } from './components/map/polygons/polygons.component';
import { MapUploadComponent } from './components/map/map-upload/map-upload.component';
import {StandCreatorComponent} from "./components/map/stand-creator/stand-creator.component";
import {AdminPanelComponent} from "./components/adminpanel/admin-panel.component";
import {LoginComponent} from "./components/login/login.component";
import {MovementPathComponent} from "./components/map/movement-path/movement-path.component";
import {CorridorsComponent} from "./components/map/corridors/corridors.component";
import {TaskpanelComponent} from "./components/taskpanel/taskpanel.component";
import {AuthGuard} from "./services/auth.guard";
import {AccessForbiddenComponent} from "./components/access-forbidden/access-forbidden.component";
import {RobotPanelComponent} from "./components/robotpanel/robot-panel.component";
import {UserspanelComponent} from "./components/userspanel/userspanel.component";
import {RobotTask} from "./model/Robots/RobotTask";
import {TaskpanelDetailsComponent} from "./components/taskpanel/taskpanel-details/taskpanel-details.component";
import {TaskpanelListComponent} from "./components/taskpanel/taskpanel-list/taskpanel-list.component";


const routes: Routes = [
  {path: '', component: HomeComponent,
    canActivate: [AuthGuard],
    data: {rolesIDs: ['ROLE_ADMIN','ROLE_REGULAR_USER','ROLE_SUPER_USER','ROLE_SERVICEMAN']},
  },
  {path: '', component: HomeComponent},
  {path: 'robotpanel/:id', component: RobotPanelComponent},
  {path: 'taskpanel-details/:id', component: TaskpanelListComponent} ,
  {path: 'graphcreator', component: GraphcreatorComponent},
  {path: 'polygons', component: PolygonsComponent},
  {path: 'mapupload', component: MapUploadComponent},
  {path: 'stands', component: StandCreatorComponent},
  {
    path: 'adminpanel', component: AdminPanelComponent,
    canActivate: [AuthGuard],
    data: {rolesIDs: ['ROLE_ADMIN']},
  },
  {
    path: 'users', component: UserspanelComponent,
    canActivate: [AuthGuard],
    data: {rolesIDs: ['ROLE_ADMIN']},
  },
  {path: 'login', component: LoginComponent},
  {path: 'movementPaths', component: MovementPathComponent},
  {path: 'corridors', component: CorridorsComponent},
  {path: 'taskpanel', component: TaskpanelComponent},
  {path: 'access-denied', component: AccessForbiddenComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
