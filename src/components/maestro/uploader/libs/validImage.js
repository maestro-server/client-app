"use strict";

class validateImage {
  constructor(file, opts) {
    this.file = file;

    const defaultParams = {
      maxsize: 1630240, // ~1 mb,
      minsize: 1024, // 1 kbs
      type: ["image/jpeg", "image/png"]
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

    this.error.push("We only acceptable jpg or png");
    return false;
  }

  pass() {
    if (this.sizeValidate() && this.typeValidate()) {
      return true;
    }

    return false;
  }
}

export default validateImage;
