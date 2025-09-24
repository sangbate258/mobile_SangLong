import { Checkbox } from "@futurejj/react-native-checkbox";
import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";

import {
  Alert,
  Button,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [error, setError] = useState({});
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  //function
  const validateForm = () => {
    const newError = {}; //tạo 1 đối tượng mới để gán vô setError
    if (!email) {
      newError.email = "Email không được bỏ trống";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newError.email = "Email không hợp lệ";
    }
    if (!password) {
      newError.password = "Password không được bỏ trống";
    } else if (password.length < 6) {
      newError.password = "Password không được dưới 6 ký tự";
    }
    setError(newError);
    
    return Object.keys(newError).length === 0;
  };

  const toggleCheckbox = () => {
    setKeepSignedIn(!keepSignedIn);
  };
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        {/* header */}
        <View>
          <Text style={styles.textHeader}>Mobile APP</Text>
        </View>
        {/* body */}
        <View>
          <View style={styles.bodyHeader}>
            <Text style={{ fontSize: 40, fontWeight: 600 }}>Login</Text>
            <Text style={{ fontSize: 20, opacity: 0.5 }}>
              Welcome Back To The App
            </Text>
          </View>
          {/* form */}
          <View>
            <View style={styles.gapInput}>
              <Text style={styles.lableName}>Email</Text>
              <TextInput
                ref={emailRef}
                style={[styles.textInput, error.email && styles.inputError]}
                placeholder="hello@example.com"
                value={email}
                onChangeText={(value) => setEmail(value)}
                placeholderTextColor={"#aaa"}
                autoFocus={()=>error.email}
              />
              {error.email && (
                <View style={styles.errorRow}>
                  <MaterialIcons name="error" size={24} color="red" />
                  <Text style={{ color: "red", fontSize: 14 }}>
                    {error.email}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.gapInput}>
              <View style={styles.textPassword}>
                <Text style={styles.lableName}>Password</Text>
                <Pressable
                  style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
                >
                  <Text style={{ color: "#007AFF" }}>Forgot Password?</Text>
                </Pressable>
              </View>
              <TextInput
                style={[styles.textInput, error.password && styles.inputError]}
                placeholder="***************"
                placeholderTextColor={"#aaa"}
                value={password}
                onChangeText={(value) => {
                  setPassword(value);
                }}
                secureTextEntry
              />

              {error.password && (
                <View style={styles.errorRow}>
                  <MaterialIcons name="error" size={24} color="red" />
                  <Text style={{ color: "red", fontSize: 14 }}>
                    {error.password}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
        {/* footer */}
        <View>
          <Pressable onPress={toggleCheckbox} style={styles.keepSignedInGroup}>
            <Checkbox
              status={keepSignedIn ? "checked" : "unchecked"}
              onPress={toggleCheckbox}
            />
            <Text>Keep me signed in</Text>
          </Pressable>
          <View style={styles.viewButtonLogin}>
            <Pressable
              style={({ pressed }) => [
                styles.buttonLogin,
                { backgroundColor: pressed ? "#005BBB" : "#007AFF" },
              ]}
              onPress={() => {
                if (validateForm()) Alert.alert("ok");
                else Alert.alert("not");
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>Login</Text>
            </Pressable>
            <Text style={{ textAlign: "center", opacity: 0.3 }}>
              or sign in with
            </Text>
            <Pressable
              style={({ pressed }) => [
                styles.buttonLogin,
                { backgroundColor: pressed ? "#CCCCCC" : "#DDDDDD" },
              ]}
              onPress={() => {
                Alert.alert(password);
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Login with Google
              </Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
            >
              <Pressable onPress={() => navigation.navigate("SignUp")}>
                <Text style={{ textAlign: "center" }}>Create an account</Text>
              </Pressable>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 25,
  },
  textHeader: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 20,
  },
  checkBox: {
    borderWidth: 1,
    height: 20,
    width: 20,
  },
  bodyHeader: {
    marginBottom: 30,
  },
  lableName: {
    fontSize: 20,
    fontWeight: 500,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 10,
  },
  textPassword: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  gapInput: {
    gap: 10,
    marginBottom: 25,
  },

  keepSignedInGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonLogin: {
    borderRadius: 20,
    padding: 13,
  },
  viewButtonLogin: {
    gap: 20,
  },
  inputError: {
    borderColor: "red",
  },
  errorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
