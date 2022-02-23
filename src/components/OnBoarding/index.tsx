import { useState, useRef } from "react";
import { View, FlatList, StyleSheet, Animated, Alert } from "react-native";
import { OnBoardingItem } from "../OnBoardingItem";
import { Paginator } from "../Paginator";
import { ISlices } from "./IProps";
import { Images } from "../../../assets";
import { IProps } from "./IProps";
import { useUser } from "../../context";

export const OnBoarding = ({ navProps }: IProps): JSX.Element => {
  const [state, setState] = useState({
    dni: "",
    name: "",
    lastname: "",
    password: "",
  });

  const { signup, user } = useUser();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useRef((viewable: any) => {
    setCurrentIndex(viewable.viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const sliderRef = useRef(null);

  const scrollTo = (): void => {
    if (currentIndex < slices.length - 1) {
      if (sliderRef.current) {
        sliderRef.current.scrollToIndex({ index: currentIndex + 1 });
      } else alert("reach limit");
    }
  };

  const slices: ISlices[] = [
    {
      id: "0",
      image: Images.dni,
      title: "Cédula de identidad",
      end: false,
      text: "",
      inputs: [
        {
          value: state.dni,
          placeholder: "Cédula de identidad",
          type: "numeric",
          onChangeText: (text) => {
            setState({
              ...state,
              dni: text,
            });
          },
        },
      ],
    },
    {
      id: "1",
      image: Images.name,
      title: "Nombre y Apellido",
      text: "",
      end: false,
      inputs: [
        {
          value: state.name,
          placeholder: "Nombre",
          type: "default",
          onChangeText: (text) => {
            setState({
              ...state,
              name: text,
            });
          },
        },
        {
          value: state.lastname,
          placeholder: "Apellido",
          type: "default",
          onChangeText: (text) => {
            setState({
              ...state,
              lastname: text,
            });
          },
        },
      ],
    },
    {
      id: "2",
      image: Images.password,
      title: "Contraseña",
      text: "",
      inputs: [
        {
          value: state.password,
          placeholder: "Contraseña",
          secure: true,
          type: "default",
          onChangeText: (text) => {
            setState({
              ...state,
              password: text,
            });
          },
        },
      ],
      end: true,
    },
  ];

  const onFinishCallback = async (): Promise<void> => {
    try {
      await signup(
        parseInt(state.dni),
        state.name,
        state.lastname,
        state.password
      ).then((res) => {
        alert(res);
        navProps.navigation.navigate("Login");
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Paginator data={slices} scrollX={scrollX} />
      <FlatList
        data={slices}
        renderItem={({ item }) => (
          <OnBoardingItem
            key={item.id}
            id={item.id}
            title={item.title}
            text={item.text}
            inputs={item.inputs}
            image={item.image}
            scrollTo={scrollTo}
            end={item.end}
            onFinishCallback={onFinishCallback}
          />
        )}
        ref={sliderRef}
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        keyExtractor={(item) => item.id}
        viewabilityConfig={viewConfig}
        onViewableItemsChanged={viewableItemsChanged}
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
