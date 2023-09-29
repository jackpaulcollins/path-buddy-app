class PathScheduleParser {
  constructor(scheduleString) {
    this.scheduleString = scheduleString;
  }

  parse() {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const scheduleArray = this.scheduleString.split(',').map(Number);
    const result = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < scheduleArray.length; i++) {
      if (scheduleArray[i] === 1) {
        result.push(daysOfWeek[i]);
      }
    }

    return result.join(', ');
  }
}

export default PathScheduleParser;
