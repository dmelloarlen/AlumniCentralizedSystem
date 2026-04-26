import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import pkg from "@zegocloud/zego-uikit-prebuilt";
import axios from "axios";

const { ZegoUIKitPrebuilt } = pkg;
const SERVER_SECERATE = import.meta.env.VITE_ZEGO_SERVER_SECERATE;
const APP_ID = import.meta.env.VITE_ZEGO_APP_ID;
const BASE_URL = import.meta.env.VITE_API_BASE_URL


function VideoRoom() {
  const meetingRef = useRef(null);
  const hasJoined = useRef(false);
  
  const { roomId } = useParams();
  const appID = parseInt(APP_ID);
  const serverSecret = SERVER_SECERATE;

  useEffect(() => {
    if (hasJoined.current) return;
    hasJoined.current = true;

    const initMeeting = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${BASE_URL}/meetings/access/${roomId}`,
          {
            headers: {
              Authorization: token,
            },
          },
        );

        const { roomId: actualRoomId, userID, userName } = res.data;


        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          actualRoomId,
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
      } catch (err) {
        console.log("Error starting meeting:", err);
      }
    };

    initMeeting();
  }, [roomId]);

  return <div ref={meetingRef} style={{ width: "100%", height: "100vh" }} />;
}

export default VideoRoom;
