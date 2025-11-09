import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function Home() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [showWhenCard, setShowWhenCard] = useState(false);
  const [showWhoCard, setShowWhoCard] = useState(false);
  const [activeTab, setActiveTab] = useState("Dates");

  // Single selections (kept for compatibility)
  const [selectedDate, setSelectedDate] = useState(null);
  const [flexibleHours, setFlexibleHours] = useState(3);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  // Range states
  const [dateStart, setDateStart] = useState(null);   // { month: 'September 2025', day: 1 }
  const [dateEnd, setDateEnd] = useState(null);
  const [monthStart, setMonthStart] = useState(null); // 'September'
  const [monthEnd, setMonthEnd] = useState(null);
  const [yearStart, setYearStart] = useState(null);   // 2025
  const [yearEnd, setYearEnd] = useState(null);
  const [flexStart, setFlexStart] = useState(1);
  const [flexEnd, setFlexEnd] = useState(3);

  // Who grid counts
  const [adults, setAdults] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);

  // Generate days starting Sep 2025, then all remaining months (Nov–Dec 2025) and full 2026
  const generateDays = () => {
    const build = (year, monthIndex, monthLabel) => {
      const days = new Date(year, monthIndex + 1, 0).getDate();
      return {
        name: `${monthLabel} ${year}`,
        days,
        daysArray: Array.from({ length: days }, (_, i) => i + 1),
      };
    };

    const list = [];

    // Fixed starting months
    list.push(build(2025, 8, "September")); // 8 = September
    list.push(build(2025, 9, "October"));   // 9 = October

    // Append remaining months of 2025
    list.push(build(2025, 10, "November"));
    list.push(build(2025, 11, "December"));

    // Append all months of 2026
    for (let m = 0; m < 12; m++) {
      list.push(build(2026, m, [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
      ][m]));
    }

    return list;
  };
  const monthsData = generateDays();

  // Months
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Years
  const currentYear = new Date().getFullYear();
  const yearsData = Array.from({ length: 12 }, (_, i) => currentYear + i);

  // Helpers for range logic
  const ensureOrdered = (a, b) => (a <= b ? [a, b] : [b, a]);

  const toggleRange = (start, end, nextValue, setStart, setEnd) => {
    if (start == null && end == null) {
      setStart(nextValue);
      return;
    }
    if (start != null && end == null) {
      setEnd(nextValue);
      return;
    }
    // reset and start new range
    setStart(nextValue);
    setEnd(null);
  };

  // Convert month label to index for comparisons
  const monthLabelToIndex = (label) => monthNames.indexOf(label.split(" ")[0]);

  // Find index of monthsData by full month label like "September 2025"
  const calendarMonthToIndex = (fullLabel) =>
    monthsData.findIndex((m) => m.name === fullLabel);

  const inCalendarRange = (monthLabel, day) => {
    if (!dateStart) return false;
    const curIdx = calendarMonthToIndex(monthLabel);
    const startIdx = calendarMonthToIndex(dateStart?.month);
    const endIdx = dateEnd ? calendarMonthToIndex(dateEnd?.month) : startIdx;
    if (curIdx < 0 || startIdx < 0 || endIdx < 0) return false;

    const [lowIdx, highIdx] = ensureOrdered(startIdx, endIdx);

    if (curIdx < lowIdx || curIdx > highIdx) return false;

    if (lowIdx === highIdx) {
      const [sDay, eDay] = ensureOrdered(
        dateStart.day,
        dateEnd ? dateEnd.day : dateStart.day
      );
      return curIdx === lowIdx && day >= sDay && day <= eDay;
    }

    if (curIdx === startIdx) return day >= dateStart.day;
    if (curIdx === endIdx) return day <= (dateEnd ? dateEnd.day : dateStart.day);
    return true;
  };

  const inMonthRange = (label) => {
    if (!monthStart) return false;
    const idx = monthLabelToIndex(label);
    const s = monthLabelToIndex(monthStart);
    const e = monthEnd != null ? monthLabelToIndex(monthEnd) : s;
    if (idx < 0 || s < 0 || e < 0) return false;
    const [lo, hi] = ensureOrdered(s, e);
    return idx >= lo && idx <= hi;
  };

  const inYearRange = (y) => {
    if (yearStart == null) return false;
    const s = yearStart;
    const e = yearEnd ?? yearStart;
    const [lo, hi] = ensureOrdered(s, e);
    return y >= lo && y <= hi;
  };

  // NEW: block past dates (compares against today's date)
  const isPastCalendarCell = (monthLabel, day) => {
    // monthLabel example: "September 2025"
    const [monthName, yearStr] = monthLabel.split(" ");
    const monthIndex = monthNames.indexOf(monthName); // 0-based
    const yearNum = parseInt(yearStr, 10);

    if (isNaN(yearNum) || monthIndex < 0) return false;

    const cellDate = new Date(yearNum, monthIndex, day, 0, 0, 0, 0);
    const now = new Date();
    // normalize today's midnight for accurate “past” test
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);

    return cellDate < today;
  };
