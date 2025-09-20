import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUpScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <Text>Hello world</Text>
      <Button
        title="Quay lai"
        onPress={() => {
          navigation.navigate("Login");
        }}
      />
    </SafeAreaView>
  );
};
export default SignUpScreen;
