
import Factory from './factory'

class Teams extends Factory {

  constructor(e="/teams") {
    super(e)
  }

  list (query={}, success=null) {

    this.get(query, success)
  }

  update (id, data, success=null) {
    this.entity += "/"+id

    super.patch(data, success)
  }

  delete (id, success=null) {
    this.entity += "/"+id

    super.delete({}, success)
  }
}

export default Teams
