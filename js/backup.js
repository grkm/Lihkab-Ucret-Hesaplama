var localStorageBackup = function() {
  var backup = {};
  for (i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    backup[key] = escape(encodeURIComponent(value));
  }
  var json = JSON.stringify(backup);
  var base = btoa(json);
  var href = 'data:text/javascript;charset=utf-8;base64,' + base;
  var link = document.createElement('a');
    link.setAttribute('download', 'backup.json');
  link.setAttribute('href', href);
  document.querySelector('body').appendChild(link);
  link.click();
  link.remove();
};


var getJSON = function(url, callback) {

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  
  xhr.onload = function() {
  
      var status = xhr.status;
      
      if (status == 200) {
          callback(null, xhr.response);
      } else {
          callback(status);
      }
  };
  
  xhr.send();
};

var urldenyukle = function(){

  getJSON('https://grkm.github.io/Lihkab-Ucret-Hesaplama/backup.json',  function(err, data) {
  
  if (err != null) {
      console.error(err);
  } 
  else 
  {

    var text = data;
    for (var key in text){
        var value = decodeURIComponent(unescape(text[key]));
        window.localStorage.setItem(key, value);
      }
      alert('Yüklenen ' + Object.keys(text).length + ' tane veri sisteme eklendi.');
  }
});

}

var urldenlocalstoragekontrol = function(){

  getJSON('https://grkm.github.io/Lihkab-Ucret-Hesaplama/backup.json',  function(err, data) {
  
  if (err != null) {
      console.error(err);
  } 
  else 
  {
    var sayac = "0";
    var text = data;
    for (var key in text){
        var value = decodeURIComponent(unescape(text[key]));
        //window.localStorage.setItem(key, value);
        if(localStorage.getItem(key)===null) {
          window.localStorage.setItem(key, value);
          sayac=sayac+1;
       }
      }
      if(sayac!=0){
        alert((Object.keys(sayac).length-1) + ' tane boş veri tanımlı ayarlardan düzeltildi.');
      }
      else {

      }
      
  }
});
}

var localStorageRestore = function() {
  var t = document.createElement('div');
  var a = document.createElement('a');
  a.appendChild(document.createTextNode('X'));
  a.setAttribute('href', '#');

  a.style.position = 'absolute';
  a.style.top = '10px';
  a.style.right = '10px';
  a.style['text-decoration'] = 'none';
  a.style.color = '#fff';
  t.appendChild(a);
  a.onclick = function() {
      t.remove();
  };
  t.style.width = '90%';
  t.style.position = 'fixed';
  t.style.top = '5%';
  t.style.left = '5%';
  t.style['background-color'] = 'gray';
  t.style['text-align'] = 'left';
  t.style.padding = '10px';
  t.style.color = '#fff';
  t.style['z-index'] = 10000;

  var l = document.createElement('input');
  l.setAttribute('type', 'file');
  l.setAttribute('id', 'fileinput');
  l.onchange = function(e) {
      t.remove();
      var f = e.target.files[0];
      if (f) {
          var reader = new FileReader();
          reader.onload = function(e) {
              var text = e.target.result;
              var backup = JSON.parse(text);
              for (var key in backup){
                 var value = decodeURIComponent(unescape(backup[key]));
                 window.localStorage.setItem(key, value);
               }
              alert('Yüklenen ' + Object.keys(backup).length + ' tane veri sisteme eklendi.')
          };
          reader.readAsText(f);
      } else {
        alert('Dosya yüklenirken hata oluştu');
      }
  };
  var a = document.createElement('h6');
  a.appendChild(document.createTextNode('Yedeklenecek Dosyayı Seçiniz'));
  t.appendChild(a);
  t.appendChild(l);
  document.querySelector('body').appendChild(t);
};

var localStorageClear = function() {
  if(window.confirm('Kayıtlı olan ' + localStorage.length + ' tane veriyi silmek istediğinize emin misiniz?')) {
    localStorage.clear();
  }
}

document.addEventListener('DOMContentLoaded',function() {
  var buttons = document.querySelectorAll('a.backup');
  for (i = 0; i < buttons.length; ++i) {
    var button = buttons[i];
    var functionName = button.getAttribute('data-function');
    var functionBody = window[functionName].toString();
    button.setAttribute('href', 'javascript:('+functionBody+')()');
  }
});
