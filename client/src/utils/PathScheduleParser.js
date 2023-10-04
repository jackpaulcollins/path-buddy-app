class PathScheduleParser {
  constructor(scheduleString, schedulePolarity) {
    this.scheduleString = scheduleString;
    this.schedulePolarity = schedulePolarity;
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
      return this.schedulePolarity === 'positive' ? 'At least once a week' : 'Weekly';
    }

    if (this.scheduleString === 'daily') {
      console.log(this.schedulePolarity);
      return this.schedulePolarity === 'positive' ? 'At least once a day' : 'Everyday';
    }

    return this.scheduleString;
  }
}

export default PathScheduleParser;
