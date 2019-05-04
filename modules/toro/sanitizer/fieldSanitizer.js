'use strict' 

function Field(conf) {
  this.config = conf
}
var actions = {
  isOutOfField: function(x, y){
    if((x > (this.config.startX + (this.config.lengthX - 1))) || (x < this.config.startX) || (y > (this.config.startY + (this.config.lengthY - 1))) || (y < this.config.startY)){
      return true
    }
    return false
  },
}
Field.prototype = Object.create(actions)
Field.prototype.constructor = Field
module.exports = Field