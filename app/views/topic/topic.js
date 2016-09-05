var api = require('../../api')
var frame = require('ui/frame')
var _ = require('lodash');

var Observable = require('data/observable').Observable

var pageViewModel = new Observable({
  loading: true,
  photos: []
})

var photos = []

function onNavigatingTo(args) {
    var page = args.object
    var topicId = page.navigationContext.id

    pageViewModel.set('loading', true)

    pageViewModel.viewImage = viewImage
    pageViewModel.backToTopics = backToTopics
    pageViewModel.pickRandomItems = pickRandomItems
    page.bindingContext = pageViewModel

    api.get('https://api.imgur.com/3/topics/' + topicId + '/viral/1').then(function(json){

      photos = json.data

      getPhotos(photos, function(photoList){
        pageViewModel.set('photos', photoList)
        pageViewModel.set('loading', false)
      })
      
    })
}

function viewImage(args){
  var imageLink = pageViewModel.get('photos')[args.index].link

  frame.topmost().navigate({
    moduleName: 'views/image/image',
    context: {
      imageLink: imageLink
    }
  })

}

function pickRandomItems(){

  pageViewModel.set('loading', true)

  getPhotos(photos, function(randomPhotos){
    pageViewModel.set('photos', randomPhotos)
    pageViewModel.set('loading', false)
  })

}

function backToTopics(){
    frame.topmost().goBack()
}

function getPhotos(unfiltered_photos, callback){

    var photos_to_show = 5;

    var filtered_photos = _.reject(unfiltered_photos, function(photo){
        return photo.is_album;
    });

    var random = _.random(0, filtered_photos.length - photos_to_show - 1);
    var _photos = _.slice(filtered_photos, random, random + photos_to_show);

    callback(_photos)
}

exports.onNavigatingTo = onNavigatingTo
