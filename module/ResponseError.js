class ResponseError {
  origin;
  filed;
  details;
  constructor(origin, filed = "", details="") {
    (this.origin = origin), (this.filed = filed), (this.details = details);
  }
}

module.exports = ResponseError;
