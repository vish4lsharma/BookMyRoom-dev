import React, { useState, useEffect } from "react";
import { View, Pressable, Keyboard,Text } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Slider from "@react-native-community/slider";

import StepProgress from "../../components/becomeHost/common/StepProgress";
import StepFooter from "../../components/becomeHost/common/StepFooter";

import stepStyles from "../../styles/stepStyles";

import WeekendHeader from "../../components/becomeHost/price/WeekendHeader";
import WeekendPriceDisplay from "../../components/becomeHost/price/WeekendPriceDisplay";
import WeekendIncreaseControl from "../../components/becomeHost/price/WeekendIncreaseControl";

export default function PriceWeekend() {
  const router = useRouter();
  const { weekdayPrice } = useLocalSearchParams();

  const base = weekdayPrice ? parseInt(weekdayPrice.replace(/,/g, ""), 10) : 1769;

  const [increasePercent, setIncreasePercent] = useState(1);
  const [weekendPrice, setWeekendPrice] = useState(base);

  useEffect(() => {
    const newPrice = base + (base * increasePercent) / 100;
    setWeekendPrice(Math.round(newPrice));
  }, [increasePercent]);

  return (
    <Pressable style={stepStyles.container} onPress={Keyboard.dismiss}>
      <View style={stepStyles.pageWrapper}>

        <View>
          <WeekendHeader />
          <WeekendPriceDisplay weekendPrice={weekendPrice} />

          <WeekendIncreaseControl
            increasePercent={increasePercent}
            setIncreasePercent={setIncreasePercent}
          />

          <Slider
            style={{ width: "100%", height: 42 }}
            minimumValue={0}
            maximumValue={99}
            step={1}
            value={increasePercent}
            onValueChange={setIncreasePercent}
            minimumTrackTintColor="#111"
            maximumTrackTintColor="#ccc"
            thumbTintColor="#111"
          />

          <View style={stepStyles.sliderLabels}>
            <Text style={stepStyles.sliderText}>0%</Text>
            <Text style={stepStyles.sliderText}>99%</Text>
          </View>
        </View>

        <View>
          <StepProgress active={10} total={12} />
          <StepFooter
            onBack={() => router.back("")}
            onNext={() =>
              router.push({
                pathname: "/become-host/special-offers",
                params: { weekdayPrice, weekendPrice },
              })
            }
          />
        </View>

      </View>
    </Pressable>
  );
}
