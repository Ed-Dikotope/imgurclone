var frame = require('ui/frame')
var api = require('../../api')
var Observable = require('data/observable').Observable

var pageViewModel = new Observable({
  loading: true,
  topics: []
})

function onNavigatingTo(args) {
    var page = args.object

    api.get('https://api.imgur.com/3/topics/defaults').then(function(json){

      pageViewModel.set('loading', false)
      pageViewModel.set('topics', json.data)

    })

    pageViewModel.openTopic = function(args){
      var topicId = pageViewModel.get('topics')[args.index].id

      frame.topmost().navigate({
        moduleName: 'views/topic/topic',
        context: {
          id: topicId
        }
      })
    }

    page.bindingContext = pageViewModel
}

exports.onNavigatingTo = onNavigatingTo;
