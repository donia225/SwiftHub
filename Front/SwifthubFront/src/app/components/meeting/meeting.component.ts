import { Component, OnInit } from '@angular/core';
import { ScriptService } from 'ngx-script-loader';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/users/user.service';
declare var ZegoUIKitPrebuilt: any;

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss']
})
export class MeetingComponent implements OnInit {

  loggedInUser!: User;

  constructor(
    private scriptService: ScriptService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    //fetch local storage
    var email = window.localStorage.getItem("email");
    if (email) {
      this.userService.findUserByEmail(email).subscribe(
        res => {
          this.loggedInUser = res as User;




          const script = document.createElement('script');
          script.src = 'https://unpkg.com/@zegocloud/zego-uikit-prebuilt/zego-uikit-prebuilt.js';
          script.onload = () => {
            const roomID = new URLSearchParams(window.location.search).get('roomID') || (Math.floor(Math.random() * 10000) + "");
            // const userID = Math.floor(Math.random() * 10000) + "";
            const userID =this.loggedInUser.id
            // const userName = "userName" + userID;
            const userName= this.loggedInUser.username;
            const appID = 1743206546;
            const serverSecret = "d22f06a48a6c7401e10217c628784ce0";
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);

            const zp = ZegoUIKitPrebuilt.create(kitToken);
            zp.joinRoom({
              container: document.querySelector("#root"),
              sharedLinks: [{
                name: 'Personal link',
                url: window.location.protocol + '//' + window.location.host + window.location.pathname + '?roomID=' + roomID,
              }],
              scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference,
              },
              turnOnMicrophoneWhenJoining: false,
              turnOnCameraWhenJoining: false,
              showMyCameraToggleButton: true,
              showMyMicrophoneToggleButton: true,
              showAudioVideoSettingsButton: true,
              showScreenSharingButton: true,
              showTextChat: true,
              showUserList: true,
              maxUsers: 50,
              layout: "Sidebar",
              showLayoutButton: true,
            });
          };
          document.body.appendChild(script);
        },
        err => {
          console.log(err);

        }
      );
    }
    }

  }
