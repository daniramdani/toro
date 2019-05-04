'use strict'

var config = require(''),
    Bot = require(''),
    Field = require(''),
    bot,
    expect = require("chai").expect

describe('Toro Toro', function() {
  it('Should MOVE', function() {
    var x = 1,
        y = 2,
        f = 'EAST',
        p
    bot.place(x, y, f)
    bot.move()
    p = bot._getBotPosition()
    expect(p.x).to.equal(2)
    expect(p.y).to.equal(2)
    expect(p.f).to.equal('EAST')
  })
})    