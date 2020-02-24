(function(){

var $  = document.getElementById.bind(document);
var $$ = document.querySelectorAll.bind(document);

var App = function($el){
  this.$el = $el;

  if (this.quotes) {
    this.renderQuote();
  }
  else {
    this.load();
  }
};

App.fn = App.prototype;

App.fn.load = function(){
  this.ajax("./data/goodquotes.json");
};

App.fn.ajax = function(url) {
  var xhr = new XMLHttpRequest(),
      self = this;
  xhr.open("GET", chrome.extension.getURL(url), true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      var resp = JSON.parse(xhr.responseText);

      self.save(resp);
      self.renderQuote();
    }
  };
  xhr.send();
  return xhr;
};

App.fn.save = function(quotes){
  localStorage.gquotes = JSON.stringify(quotes);
  this.quotes = quotes;
};

App.fn.renderQuote = function() {
  var quotesSize = this.quotes.length;
      randomIndex = Math.floor(Math.random() * quotesSize),
      quote = this.quotes[randomIndex];

  this.html(this.view('quote')(quote));
};

App.fn.renderProgress = function() {
  this.html(this.view('progress')());
};

App.fn.$$ = function(sel){
  return this.$el.querySelectorAll(sel);
};

App.fn.html = function(html){
  this.$el.innerHTML = html;
};

App.fn.view = function(name){
  var $el = $(name + '-template');
  return Handlebars.compile($el.innerHTML);
};

window.app = new App($('app'));

})();