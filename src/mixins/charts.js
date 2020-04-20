'use strict'

export default {
  data: function () {
    const op = 0.8
    return {
      colors: [
        `rgba(43, 139, 126, ${op})`, `rgba(252, 218, 14, ${op})`,
        `rgba(43, 105, 172, ${op})`, `rgba(14, 1, 132, ${op})`,
        `rgba(91, 93, 194, ${op})`, `rgba(210, 30, 148, ${op})`,
        `rgba(140, 164, 69, ${op})`, `rgba(129, 7, 17, ${op})`,
        `rgba(247, 95, 94, ${op})`, `rgba(63, 109, 236, ${op})`,
        `rgba(145, 252, 26, ${op})`, `rgba(65, 146, 60, ${op})`,
        `rgba(155, 4, 189, ${op})`, `rgba(255, 121, 32, ${op})`,
        `rgba(137, 221, 110, ${op})`, `rgba(111, 124, 113, ${op})`,
        `rgba(230, 187, 36, ${op})`,
        `rgba(255, 151, 40, ${op})`, `rgba(146, 39, 143, ${op})`,
        `rgba(242, 241, 162, ${op})`, `rgba(26, 72, 102, ${op})`, `rgba(29, 128, 52, ${op})`
      ]
    }
  },

  methods: {
    factoryData (tLabels, tData, limit = 10) {
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
