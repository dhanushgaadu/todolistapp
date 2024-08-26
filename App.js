import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function App() {
  const [task, onChangeText] = useState("");
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    AsyncStorage.getItem("tasks").then((data) => {
      if (data) {
        setTasks(JSON.parse(data));
      }
    });
    setTasks([...tasks]);
  }, []);
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("tasks", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    storeData(tasks);
  }, [tasks]);
  const addTask = (text) => {
    if (text === "") {
      return;
    }
    if (tasks.includes(text)) {
      return;
    }
    onChangeText("");
    setTasks([...tasks, text]);
  };
  const removeTask = (index) => {
    let newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
      <TextInput
        style={styles.inp}
        placeholder="enter a task:"
        value={task}
        onChangeText={onChangeText}      
        />
      <Button
        title="Add Task"
        style={styles.mainbtn}
        onPress={() => addTask(task)}
      />
      </View>
      <View style={styles.elements}>
        <Text style={styles.head}>Tasks:</Text>{tasks.map((task, index) => (
          <View style={styles.task}>
            <Text key={index}>{task}</Text>
            <Button
              title="done"
              onPress={() => removeTask(index)}
            />
          </View>
        ))}
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 27,
  },
  elements: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  head: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  inp: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    margin: 10,
    width: "70%",
  },
  task: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    backgroundColor: "#f0f0f0",
    margin: 5,
  },
  mainbtn: {
    width: "30%",
    padding: 10,
  },
});