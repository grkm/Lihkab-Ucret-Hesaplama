if('serviceWorker' in navigator){
navigator.serviceWorker.register('./sw.js')
    .then(function(){
        console.log('Service worker registered');
        
    })
}
else{
    console.log('not found');   
}