const handleNext = () => {
  if (!location) {
    alert("Please enter a location.");
    return;
  }
  if (activeTab === "Dates" && !selectedDate && !dateStart) {
    alert("Please select a date or range.");
    return;
  }
  if (activeTab === "Months" && !selectedMonth && !monthStart) {
    alert("Please select a month or range.");
    return;
  }
  if (activeTab === "Year" && !selectedYear && !yearStart) {
    alert("Please select a year or range.");
    return;
  }
  if (activeTab === "Flexible" && (flexStart == null || flexEnd == null)) {
    alert("Please select hours.");
    return;
  }

  // Build label values from current selections
  const city = location.trim() || "Bareilly";
  const dateLabel = (() => {
    if (activeTab === "Flexible") return `${flexStart}-${flexEnd} hrs`;
    if (dateStart) {
      const toLabel = (d) => `${d.month.split(" ")[0]} ${d.day}`;
      return dateEnd ? `${toLabel(dateStart)} - ${toLabel(dateEnd)}` : `${toLabel(dateStart)}`;
    }
    if (selectedMonth || monthStart) {
      return monthEnd ? `${monthStart} - ${monthEnd}` : `${monthStart || selectedMonth}`;
    }
    if (selectedYear || yearStart) {
      return yearEnd ? `${yearStart} - ${yearEnd}` : `${yearStart || selectedYear}`;
    }
    return "Dates";
  })();

  const guests = (() => {
    const parts = [];
    if (adults > 0) parts.push(`${adults} Adult${adults > 1 ? "s" : ""}`);
    if (childrenCount > 0) parts.push(`${childrenCount} Child${childrenCount > 1 ? "ren" : ""}`);
    if (infants > 0) parts.push(`${infants} Infant${infants > 1 ? "s" : ""}`);
    if (pets > 0) parts.push(`${pets} Pet${pets > 1 ? "s" : ""}`);
    return parts.join(", ") || "Add Adults";
  })();

  // Navigate to results list (app/results/index.jsx)
  router.push({
    pathname: "/results",
    params: {
      city,
      start: dateLabel.split(" - ")[0] || "",
      end: dateLabel.split(" - ")[1] || "",
      guests,
    },
  });
};


  const handleReset = () => {
    setLocation("");
    setSelectedDate(null);
    setFlexibleHours(3);
    setSelectedMonth(null);
    setSelectedYear(null);
    setActiveTab("Dates");
    setShowWhenCard(false);
    setShowWhoCard(false);

    setDateStart(null);
    setDateEnd(null);
    setMonthStart(null);
    setMonthEnd(null);
    setYearStart(null);
    setYearEnd(null);
    setFlexStart(1);
    setFlexEnd(3);

    setAdults(0);
    setChildrenCount(0);
    setInfants(0);
    setPets(0);
  };

  // Data + renderer for the single card list (removes ScrollView + nested FlatLists)
  const cardData = useMemo(() => {
    if (activeTab === "Dates") return monthsData;        // [{name, daysArray}]
    if (activeTab === "Months") return monthNames;       // ["Jan", ...]
    if (activeTab === "Year") return yearsData;          // [2025, ...]
    return ["Flexible"];                                 // sentinel single item
  }, [activeTab, monthsData, monthNames, yearsData]);

  const renderCardItem = ({ item }) => {
    if (activeTab === "Dates") {
      // item is a month block
      return (
        <View style={styles.monthContainer}>
          <Text style={styles.monthTitle}>{item.name}</Text>
          <View style={styles.daysGrid}>
            {item.daysArray.map((day) => {
              const isPast = isPastCalendarCell(item.name, day);
              const isInRange = !isPast && inCalendarRange(item.name, day);
              const isSelected = selectedDate === `${item.name}-${day}`;
              return (
                <TouchableOpacity
                  key={day}
                  activeOpacity={isPast ? 1 : 0.2}
                  style={[
                    styles.dayBox,
                    (isSelected || isInRange) && styles.selectedDay,
                    isPast && { opacity: 0.35 }, // visual hint only
                  ]}
                  onPress={() => {
                    if (isPast) return; // block past selections
                    const key = `${item.name}-${day}`;
                    setSelectedDate(key);
                    toggleRange(
                      dateStart,
                      dateEnd,
                      { month: item.name, day },
                      setDateStart,
                      setDateEnd
                    );
                  }}
                >
                  <Text
                    style={[
                      styles.dayText,
                      (isSelected || isInRange) && styles.selectedDayText,
                    ]}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      );
    }

    if (activeTab === "Months") {
      // Render two-column grid without another FlatList
      return (
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <MonthBox
            label={item}
            isActive={selectedMonth === item || inMonthRange(item)}
            onPress={() => {
              setSelectedMonth(item);
              toggleRange(
                monthStart,
                monthEnd,
                item,
                setMonthStart,
                setMonthEnd
              );
            }}
          />
        </View>
      );
    }

    if (activeTab === "Year") {
      return (
        <YearBox
          value={item}
          isActive={selectedYear === item || inYearRange(item)}
          onPress={() => {
            setSelectedYear(item);
            toggleRange(yearStart, yearEnd, item, setYearStart, setYearEnd);
          }}
        />
      );
    }

    // Flexible
    return (
      <View style={styles.flexibleContainer}>
        <Text style={styles.flexibleLabel}>Hour(s)</Text>
        <Text style={styles.suggestionSubtitle}>
          Range: {flexStart} – {flexEnd}
        </Text>

        {/* Start */}
        <View style={styles.flexibleRow}>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() =>
              setFlexStart((v) => Math.max(1, Math.min(v - 1, flexEnd)))
            }
          >
            <Text style={styles.counterText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.flexibleValue}>{flexStart}</Text>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => setFlexStart((v) => Math.min(v + 1, flexEnd))}
          >
            <Text style={styles.counterText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 10 }} />

        {/* End */}
        <View style={styles.flexibleRow}>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => setFlexEnd((v) => Math.max(flexStart, v - 1))}
          >
            <Text style={styles.counterText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.flexibleValue}>{flexEnd}</Text>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => setFlexEnd((v) => v + 1)}
          >
            <Text style={styles.counterText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Compose ListHeaderComponent for the card area (tabs + optional header UI)
  const CardHeader = () => (
    <>
      <View style={styles.tabRow}>
        {["Dates", "Months", "Year", "Flexible"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tabButton, activeTab === tab && styles.activeTab]}
          >
            <Text
              style={[styles.tabText, activeTab === tab && styles.activeTabText]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {activeTab === "Months" && <View style={{ height: 0 }} />}
    </>
  );

  // Reusable counter for "Who" rows
  const Counter = ({ value, onDecrement, onIncrement }) => (
    <View style={[styles.flexibleRow, { justifyContent: "flex-end" }]}>
      <TouchableOpacity style={styles.counterButton} onPress={onDecrement}>
        <Text style={styles.counterText}>−</Text>
      </TouchableOpacity>
      <Text style={[styles.flexibleValue, { minWidth: 20, textAlign: "center" }]}>{value}</Text>
      <TouchableOpacity style={styles.counterButton} onPress={onIncrement}>
        <Text style={styles.counterText}>+</Text>
      </TouchableOpacity>
    </View>
  );

  // Summary for compact Who input
  const whoSummary = (() => {
    const parts = [];
    if (adults > 0) parts.push(`${adults} adult${adults > 1 ? "s" : ""}`);
    if (childrenCount > 0) parts.push(`${childrenCount} child${childrenCount > 1 ? "ren" : ""}`);
    if (infants > 0) parts.push(`${infants} infant${infants > 1 ? "s" : ""}`);
    if (pets > 0) parts.push(`${pets} pet${pets > 1 ? "s" : ""}`);
    return parts.length ? parts.join(", ") : "Add guests";
  })();

  return (
    <SafeAreaView style={styles.container}>
      {/* Make page scrollable without style changes */}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 12 }}
      >
        {/* Close */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => router.push("explore/ExploreScreen")}
        >
          <Entypo name="cross" size={28} color="black" />
        </TouchableOpacity>

        {/* Where */}
        <View style={styles.section}>
          <Text style={styles.label}>Where ?</Text>
          <View style={styles.inputBox}>
            <Ionicons name="search" size={18} color="#555" />
            <TextInput
              placeholder="Search your Destination"
              value={location}
              onChangeText={setLocation}
              style={styles.input}
            />
          </View>
          <Text style={styles.suggestionLabel}>Your suggestions destination</Text>
          <TouchableOpacity
            style={styles.suggestionItem}
            onPress={() => setLocation("Nearby")}
          >
            <Ionicons name="navigate" size={22} color="#0080ff" />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.suggestionTitle}>Nearby</Text>
              <Text style={styles.suggestionSubtitle}>Find rooms near you</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* When */}
        <View style={styles.section}>
          <Text style={styles.label}>When ?</Text>
          {!showWhenCard ? (
            <TouchableOpacity
              style={styles.inputBox}
              onPress={() => {
                setShowWhenCard(true);
                setShowWhoCard(false);
              }}
            >
              <Text style={styles.placeholder}>
                {activeTab === "Flexible"
                  ? `${flexStart}–${flexEnd} hour(s)`
                  : activeTab === "Months" && (monthStart || monthEnd)
                  ? monthEnd
                    ? `${monthStart} – ${monthEnd}`
                    : `${monthStart ?? "Select"}`
                  : activeTab === "Year" && (yearStart || yearEnd)
                  ? yearEnd
                    ? `${yearStart} – ${yearEnd}`
                    : `${yearStart ?? "Select"}`
                  : (dateStart || dateEnd)
                  ? (() => {
                      const toLabel = (d) => `${d.month} ${d.day}`;
                      return dateEnd
                        ? `${toLabel(dateStart)} – ${toLabel(dateEnd)}`
                        : `${toLabel(dateStart)}`;
                    })()
                  : selectedDate
                  ? selectedDate
                  : "Add dates or hours"}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.card}>
              {/* Unified list replacing ScrollView + nested FlatLists */}
              <FlatList
                data={cardData}
                keyExtractor={(item, index) =>
                  activeTab === "Dates"
                    ? item.name
                    : activeTab === "Months"
                    ? item
                    : activeTab === "Year"
                    ? String(item)
                    : `flex-${index}`
                }
                ListHeaderComponent={<CardHeader />}
                renderItem={renderCardItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 8 }}
                nestedScrollEnabled={true}
              />

              {/* Footer inside card */}
              <View style={styles.footerRow}>
                <TouchableOpacity onPress={handleReset}>
                  <Text style={styles.resetText}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.nextButton}
                  onPress={() => setShowWhenCard(false)}
                >
                  <Text style={styles.nextText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* Who */}
        <View style={styles.section}>
          <Text style={styles.label}>Who ?</Text>

          {!showWhoCard ? (
            <TouchableOpacity
              style={styles.inputBox}
              onPress={() => {
                setShowWhoCard(true);
                setShowWhenCard(false);
              }}
            >
              <Text style={styles.placeholder}>{whoSummary}</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.card}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                contentContainerStyle={{ paddingBottom: 10 }}
                keyboardShouldPersistTaps="handled"
              >
                {/* Adults */}
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 8 }}>
                  <View>
                    <Text style={{ fontSize: 15, color: "#000", fontWeight: "600" }}>Adults</Text>
                    <Text style={{ fontSize: 12, color: "#888", marginTop: 2 }}>Ages 13 or above</Text>
                  </View>
                  <Counter
                    value={adults}
                    onDecrement={() => setAdults((v) => Math.max(0, v - 1))}
                    onIncrement={() => setAdults((v) => v + 1)}
                  />
                </View>

                <View style={{ height: 10, backgroundColor: "#00000010", marginVertical: 8, opacity: 0.15 }} />

                {/* Children */}
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 8 }}>
                  <View>
                    <Text style={{ fontSize: 15, color: "#000", fontWeight: "600" }}>Children</Text>
                    <Text style={{ fontSize: 12, color: "#888", marginTop: 2 }}>Ages 2–12</Text>
                  </View>
                  <Counter
                    value={childrenCount}
                    onDecrement={() => setChildrenCount((v) => Math.max(0, v - 1))}
                    onIncrement={() => setChildrenCount((v) => v + 1)}
                  />
                </View>

                <View style={{ height: 10, backgroundColor: "#00000010", marginVertical: 8, opacity: 0.15 }} />

                {/* Infants */}
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 8 }}>
                  <View>
                    <Text style={{ fontSize: 15, color: "#000", fontWeight: "600" }}>Infants</Text>
                    <Text style={{ fontSize: 12, color: "#888", marginTop: 2 }}>Under 2</Text>
                  </View>
                  <Counter
                    value={infants}
                    onDecrement={() => setInfants((v) => Math.max(0, v - 1))}
                    onIncrement={() => setInfants((v) => v + 1)}
                  />
                </View>

                <View style={{ height: 10, backgroundColor: "#00000010", marginVertical: 8, opacity: 0.15 }} />

                {/* Pets */}
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 8 }}>
                  <View>
                    <Text style={{ fontSize: 15, color: "#000", fontWeight: "600" }}>Pets</Text>
                    <Text style={{ fontSize: 12, color: "#888", marginTop: 2, textDecorationLine: "underline" }}>
                      Bringing a service animal?
                    </Text>
                  </View>
                  <Counter
                    value={pets}
                    onDecrement={() => setPets((v) => Math.max(0, v - 1))}
                    onIncrement={() => setPets((v) => v + 1)}
                  />
                </View>
              </ScrollView>

              {/* Footer inside who card */}
              <View style={styles.footerRow}>
                <TouchableOpacity onPress={handleReset}>
                  <Text style={styles.resetText}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.nextButton}
                  onPress={() => setShowWhoCard(false)}
                >
                  <Text style={styles.nextText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* Footer */}
        <View style={[styles.footer, { paddingBottom: 12 }]}>
          <TouchableOpacity onPress={handleReset}>
            <Text style={styles.clearText}>Clear all</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.searchBtn} onPress={handleNext}>
            <Text style={styles.searchBtnText}>Search</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const numColumns = 7;
