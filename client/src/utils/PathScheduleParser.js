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

  periodDisplay() {
    if (this.scheduleString === 'weekly') {
      return 'At least once a week';
    }

    if (this.scheduleString === 'daily') {
      return 'At least once a day';
    }

    return this.scheduleString;
  }
}

export default PathScheduleParser;
