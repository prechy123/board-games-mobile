import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import { Button } from "react-native-paper";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

export default function MyButton({
  title,
  link,
  onClick
}: {
  title: string;
  link?: string;
  onClick?: (() => void) | any
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
      return
    }
    onClick()
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
    >
      <Animated.View style={[{ transform: [{ scale }] }]}>
        <Button mode="contained" style={{padding: 5}}>
          {title}
        </Button>
      </Animated.View>
    </Pressable>
  );
}
