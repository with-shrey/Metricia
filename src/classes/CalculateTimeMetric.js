const metricsSdk = require('../index');

/**
 * @class CalculateTimeMetric
 * @description Histogram Metric using class based approach
 * Can Extend this class to encapsulate all the details like buckets etc or use it directly
 * @example class SomeTimeRelatedMetric extends CalculateTimeMetric {}
 */
class CalculateTimeMetric {
  constructor(name, description, buckets, labels = {}, prependProjectName = true) {
    this.name = name;
    this.description = description;
    this.labels = labels;
    this.buckets = buckets;
    this.labelNames = Object.keys(labels);
    this.histogram = metricsSdk.histogram.getOrCreate(
      this.name,
      this.labelNames,
      this.description,
      this.buckets,
      prependProjectName,
    );
  }

  startTask() {
    this.endSyncTimerFn = this.histogram.startTimer();
  }

  endTask() {
    if (this.endSyncTimerFn) {
      this.endSyncTimerFn(this.labels);
    }
  }

  logMetric(startTime, endTime) {
    const value = metricsSdk.histogram.getTimeDiff(startTime, endTime);
    this.histogram.labels(this.labels).observe(value);
  }
}

module.exports = CalculateTimeMetric;
