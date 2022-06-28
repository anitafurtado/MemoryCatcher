import React from "react";
import renderer from "react-test-renderer";
import LoginScreen from "./screens/Login/LoginScreen";
import AppMemoryCard from "./components/AppMemoryCard";
import { render, fireEvent } from '@testing-library/react-native';

//1. Style Test

test("Correct AppMemoryCard style", () => {
  const json = renderer.create(
    <AppMemoryCard
      title="Memory Title"
      category="Memory Category"
      date="Memory date"
      location="Memory location"
      image="Memory image"
      onPress={() => {
        console.log("onPress Function");
      }}
    />
  ).toJSON();

  //container
  expect(json.children[0].props.style.backgroundColor).toBe("#C397BB");
  expect(json.children[0].props.style.margin).toBe(10);
  expect(json.children[0].props.style.borderRadius).toBe(5);
  expect(json.children[0].props.style.borderWidth).toBe(1);

  //Top Text
  expect(json.children[0].children[0].props.style.flexDirection).toBe("row");
  expect(json.children[0].children[0].props.style.justifyContent).toBe("space-between");
  expect(json.children[0].children[0].props.style.padding).toBe(5);

  // Image
  expect(json.children[0].children[1].props.style.width).toBe(250);
  expect(json.children[0].children[1].props.style.height).toBe(150);
  expect(json.children[0].children[1].props.style.alignSelf).toBe("center");
  
  //Bottom Text
  expect(json.children[0].children[2].props.style.flexDirection).toBe("row");
  expect(json.children[0].children[2].props.style.justifyContent).toBe("space-between");
  expect(json.children[0].children[2].props.style.padding).toBe(5);

  //App Text for Date
  expect(json.children[0].children[0].children[0].props.style[0].fontFamily).toBe("Arial");
  expect(json.children[0].children[0].children[0].props.style[0].fontSize).toBe(18);

  //App Text for Category
  expect(json.children[0].children[0].children[1].props.style[0].fontFamily).toBe("Arial");
  expect(json.children[0].children[0].children[1].props.style[0].fontSize).toBe(18);

  //App Text for Title
  expect(json.children[0].children[2].children[0].props.style[0].fontFamily).toBe("Arial");
  expect(json.children[0].children[2].children[0].props.style[0].fontSize).toBe(18);

  //App Text for Location
  expect(json.children[0].children[2].children[1].props.style[0].fontFamily).toBe("Arial");
  expect(json.children[0].children[2].children[1].props.style[0].fontSize).toBe(18);
});

//2. Snapshot Tests

test("AppMemoryCard with no props renders correctly", () => {
  const tree = renderer.create(<AppMemoryCard />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("AppMemoryCard with all props but no onPress function renders correctly", () => {
  const tree = renderer.create(
    <AppMemoryCard
      title="Memory Title"
      category="Memory Category"
      date="Memory date"
      location="Memory location"
      image="Memory image"
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test("AppMemoryCard with all props renders correctly", () => {
  const tree = renderer.create(
    <AppMemoryCard
      title="Memory Title"
      category="Memory Category"
      date="Memory date"
      location="Memory location"
      image="Memory image"
      onPress={() => {
        console.log("onPress Function");
      }}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Login Screen renders correctly", () => {
  const navigation = { navigate: jest.fn() };
  const route = { params: jest.fn() };
  const tree = renderer.create(
    <LoginScreen 
      navigation={navigation} 
      route={route} 
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

//3. Other Login Screen Components

test("Empty Register Message when user has not Registered first", () => {
  const navigation = { navigate: jest.fn() };
  const route = { params: jest.fn() };
  const json = renderer.create(
    <LoginScreen 
      navigation={navigation} 
      route={route} 
    />
  ).toJSON();
  expect(json.children[0].children).toBe(null);
});

test("Header text for Login Screen", () => {
  const navigation = { navigate: jest.fn() };
  const route = { params: jest.fn() };
  const json = renderer.create(
    <LoginScreen 
      navigation={navigation} 
      route={route} 
    />
  ).toJSON();
  expect(json.children[1].children[0].children.includes("Please Enter Your Login Details:"));
  expect(json.children[1].children[0].props.style[0].fontFamily).toBe("Arial");
  expect(json.children[1].children[0].props.style[0].fontSize).toBe(18);
});

test("Formik Text Input for Email", () => {
  const navigation = { navigate: jest.fn() };
  const route = { params: jest.fn() };
  const json = renderer.create(
    <LoginScreen 
      navigation={navigation} 
      route={route} 
    />
  ).toJSON();
  expect(json.children[1].children[1].children[0].props.placeholder).toBe("Email");
  expect(json.children[1].children[1].children[0].props.autoCapitalize).toBe("none");
  expect(json.children[1].children[1].children[0].props.autoCorrect).toBe(false);
  expect(json.children[1].children[1].children[0].props.keyboardType).toBe("email-address");

});

test("Formik Text Input for Password", () => {
  const navigation = { navigate: jest.fn() };
  const route = { params: jest.fn() };
  const json = renderer.create(
    <LoginScreen 
      navigation={navigation} 
      route={route} 
    />
  ).toJSON();
  expect(json.children[1].children[1].children[1].props.placeholder).toBe("Password");
  expect(json.children[1].children[1].children[1].props.autoCapitalize).toBe("none");
  expect(json.children[1].children[1].children[1].props.autoCorrect).toBe(false);
  expect(json.children[1].children[1].children[1].props.secureTextEntry).toBe(true);

});

test("Login AppButton", () => {
  const navigation = { navigate: jest.fn() };
  const route = { params: jest.fn() };
  const json = renderer.create(
    <LoginScreen 
      navigation={navigation} 
      route={route} 
    />
  ).toJSON();
  expect(json.children[1].children[1].children[2].children[0].children[0].children.includes("Login"));  

});