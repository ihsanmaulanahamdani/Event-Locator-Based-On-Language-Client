function checkToken() {
  if (!localStorage.getItem('token')) {
    window.location.replace('login.html')
  }
}

function searchEvent() {
  let input = document.getElementById('word').value
  let checkContent = $('#isi')

  if (checkContent) {
    $('#isi').remove()
  }

  axios.get(`https://polar-crag-49447.herokuapp.com/search/${input}`)
  .then(response=>{
    document.getElementById("map").style.visibility = "visible";

    let latitude = response.data.latitude
    let longitude = response.data.longitude

    initMap(latitude, longitude)

    response.data.events.events.forEach(event=>{
      if(event.logo!=null){
        let isi = `<div id='isi' class="d-flex flex-wrap"> </div>`
  
        $('#content').append(isi)

        let newElement = `<div class="card" style="width: 18rem; margin: auto">
                          <img src="${event.logo.original.url}" alt="Norway" style="width:100%" class="w3-hover-opacity">
                            <div class="card-body">
                              <p>
                                <b>${event.name.text}</b>
                              </p>
                              <a href="${event.url}" target="_blank">Description</a> <br>
                            </div>
                          </div>`
        $('#isi').append(newElement)
      }
    })
  })
  .catch(err=>{
    console.log(err)
  })
}

function initMap(lat, lng) {
  var uluru = {
    lat,
    lng
  };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}

window.fbAsyncInit = function () {
  FB.init({
      appId: '609869782709178',
      cookie: true,  
      xfbml: true,  
      version: 'v3.0'
  });

};

(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function logoutFb() {  
  FB.getLoginStatus(function (response) {
    if (response.status === 'connected') {
      FB.logout(function () {
        localStorage.removeItem('token')
        window.location.reload()
      })
    }
  });
}