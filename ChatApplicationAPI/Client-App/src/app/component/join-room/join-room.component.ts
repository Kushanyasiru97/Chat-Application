import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.scss']
})
export class JoinRoomComponent implements OnInit{

  joinRoomForm!: FormGroup;

  fb=inject(FormBuilder);
  router = inject(Router);

  ngOnInit(): void {
    user: ['', Validators.required]
    room: ['', Validators.required]
  }

  joinRoom(){
    if (this.joinRoomForm) {
      console.log(this.joinRoomForm.value);
      // Navigate to the 'chat' route
      this.router.navigate(['chat']);
    } else {
      console.error('joinRoomForm is not initialized properly');
    }
  }

}
