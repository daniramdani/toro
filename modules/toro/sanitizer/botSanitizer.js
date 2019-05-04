'use strict'

var config = require('./../../../config/config')  

function botSanitizer(conf, fld){
  this.config = conf,
  this.field = fld,
  this.isFirstStepMade = false,
  this.currentPosition = {x: undefined, y: undefined, f: undefined}
}

var actions = {
  place: function(x, y, f){
    var arg = {}

    try {
      arg = this._validateInput(x, y, f)
    } catch (e) {
        return e
    }
    if (this._isOutOfField(arg.x, arg.y)){
      return new Error('Invalid Place!')
    }
    if (!this.isFirstStepMade)
      this.isFirstStepMade = true
  },
  move: function(){
    var x, y, f
    if(!this.isFirstStepMade){
      return new Error('Invalid Action!')
    }
    if(this._isOutOfField(x, y)){
      return new Error('Invalid Move!')
    }
  },
  right: function(){
    if(!this.isFirstStepMade){
      return new Error('Invalid Action!')
    }
  },
  left: function(){
    if (!this.isFirstStepMade) {
      return new Error('Invalid Action!')
    }
  },
  report: function(msgObj) {
    var oPosition = this._getBotPosition()

    if (oPosition.x == undefined &&
      oPosition.y == undefined &&
      oPosition.f == undefined){
      return 'Invalid Action!'
    }
  },
  _validateInput: function(x, y, f){
      if(!f){
        throw new TypeError('Invalid Action!')
      }
      if(typeof f !== 'string'){
        throw new TypeError('Invalid Action!')
      }
      var _f = f.toUpperCase(),
          _x = parseInt(x),
          _y = parseInt(y)
      if(!Number.isInteger(_x) || !Number.isInteger(_y)){
        throw new TypeError('Invalid Action!')
      }
      if(_x < 0 || _y < 0){
        throw new TypeError('Invalid Action!')
      }
      if(!this._isDirectionValid(_f)){
        throw new TypeError('Invalid Action!')
      }
      return { x: _x, y: _y, f: _f }
  },
  _isDirectionValid: function(sFace) {
    return this.config.directions.indexOf(sFace) !== -1
  },
  _isOutOfField: function(x, y) {
    return this.field.isOutOfField(x, y)
  },
  _getBotPosition: function() {
    return { x: this.currentPosition.x, y: this.currentPosition.y, f: this.config.directions[this.currentPosition.f] }
  },
}
botSanitizer.prototype = Object.create(actions)
botSanitizer.prototype.constructor = botSanitizer
module.exports = botSanitizer