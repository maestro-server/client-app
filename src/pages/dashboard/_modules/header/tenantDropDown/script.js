"use strict";

import _ from "lodash";
import Teams from "factories/teams";
import FetchEntity from "services/fetchEntity";

import Me from "factories/me";
import store from "src/store";
import tenantMananger from "services/tenantManager";
import { EventBus } from "src/resources/bus/bus-general.js";

const img_avatar_default = process.env.VUE_APP_IMG_AVATAR_DEFAULT;

export default {
  data: function() {
    return {
      menu: {
        teams: ["Teams", "fa-users"],
        connections: ["Connections", "fa fa-circle-o-notch"],
        settings: ["Settings", "fa-cog"],
        dependency: ["Dependency", "fa-cog"],
        hr: true,
        profile: ["Profile", "fa-user"],
        info: ["About", "fa-info-circle"],
        logout: ["Logout", "fa-sign-out"]
      },
      showDrop: { tenants: false, settings: false },
      teams: {},
      tenant: { name: null, _id: null },
      avatar: img_avatar_default,
      users: {},
      vBarOptions: {
        preventParentScroll: true,
        resizeRefresh: false,
        scrollThrottle: 30
      }
    };
  },

  methods: {
    toggle(key) {
      let on = false;

      _.forEach(this.showDrop, (v, k) => {
        if (key === k) {
          on = !v;
        }
        this.showDrop[k] = key === k ? !v : false;
      });

      this.eventClickOutside(on);
    },

    eventClickOutside(val) {
      return val
        ? document.addEventListener("click", this.clickOutside, false)
        : document.removeEventListener("click", this.clickOutside, false);
    },

    clickOutside(e) {
      if (!this.$el.contains(e.target)) {
        this.toggle("all");
      }
    },

    fetchData: function() {
      FetchEntity(Teams)({ k: "teams", force: true }).find(e => {
        this.$set(this, "teams", e.data);
      });
    },

    img_default(item) {
      if (_.get(item, "avatar")) {
        return _.get(store.getters, "get_options.static_url") + item.avatar;
      }

      return img_avatar_default;
    },

    imgBackStr(img) {
      const dim = this.img_default(img);
      return this.ctUrl(dim);
    },

    ctUrl(dim) {
      return `url(${dim})`;
    },

    changeTenant(team, refs = "teams") {
      const tn = _.assign({}, team, { refs });

      tenantMananger.set(tn);
      this.updateViewTenant(tn);
      this.$router.go();
    },

    updateViewTenant(tn) {
      this.avatar = this.img_default(tn);

      const obj = _.assign({}, this.tenant, tn);
      this.$set(this, "tenant", obj);

      this.toggle("all");
    },

    updateUser() {
      const me = this.$store.getters.get_me;

      if (_.isEmpty(me)) {
        FetchEntity(Me)({ persistence: "local" }).find(this.fallbackUser);
      }

      this.$set(this, "users", me);
    },

    fallbackUser(e) {
      store.dispatch("setUser", e.data);
      this.$set(this, "users", e.data);

      this.changeTenant(e.data, "users");
    },

    updateProfile(data) {
      this.avatar = this.img_default(data);
    },

    eventActiveProfile(entity, refs = "teams") {
      const id1 = _.get(entity, "_id");
      const id2 = _.get(this.tenant, "_id");

      if (id1 === id2) {
        const tn = _.assign({}, entity, { refs });
        this.$set(this, "tenant", tn);
        tenantMananger.set(tn);
        this.updateProfile(tn);
      }
    },

    eventUpdateUser(user) {
      const data = _.pick(user, ["name", "avatar", "email", "_id"]);
      store.dispatch("setUser", data);
      this.$set(this, "users", data);
      this.eventActiveProfile(data, "users"); // check if is this user the actived profile
    },

    eventUpdateTeams(teams) {
      const data = _.pick(teams, ["name", "avatar", "email", "_id"]);
      this.fetchData();
      this.eventActiveProfile(data, "teams");
    }
  },

  computed: {
    storageTeam() {
      return tenantMananger.get();
    },
    hasTeams() {
      const total = _.get(this.teams, "items", []);
      return total.length;
    }
  },

  created() {
    this.fetchData();
    this.updateUser();

    const tn = this.storageTeam || this.users;
    this.updateViewTenant(tn);

    EventBus.$on("update-teams", this.eventUpdateTeams);
    EventBus.$on("update-profile", this.eventUpdateUser);
  },

  destroyed() {
    EventBus.$off("update-teams", this.eventUpdateTeams);
    EventBus.$off("update-profile", this.eventUpdateUser);
  }
};
