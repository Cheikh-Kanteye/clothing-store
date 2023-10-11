import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "@/components";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";

const Home = () => {
  const [currentUser, setUser] = useState<User | null>();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => setUser(user));
  }, []);
  return (
    <View>
      <Text>{currentUser?.email}</Text>
      <Button label="Sign out" onPress={() => signOut(auth)}></Button>
    </View>
  );
};

export default Home;
