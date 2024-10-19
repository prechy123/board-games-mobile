import { useRouter } from "expo-router";
import { Button } from "react-native-paper";

export default function MyButton({
  title,
  link,
}: {
  title: string;
  link?: string;
}) {
  const router = useRouter();
  if (!link) {
    return (
      <Button
        mode="contained"
        style={{ padding: 5 }}
      >
        {title}
      </Button>
    );
  }
  return (
    <Button
      mode="contained"
      onPress={() => router.push(link)}
      style={{ padding: 5 }}
    >
      {title}
    </Button>
  );
}
