import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  Image,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import COLORS from "../config/colors";
import SPACING from "../config/spacing";
import advisorsData from "../config/data";

const FinancialAdvisingScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [analysisResult, setAnalysisResult] = useState("");

  // Function to handle the analysis button press
  const handleAnalyze = (household) => {
    // Simulate an API request to Lambda function
    fetch(
      "https://msch8xes52.execute-api.us-west-2.amazonaws.com/prod/calculate-tax",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          familyName: household.FamilyName,
          description: household.description,
          combinedIncome: household.CombinedIncome,
          state: household.State,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setAnalysisResult(data.summary); // Assuming the response contains 'summary'
        setIsModalVisible(true); // Show the modal
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <ScrollView>
      <ImageBackground
        source={require("../assets/images/LPL-Logo.png")}
        style={{ width: "100%", height: 500 }}
      >
        <SafeAreaView>
          <View
            style={{
              paddingHorizontal: SPACING,
              justifyContent: "space-between",
              flexDirection: "row",
              height: "100%",
            }}
          ></View>
        </SafeAreaView>
      </ImageBackground>

      <View
        style={{
          backgroundColor: COLORS.white,
          padding: SPACING * 2,
          borderRadius: SPACING * 3,
          bottom: SPACING * 3,
        }}
      >
        <Text
          style={{
            fontSize: SPACING * 2,
            fontWeight: "bold",
            color: COLORS.dark,
            marginBottom: SPACING * 2,
          }}
        >
          Browse Household Finances
        </Text>

        {/* Render the household data */}
        {advisorsData.map((household, index) => (
          <View key={index} style={{ marginBottom: SPACING * 3 }}>
            <View style={{ flexDirection: "row", marginBottom: SPACING }}>
              <Image
                source={household.image}
                style={{
                  width: SPACING * 6,
                  height: SPACING * 6,
                  borderRadius: SPACING * 3,
                  marginRight: SPACING,
                  borderWidth: 1,
                  borderColor: COLORS.primary,
                }}
              />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: SPACING * 1.6,
                    fontWeight: "700",
                  }}
                >
                  {household.FamilyName}
                </Text>

                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.blue || "#10427A",
                    paddingVertical: SPACING / 2,
                    paddingHorizontal: SPACING * 2,
                    borderRadius: SPACING * 2,
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: SPACING,
                  }}
                  onPress={() => handleAnalyze(household)} // On button press, trigger the analysis
                >
                  <Text
                    style={{
                      color: COLORS.white,
                      fontSize: SPACING * 1.6,
                      fontWeight: "600",
                    }}
                  >
                    Analyze
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={{ color: COLORS.dark }}>{household.description}</Text>
          </View>
        ))}

        {/* Modal to display the result */}
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View
              style={{
                width: "80%",
                padding: SPACING * 2,
                backgroundColor: COLORS.white,
                borderRadius: SPACING * 2,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: SPACING * 2,
                  fontWeight: "bold",
                  color: COLORS.dark,
                  marginBottom: SPACING,
                }}
              >
                Household Analysis
              </Text>
              <Text style={{ color: COLORS.dark, textAlign: "center" }}>
                {analysisResult || "Loading..."}
              </Text>

              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={{
                  marginTop: SPACING * 2,
                  backgroundColor: COLORS.blue || "#10427A",
                  paddingVertical: SPACING / 2,
                  paddingHorizontal: SPACING * 2,
                  borderRadius: SPACING * 2,
                }}
              >
                <Text style={{ color: COLORS.white, fontWeight: "600" }}>
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default FinancialAdvisingScreen;
