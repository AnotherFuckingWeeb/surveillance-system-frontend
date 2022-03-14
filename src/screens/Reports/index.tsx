import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { NavigationProps } from "../../Route/types";
import { StatusBar } from "expo-status-bar";
import { Images } from "../../../assets";
import { ElementLink } from "../../components/ElementLink";
import { Loading } from "../../components/Loading";
import { EmptyPlaceholder } from "../../components/EmptyPlaceholder";
import { GetReports, GetReportsByUid } from "../../../axios";
import { useUser } from "../../context";
import { IState } from "./IState";
import { styles } from "./styles";

export const Reports = ({ route, navigation }: NavigationProps<"Reports">) => {
  const [state, setState] = useState<IState>({
    reports: [],
    loading: true,
  });

  const { user } = useUser();

  const onGetReports = async (): Promise<void> => {
    setState({ ...state, loading: true });
    try {
      await GetReports().then((reports) => {
        setState({
          ...state,
          reports,
          loading: false,
        });
      });
    } catch (error) {
      console.error(error);
      setState({ ...state, loading: false });
    }
  };

  const onGetReportsByUid = async (): Promise<void> => {
    setState({ ...state, loading: true });

    try {
      await GetReportsByUid(user.id).then((reports) => {
        setState({
          ...state,
          reports,
          loading: false,
        });
      });
    } catch (error) {
      console.error(error);
      setState({ ...state, loading: false });
    }
  };

  const ReportList = (): JSX.Element => {
    return (
      <View>
        <Text style={{ fontSize: 28, color: "white" }}>Reportes</Text>
        <ScrollView>
          {state.reports.map((report, index) => {
            return (
              <ElementLink
                key={index}
                image={Images.user}
                header={report.CreatedBy}
                subHeader={report.CreatedAt}
                onPress={() => navigation.navigate("Report", { id: report.ID })}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  };

  useEffect(() => {
    if (user.role === 1) {
      onGetReports();
    } else {
      onGetReportsByUid();
    }
  }, []);

  return (
    <View style={styles.container}>
      {state.loading && <Loading />}
      {state.reports ? (
        <ReportList />
      ) : (
        <EmptyPlaceholder text="No hay reportes disponibles" />
      )}
      <StatusBar animated backgroundColor="#23396F" />
    </View>
  );
};
