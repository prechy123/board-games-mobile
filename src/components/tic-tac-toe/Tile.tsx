import { useTheme } from "@/src/providers/ThemeProvider";
import { Pressable, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import Svg, { Circle, Line } from "react-native-svg";

interface Prop {
  value: string;
  handleClick: () => void;
}

export default function Tile({ value, handleClick }: Prop) {
  const { theme } = useTheme();
  const scale = useSharedValue(1);
  const styles = StyleSheet.create({
    tile: {
      width: 64,
      height: 64,
      backgroundColor: theme === "dark" ? "#fff" : "#000",
    },
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.8);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };
  return (
    <Pressable
      onPress={handleClick}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={{...styles.tile, transform: [{scale}]}}>
        {value === "-" ? (
          <Text>{value}</Text>
        ) : (
          <Svg width="100%" height="100%" viewBox="0 0 300 300">
            {value === "O" ? (
              <Circle
                cx="150"
                cy="150"
                r="80"
                stroke="#3b82f6"
                strokeWidth={10}
                strokeLinecap="round"
                fill="transparent"
              />
            ) : (
              <>
                <Line
                  x1="75"
                  y1="75"
                  x2="225"
                  y2="225"
                  stroke="#ec4899"
                  strokeWidth={10}
                  strokeLinecap="round"
                  fill="transparent"
                />
                <Line
                  x1="75"
                  y1="225"
                  x2="225"
                  y2="75"
                  stroke="#ec4899"
                  strokeWidth={10}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </>
            )}
          </Svg>
        )}
      </Animated.View>
    </Pressable>
  );
}
