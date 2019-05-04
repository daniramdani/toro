'use strict'

var stdIn = process.stdin,
    stdOut = process.stdout,
    os = require("os"), 
    EOL = os.EOL,
    argv
stdIn.setEncoding('utf8')
argv = process.argv.slice(2)
stdIn.on('data', function(input){
  print(input)
})

function print(input){
  let result, 
      action = input.trim()

  if(action.match(/(exit)/i))
    process.exit()
  result = actions(action)
  if(result instanceof Error){
    stdOut.write(result.message + EOL + '--> ')
  }else if (typeof result == 'string'){
    stdOut.write(result + EOL + '--> ')
  }else{
    stdOut.write('--> ')
  }
}

function actions(action){
  let result,
      err,
      bot = require('./../modules/toro/presenter/consolePresenter'),
      sanitizer = require('./../modules/toro/sanitizer/sanitizer')

  if(action.match(/^\s*place\s+\w+(?:,?\s*|\s+)\w+(?:,?\s*|\s+)\w+\s*$/i)){
    let args = action.trim().split(/(?:\s+|,\s*)/i).slice(1)

    err = sanitizer.place(args[0], args[1], args[2])
    if(err instanceof Error){
      result = new Error(err)
    }else{
      result = bot.place(args[0], args[1], args[2])
    }
  }else if(action.match(/^move\s*$/i)){
    err = sanitizer.move()
    if(err instanceof Error){
      result = new Error(err)
    }else{
      result = bot.move()
    }
  } else if(action.match(/^report\s*$/i)){
    err = sanitizer.report()
    if(err instanceof Error){
      result = new Error(err)
    }else{
      result = bot.report()
    }
  }else if(action.match(/^left\s*$/i)){
    err = sanitizer.left()
    if(err instanceof Error){
      result = new Error(err)
    }else{
      result = bot.left()
    }
  }else if(action.match(/^right\s*$/i)){
    err = sanitizer.right()
    if(err instanceof Error){
      result = new Error(err)
    }else{
      result = bot.right()
    }
  }else{
    result = new Error('Invalid Action!')
  }
  return result
}

if(argv.length){
  let rLine, 
      readline = require('readline'), 
      fs = require('fs')
  
  rLine = readline.createInterface({
    input: fs.createReadStream(argv[0]),
    terminal: false
  })
  rLine.on('line', function(line){
    stdOut.write(line + EOL)
    print(line)
  })
  rLine.on('close', function(){
    rLine.close()
    process.exit()
  })
}

function Console() {}
Console.run = function() {
  stdOut.write('Enter an Action : ' + EOL + '--> ')
  stdIn.resume()
}
module.exports = Console 