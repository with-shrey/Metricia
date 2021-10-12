const moment = require('moment');

class HeartBeatResponse {
  constructor(state, uptime) {
    this.state = state;
    this.uptime = moment
      .utc(moment.duration(uptime, 'seconds').as('milliseconds'))
      .format('HH:mm:ss');
  }
}
module.exports = {
  HeartBeatResponse,
};
