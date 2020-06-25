"use strict";
import Validate from "./libs/valid";
import Uploader from "./libs/uploader";
import store from "src/store";
import tenantMananger from "services/tenantManager";

const img_avatar_default = process.env.VUE_APP_IMG_AVATAR_DEFAULT;

export default {
  props: {
    refs: { type: String },
    helper: { type: String, default: "" },
    slabel: { type: String, default: "Upload your avatar" },
    defaultImg: { type: String, default: img_avatar_default },
    value: { default: null },
    multiple: { type: Boolean, default: false },
    imgSize: { type: String, default: "col-xs-3" },
    inputSize: { type: String, default: "col-xs-9" },
    validType: { type: String, default: "image" }
  },

  data() {
    return {
      spinner: false,
      label: null,
      file: []
    };
  },

  computed: {
    showAvatar() {
      if (this.validType === "image") {
        return `${_.get(store.getters, "get_options.static_url")}${this.file}`;
      }

      return this.defaultImg;
    }
  },

  watch: {
    value(val) {
      this.file = val;
    }
  },

  methods: {
    upload(files) {
      _.forEach(files, this.sendFiles);
    },

    sendFiles(file) {
      if (file == null) {
        Uploader.uploadError("No file selected.", this.finishWithError);
        return;
      }

      const check = new Validate(this.validType).valid(file);

      if (check.pass()) {
        this.spinner = true;

        const refs = this.refs || _.get(tenantMananger.get(), "refs");
        new Uploader(refs)
          .setFinishUpload(this.finishCallBack)
          .setFinishUpload(this.finishWithError, "callbackErr")
          .getSignedRequest(file);
        return;
      }

      const text = check.error.reduce((a, b) => `${a}, ${b}`);
      Uploader.uploadError(text, this.finishWithError);
    },

    finishCallBack(data, file) {
      this.spinner = false;
      this.$nextTick();
      this.populateInput(file.filename);
    },

    populateInput(file) {
      if (this.multiple) {
        this.file.push(file);
      } else {
        this.file = file;
      }
      this.$emit("input", this.file);
    },

    finishWithError() {
      this.spinner = false;
    }
  }
};
