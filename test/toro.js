'use strict'

var config = require('./../config/config'),
    Bot = require('./../modules/toro/usecase/botUsecase'),
    Field = require('./../modules/toro/usecase/fieldUsecase'),
    bot,
    expect = require("chai").expect

describe('Toro Toro', function() {
  beforeEach(function() {
    bot = new Bot(config.bot, new Field(config.field))
  })

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

  it('Should turn to LEFT', function() {
    var x = 3,
        y = 2,
        f = 'WEST'
    bot.place(x, y, f)
    bot.left()
    expect(bot._getBotPosition().f).to.equal('SOUTH')
  })

  it('Should turn to RIGHT', function() {
    var x = 3,
        y = 2,
        f = 'WEST'
    bot.place(x, y, f)
    bot.right()
    expect(bot._getBotPosition().f).to.equal('NORTH')
  })

  it('Should Report Bot Position', function() {
    var x = 1,
        y = 2,
        f = 'EAST'
    bot.place(x, y, f)
    expect(bot.report()).to.equal('--> 1, 2, EAST')
  })
  
  it("Should be 'undefined'", function() {
    var pos = bot._getBotPosition()
    expect(pos.x).to.equal(undefined)
    expect(pos.y).to.equal(undefined)
    expect(pos.f).to.equal(undefined)
  })
})    