var frame = require('ui/frame')
var topmost = frame.topmost()
var Observable = require('data/observable').Observable
var webViewModule = require("ui/web-view");

var pageViewModel = new Observable({
  loading: true,
  imageUrl: ''
})

var SocialShare = require("nativescript-social-share");
var imageSourceModule = require("image-source");

function onNavigatingTo(args) {
    var page = args.object

    pageViewModel.set('loading',true)
    pageViewModel.set('imageUrl',page.navigationContext.imageLink)

    pageViewModel.share = share
    pageViewModel.backToTopic = backToTopic

    page.bindingContext = pageViewModel

    var webView = page.getViewById('webview')

    webView.on(webViewModule.WebView.loadFinishedEvent, function (loadEventData) {
      pageViewModel.set('loading',false)
    })

}

function backToTopic(){
    topmost.goBack()
}

function share(){
  //var image = imageSourceModule.fromUrl( pageViewModel.get('imageUrl') );
  SocialShare.shareText(pageViewModel.get('imageUrl'));
}

exports.onNavigatingTo = onNavigatingTo
