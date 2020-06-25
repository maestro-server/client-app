"use strict";

class validateText {
  constructor(file, opts) {
    this.file = file;

    const defaultParams = {
      maxsize: 16302400, // ~10 mb,
      minsize: 1, // 1 kbs
      type: ["application/json", "text/plan", "text/plan", "text/csv"]
    };

    this.config = Object.assign({}, defaultParams, opts);
    this.error = [];
  }

  sizeValidate() {
    const size = this.file.size;

    if (size > this.config.minsize && size < this.config.maxsize) {
      return true;
    }

    this.error.push("File is to big");
    return false;
  }

  typeValidate() {
    const fileType = this.file.type;
    if (this.config.type.indexOf(fileType) > -1) {
      return true;
    }

    this.error.push("We only acceptable json or csv");
    return false;
  }

  pass() {
    if (this.sizeValidate() && this.typeValidate()) {
      return true;
    }

    return false;
  }
}

export default validateText;
