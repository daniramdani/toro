'use strict'

var config = require('./../../../config/config') 

function Bot(conf, fld){
  this.config = conf,
  this.field = fld,
  this.isFirstStepMade = false,
  this.CurrentPosition = {x: undefined, y: undefined, f: undefined}
}

var actions = {
  place: function(x, y, f){
    var arg = {}

    try {
      arg = this._validateInput(x, y, f)
    } catch (e) {
        return e
    }
    this._setBotPosition(arg.x, arg.y, arg.f)
    if (!this.isFirstStepMade)
      this.isFirstStepMade = true
    return this
  },
  move: function(){
    var x, y, f
    x = this.CurrentPosition.x
    y = this.CurrentPosition.y
    f = this.CurrentPosition.f
    switch(f){
      case 0: 
        ++y
        break
      case 1: 
        ++x
        break
      case 2:
        --y
        break
      case 3:
        --x
        break
    }
    this._setBotPosition(x, y, this.config.directions[f])
    return this
  },
  right: function(){
    this.CurrentPosition.f = (this.CurrentPosition.f + 1) > 3 ? 0 : this.CurrentPosition.f + 1
    return this
  },
  left: function(){
    this.CurrentPosition.f = (this.CurrentPosition.f - 1) < 0 ? 3 : this.CurrentPosition.f - 1
    return this
  },
  report: function(msgObj) {
    var oPosition = this._getBotPosition()
    return '--> '+oPosition.x+', '+oPosition.y+', '+oPosition.f
  },
  _validateInput: function(x, y, f){
      var _f = f.toUpperCase(),
          _x = parseInt(x),
          _y = parseInt(y)

      return { x: _x, y: _y, f: _f }
  },
  _setBotPosition: function(x, y, f) {
    this.CurrentPosition.x = x,
    this.CurrentPosition.y = y,
    this.CurrentPosition.f = this.config.directions.indexOf(f)
  },
  _getBotPosition: function() {
    return { x: this.CurrentPosition.x, y: this.CurrentPosition.y, f: this.config.directions[this.CurrentPosition.f] }
  },
}
Bot.prototype = Object.create(actions)
Bot.prototype.constructor = Bot
module.exports = Bot