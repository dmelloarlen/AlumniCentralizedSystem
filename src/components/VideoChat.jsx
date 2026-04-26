import { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function VideoChat() {
  const meetingRef = useRef(null);
  const hasJoined = useRef(false);
  useEffect(() => {
    if (hasJoined.current) return;
    hasJoined.current = true;

    const initMeeting = async () => {
      const appID = 493277131;
      const serverSecret = "1713726f645a1a1b9adf3a3f7e5b0be8";

      const roomID = "testroom";
      const userID = String(Math.floor(Math.random() * 10000));
      const userName = "user" + userID;

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        userID,
        userName,
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);

      zp.joinRoom({
        container: meetingRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
        turnOnCameraWhenJoining: true,
        turnOnMicrophoneWhenJoining: false,
      });
    };

    initMeeting();
  }, []);

  return <div ref={meetingRef} style={{ width: "100%", height: "100vh" }} />;
}

export default VideoChat;
