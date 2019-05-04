'use strict'

var config = require('./../../../config/config'), 
    botSanitizer = require('./../sanitizer/botSanitizer'),
    fieldSanitizer = require('./../sanitizer/fieldSanitizer')
module.exports = new botSanitizer(config.bot, new fieldSanitizer(config.field))