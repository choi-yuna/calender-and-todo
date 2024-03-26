import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { runPracticeDayjs } from './src/practice-dayjs';
import { getCalendarColumns, getDayColor, getDayText} from './src/util';
import dayjs from 'dayjs';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import Margin from './Margin';

// MARK: - Property
//날짜, 요일 column style 함수
const columnSize =35;

const Column = ({
 text,
 color,
 opacity,
}) => {
 return (
   <View style={{
     width: columnSize, 
     height: columnSize, 
     justifyContent: "center", 
     alignItems:"center"
     }}>
      <Text style={{ color: color }}>{text}</Text>
   </View >
 )
}

const ArrowButton = ({iconName}) => {
  return(
    <TouchableOpacity style = {{paddingHorizontal:20, paddingVertical:15}}>
            <SimpleLineIcons name={iconName} size={15} color="#404040" />
    </TouchableOpacity>
  )
}


export default function App() {
  // MARK: - Property
  const now = dayjs();
  const columns = getCalendarColumns(now);

  //상단 헤더 함수
  const ListHeaderComponent = () => {
    const currentDateText = dayjs(now).format("YYYY.MM.DD");
    return (
      <View>

        {/* <YYYY.MM.DD> */}
        <View style={{flexDirection: "row", justifyContent: "center", alignItems:"center"}}>
          <ArrowButton iconName="arrow-left" />

          <TouchableOpacity>
          <Text style={{ fontSize: 20, color: "#404040"}}> {currentDateText}</Text>
          </TouchableOpacity> 

          <ArrowButton iconName="arrow-right" />

        </View>


        {/*일 월 화 수 목 금 토 */}
        <View style={{ flexDirection: "row" }}>
          {[0, 1, 2, 3, 4, 5, 6].map(day => {
            const dayText = getDayText(day);
            const color = getDayColor(day);
            return (
              <Column key={`day-${day}`} text={dayText} color={color} opacity={1} />
            ) 
          })}
        </View>
      </View>
    )
  }


  // Fuction날짜 item 가져오는 함수 
  const renderItem = ({ item: date }) => {
    const dateText = dayjs(date).get('date');
    const day = dayjs(date).get('day');
    const color = getDayColor(day);
    const isCurrentMonth = dayjs(date).isSame(now,'month');
    return (
    <View>
       <Column  text={dateText} color={color} opacity={isCurrentMonth? 1: 0.4}/>
    </View> 
    ) 
  }

  useEffect(() => {
    runPracticeDayjs();
  }, []);


  // MARK: - Body
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data = {columns}
        keyExtractor={(_, index) => `column-${index}`}
        numColumns={7}
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
