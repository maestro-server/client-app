"use strict";

import validateImage from "./validImage";
import validateText from "./validText";

class Validate {
  constructor(type) {
    const validator = {
      image: validateImage,
      text: validateText
    };

    this.validator = validator[type];
  }

  valid(file) {
    return new this.validator(file);
  }
}

export default Validate;
