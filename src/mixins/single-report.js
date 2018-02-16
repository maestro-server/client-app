'use strict'

import _ from 'lodash'
import FectherEntity from 'services/fetchEntity'

export default {
  methods: {
    download(group, type, extesion) {
      const ext = extesion || type
      const reps = `${group}/${type}`

      const fileName = `${_.get(this.model, '_id')}.${ext}`
      const headers = {'Accept': reps}

      FectherEntity(this.entity)({force: true}, headers)
        .findOne((response) => {
          const result = type == 'json' ? JSON.stringify(response.data) : response.data

          const url = window.URL.createObjectURL(new Blob([result], {type: reps}));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
        }, `${_.get(this.model, '_id')}/result`)
    }
  }
}
