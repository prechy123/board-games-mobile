import { useRouter } from "expo-router";
import { Button } from "react-native-paper";

export default function HomeButton({
  title,
  link,
}: {
  title: string;
  link: "/" | "/tic-tac-toe";
}) {
  const router = useRouter();
  return (
    <Button mode="contained" onPress={() => router.push(link)} style={{padding: 5}}>
      {title}
    </Button>
  );
}
