
function returnPromise(method, url) {
    
    return new Promise(function (resolve, reject) {
      let request;
      request = new XMLHttpRequest();   
      request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
          resolve(request.responseText);
        }
      };
      request.open(method, url, true);
      request.onerror = function () {
        reject(Error("Erro de rede."));
      };
      request.send();
    });
}

function imgGenerator() {
    returnPromise("GET", "data.json")
      .then(function (response) {
      var data = JSON.parse(response);
      for (let i = 0; i <= data.images.length; i++) {
        let image = data.images[Math.floor(Math.random() * 15)];
        var images = document.getElementById("images");
        var img = document.createElement("img");
        img.src = image.url;
        images.appendChild(img);
      }})
      .catch(function (error) {
        console.log(error);
      });
}

document.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        imgGenerator();
    } 
});