const boxSize = width / numColumns - 18;

const MonthBox = ({ label, isActive, onPress }) => (
  <TouchableOpacity
    style={[styles.monthBox, isActive && styles.selectedBox]}
    onPress={onPress}
  >
    <Text style={[styles.monthText, isActive && styles.selectedBoxText]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const YearBox = ({ value, isActive, onPress }) => (
  <TouchableOpacity
    style={[styles.yearBox, isActive && styles.selectedBox]}
    onPress={onPress}
  >
    <Text style={[styles.yearText, isActive && styles.selectedBoxText]}>
      {value}
    </Text>
  </TouchableOpacity>
);

// styles unchanged
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f3f3",
    padding: 16,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 12,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    color: "#111",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: "#000",
  },
  placeholder: {
    fontSize: 15,
    color: "#aaa",
  },
  suggestionLabel: {
    marginTop: 12,
    fontSize: 13,
    color: "#777",
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  suggestionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  suggestionSubtitle: {
    fontSize: 12,
    color: "#888",
  },

  /* When Card */
  card: {
    marginTop: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    maxHeight: 400,
  },
  tabRow: {
    flexDirection: "row",
    backgroundColor: "#f1f1f1",
    borderRadius: 30,
    padding: 4,
    marginBottom: 12,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 6,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "#000",
  },
  tabText: {
    fontSize: 14,
    color: "#555",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "600",
  },

  /* Dates */
  monthContainer: {
    marginBottom: 12,
  },
  monthTitle: {
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 8,
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayBox: {
    width: boxSize,
    height: boxSize,
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  selectedDay: {
    backgroundColor: "#000",
  },
  dayText: {
    fontSize: 13,
    color: "#333",
  },
  selectedDayText: {
    color: "#fff",
    fontWeight: "600",
  },

  /* Months */
  monthBox: {
    flex: 1,
    margin: 6,
    paddingVertical: 20,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  monthText: {
    fontSize: 15,
    color: "#333",
  },

  /* Years */
  yearBox: {
    flex: 1,
    margin: 6,
    paddingVertical: 18,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  yearText: {
    fontSize: 15,
    color: "#333",
  },

  /* Selected Style */
  selectedBox: {
    backgroundColor: "#000",
  },
  selectedBoxText: {
    color: "#fff",
    fontWeight: "700",
  },

  /* Flexible Hours */
  flexibleContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  flexibleLabel: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 14,
  },
  flexibleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  counterButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#888",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  counterText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
  },
  flexibleValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },

  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 6,
  },
  resetText: {
    fontSize: 14,
    color: "#555",
  },
  nextButton: {
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  nextText: {
    fontSize: 15,
    fontWeight: "600",
  },

  /* Footer */
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
    alignItems: "center",
    paddingBottom: 12,
  },
  clearText: {
    fontSize: 14,
    textDecorationLine: "underline",
    color: "#000",
  },
  searchBtn: {
    backgroundColor: "#ff4d5b",
    paddingHorizontal: 36,
    paddingVertical: 14,
    borderRadius: 30,
  },
  searchBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});
