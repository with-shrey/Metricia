const metricsSdk = require('../index');

/**
 * @class CounterMetric
 * @description Counter Metric using class based approach
 * Can Extend this class or use it directly
 * @example
 * class WorkerMenuSyncSuccessMetric extends CounterMetric {
 * constructor(someData) {
 *  const labels = {
 *     someData,
 *   };
 *   super('metric_name', 'Description', labels);
 * }
 *}
 */
class CounterMetric {
  constructor(name, description, labels, value = 1) {
    this.name = name;
    this.description = description;
    this.labels = labels;
    this.value = value;
  }

  logMetric(value) {
    metricsSdk.counter.inc(this.name, this.labels, value || this.value, this.description);
  }
}

module.exports = CounterMetric;
