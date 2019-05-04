'use strict'

var config = require('./../../../config/config'), 
    Bot = require('./../usecase/botUsecase'),
    Field = require('./../usecase/fieldUsecase')
module.exports = new Bot(config.bot, new Field(config.field))