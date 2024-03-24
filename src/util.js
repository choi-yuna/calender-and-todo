import dayjs from "dayjs";

export const fillEmptyColumns = (columns, start, end) => {
  const filledColumns = columns.slice(0);



  // 1. 첫날 이전 공백 채우기
  const startDay = dayjs(start).get("day");
  for (let i = 1; i <= startDay; i += 1) {
    const date = dayjs(start).subtract(i, "day");
    filledColumns.unshift(date); //맨 앞으로 원소 넣기
  }


  // 2. 마지막날 이후 공백 채우기
  const endDay = dayjs(end).get("day");
  /**
    0 -> 6
    1 -> 5 
    2 -> 4
    endDay + ? = 6
   */
  for (let i = 1; i <= 6 - endDay; i += 1) {
    const date = dayjs(end).add(i, "day");
    filledColumns.push(date);
  }

  return filledColumns;
};


export const getCalendarColumns = (now) => {
  const start = dayjs(now).startOf("month"); //3.1
  const end = dayjs(now).endOf("month"); //3.31
  const endDate = dayjs(end).get("date");//31

  const columns = [];
  for (let i = 0; i < endDate; i += 1) {
    const date = dayjs(start).add(i, "day");
    columns.push(date);
  }

  const filledColumns = fillEmptyColumns(columns, start, end);
  return filledColumns;
};


/**
 * @param day  0 ~ 6
 * @return 일 ~ 월
 */
const dayTexts = ["일", "월", "화", "수", "목", "금", "토"]
export const getDayText = (day) => {
    return dayTexts[day];
};

//날짜 별 색 지정
 export const getDayColor = (day) => {
    return  day ===0 ? "#e67639" : day === 6 ? "#5872d1" : "#2b2b2b";
 };