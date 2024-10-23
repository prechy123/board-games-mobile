import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import { Button } from "react-native-paper";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

export default function MyButton({
  title,
  link,
  onClick,
}: {
  title: string;
  link?: string;
  onClick?: (() => void) | any;
}) {
  const router = useRouter();
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.9);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const handlePress = () => {
    if (link) {
      router.push(link);
      return;
    }
    onClick();
  };

  if (title === "SEND") {
    return (
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
      >
        <Animated.View style={[{ transform: [{ scale }] }]}>
          <Button mode="contained" style={{ padding: 5 }}>
              <Svg
                height={15}
                width={15}
                rotation={90}
                fill="white"
                viewBox="0 0 18 20"
              >
                <Path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
              </Svg>
          </Button>
        </Animated.View>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
    >
      <Animated.View style={[{ transform: [{ scale }] }]}>
        <Button mode="contained" style={{ padding: 5 }}>
          {title}
        </Button>
      </Animated.View>
    </Pressable>
  );
}
