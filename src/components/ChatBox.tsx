import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useTheme } from "../providers/ThemeProvider";
import { Text } from "react-native-paper";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import MyTextInput from "./MyTextInput";
import MyButton from "./MyButton";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

interface Chat {
  sender?: string;
  receiver?: string;
  message: string;
}

const socket = io(`${process.env.EXPO_PUBLIC_BACKEND_URL}/chat`);

export default function ChatBox({
  gameCode,
  currentPlayer,
}: {
  gameCode: string;
  currentPlayer: string;
}) {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const [chat, setChat] = useState<Chat[]>([]);
  const [message, setMessage] = useState("");
  const lastMessageRef = useRef<ScrollView>(null);
  const { height } = Dimensions.get("window");
  const [newMessage, setNewMessage] = useState(false);

  const bottomAnim = useSharedValue(-(height * 0.4));
  useEffect(() => {
    socket.emit("joinRoom", gameCode);
  }, [gameCode]);

  const handleSendMessage = () => {
    if (!message) {
      return;
    }

    setMessage("");
    setChat((prev) => [...prev, { sender: "Me", message }]);
    socket.emit("sendMessage", { message, sender: currentPlayer, gameCode });
    lastMessageRef.current?.scrollToEnd();
  };
  useEffect(() => {
    if (open) {
      setNewMessage(false);
    }
  }, [open, newMessage]);

  useEffect(() => {
    socket.on("newMessage", (data) => {
      if (data.sender !== currentPlayer) {
        setChat((prev) => [
          ...prev,
          { receiver: data.sender, message: data.message },
        ]);
        lastMessageRef.current?.scrollToEnd();
        setNewMessage(true);
      }
    });
    return () => {
      socket.off("newMessage");
    };
  }, [currentPlayer]);

  useEffect(() => {
    bottomAnim.value = withSpring(open ? 0 : -(height * 0.4));
  }, [open]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          bottom: bottomAnim,
        },
      ]}
    >
      <Pressable onPress={() => setOpen(!open)}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: theme === "dark" ? "#374151" : "#D1D5DB",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            cursor: "pointer",
            padding: 8,
            position: "relative",
          }}
        >
          <Text>Chat Room</Text>
          <Svg width="20px" height="20px" viewBox="0 0 24 24" fill="none">
            <Path
              d="M17.5 3C18.0523 2.99999 18.5 3.4477 18.5 3.99999L18.5001 15H21C21.4045 15 21.7691 15.2437 21.9239 15.6173C22.0787 15.991 21.9931 16.4211 21.7071 16.7071L17.7071 20.7071C17.3166 21.0977 16.6834 21.0977 16.2929 20.7071L12.2929 16.7071C12.0069 16.4211 11.9214 15.991 12.0761 15.6173C12.2309 15.2437 12.5956 15 13 15H15.5001L15.5 4.00002C15.5 3.44774 15.9477 3.00002 16.5 3.00001L17.5 3Z"
              fill={theme === "dark" ? "#ffffff" : "#000000"}
            />
            <Path
              d="M3.00003 9C2.59557 9 2.23093 8.75636 2.07615 8.38268C1.92137 8.00901 2.00692 7.57889 2.29292 7.29289L5.5 4.08582V4H5.58582L6.29292 3.29289C6.68345 2.90237 7.31661 2.90237 7.70714 3.29289L8.41424 4H8.5V4.08576L11.7071 7.29289C11.9931 7.57889 12.0787 8.00901 11.9239 8.38268C11.7691 8.75636 11.4045 9 11 9H8.5L8.5 20C8.5 20.5523 8.05229 21 7.5 21H6.5C5.94772 21 5.5 20.5523 5.5 20L5.5 9H3.00003Z"
              fill={theme === "dark" ? "#ffffff" : "#000000"}
            />
          </Svg>
          {newMessage && (
            <View
              style={{
                width: 10,
                height: 10,
                backgroundColor: "green",
                borderRadius: 50,
                position: "absolute",
                right: 0,
                top: 1,
              }}
            ></View>
          )}
        </View>
      </Pressable>
      <View
        style={{
          height: height * 0.4,
          width: "100%",
          padding: 20,
          backgroundColor: theme === "dark" ? "#374151" : "#D1D5DB",
        }}
      >
        <ScrollView
          style={{
            height: "80%",
            backgroundColor: theme === "dark" ? "#F3F4F6" : "#1F2937",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            padding: 8,
          }}
          contentContainerStyle={{
            paddingBottom: 10,
          }}
          ref={lastMessageRef}
        >
          {chat.map((eachChat, index) => (
            <View
              key={index}
              style={{
                padding: 4,
                marginTop: 4,
                backgroundColor: theme === "dark" ? "#374151" : "#D1D5DB",
                maxWidth: "60%",
                alignSelf: eachChat.sender === "Me" ? "flex-end" : "flex-start",
                borderRadius: 6,
              }}
            >
              <Text
                style={{
                  padding: 4,
                  color: theme === "dark" ? "white" : "black",
                }}
              >
                {eachChat.message}
              </Text>
            </View>
          ))}
        </ScrollView>
        <View
          style={{
            height: "20%",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <View style={{ flex: 0.7 }}>
            <MyTextInput
              label="Your message"
              text={message}
              setText={setMessage}
              multiLine
            />
          </View>
          <View style={{ flex: 0.3 }}>
            <MyButton title="SEND" onClick={handleSendMessage} />
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    // bottom: open ? 0 : -(height * 0.4),
    left: 0,
    width: "100%",
  },
});
