import {Component, OnInit} from '@angular/core';
import {RobotService} from "../../services/robot.service";
import {StoreService} from "../../services/store.service";
import {RobotTaskService} from "../../services/robotTask.service";
import {Robot} from "../../model/Robots/Robot";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  robotDataloaded = false;
  private robotList: Robot[] = [];

  loggedUserRole: string;
  loggedUserID: string;
  usersID: string[] = [];

  constructor(private storeService: StoreService,
              private robotTaskService: RobotTaskService,
              private robotService: RobotService,
              private authService: AuthService,
              private userService: UserService) {
  }

  ngOnInit() {
    if (this.authService.userLoggedIn()) {
      this.loggedUserID = JSON.parse(atob(localStorage.getItem('userID')));
      this.loggedUserRole = JSON.parse(atob(localStorage.getItem('userData')));
      this.robotService.getAll().subscribe(
        data => {
          this.robotDataloaded = true;
          this.robotList = data;
        }
      );

      this.robotTaskService.getRobotTasks().subscribe(tasks => {
        this.storeService.robotTaskList = tasks;
        // filtrowanie listy zadań pod edit/delete zależnie od roli
        if(this.authService.isSuperUser()){
          this.getRobotsForSuperUser();
        }
        this.getRobotTasksByRole();
      });
    }

  }

  rotateIcon(elementID: string): void {
    document.getElementById(elementID).classList.toggle('down');
  }

  getRobotTasksByRole() {
    // REGULAR_ROLE_USER
    if (this.authService.isRegularUser()) {
      this.storeService.robotTaskList = this.storeService.robotTaskList.filter(task => task.userID == this.loggedUserID);
    }

    // ROLE_ADMIN
    if (this.authService.isAdmin()) {
      // do nothing = get all tasks
    }

    // ROLE_SERVICEMAN
    if (this.authService.isServiceman()) {
      this.storeService.robotTaskList = this.storeService.robotTaskList.filter(task => task.userID == this.loggedUserID);
    }


  }

  getRobotsForSuperUser() {
    this.usersID = [];
    this.userService.getAll().subscribe(users => {
      users.forEach(user => {
        if (user.rolesIDs.includes('ROLE_REGULAR_USER')) {
          this.usersID.push(user.id.toString());
        }
      });




      this.robotTaskService.getTasksListForUsersList(this.usersID).subscribe(tasks => {
        this.storeService.robotTaskListTemp = tasks;
        // ROLE_SUPER_USER
        this.storeService.robotTaskList = this.storeService.robotTaskList.filter(task=> task.userID == this.loggedUserID);
        this.storeService.robotTaskListTemp.forEach(task=>{
          this.storeService.robotTaskList.push(task);
        })

      });
    });
  }

}
