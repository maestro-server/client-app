'use strict'

export default {
  data: function () {
    return {
      colors: ["rgba(43, 139, 126, 0.8)", "rgba(252, 218, 14, 0.8)", "#2B69AC", "#0E0184", "#5B5DC2", "#D21E94", "#8CA445", "#280AF0", "#3F6DEC", "#91FC1A", "#41923C", "#9B04BD", "#FF7920", "#89DD6E", "#6F7C71", "#F2F1A2"]
    }
  },

  methods: {
    factoryData(tLabels, tData, limit = 10) {
      const data = tData.slice(0, limit)
      const labels = tLabels.slice(0, data.length)

      const prepared = {
        labels,
        datasets: [
          {
            backgroundColor: this.colors,
            data
          }
        ]
      }

      return prepared
    }
  }
}
