import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinRoomComponent } from './component/join-room/join-room.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { ChatComponent } from './component/chat/chat.component';

const routes: Routes = [
  {path:"", redirectTo:"join-room", pathMatch:"full"},
  {path:"join-room", component:JoinRoomComponent},
  {path:"welcome", component:WelcomeComponent},
  {path:"chat", component:ChatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
