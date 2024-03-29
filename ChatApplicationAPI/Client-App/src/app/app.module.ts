import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './component/chat/chat.component';
import { JoinRoomComponent } from './component/join-room/join-room.component';
import { WelcomeComponent } from './component/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    JoinRoomComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
