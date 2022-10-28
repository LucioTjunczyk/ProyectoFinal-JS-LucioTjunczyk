function iniciarMap(){
    const coord = {lat: 21.226643573619572 ,lng: -86.8679628139206};

    const localizaciones = [
        {lat: 21.226643573619572 ,lng: -86.8679628139206},
        {lat: 20.250784748089515 ,lng: -87.4574133574841},
        {lat: 21.53707115199958 ,lng: -87.2876051251322},
        {lat: 18.77824025947084 ,lng: -88.40978823305994},
        {lat: 21.090425732154113 ,lng: -89.6172203711269}
    ]

    
    var map = new google.maps.Map(document.getElementById('map'),{
      zoom: 7,
      center: coord
    });

    for(i = 0; i < localizaciones.length; i++){
        var marker = new google.maps.Marker({
        position: localizaciones[i],     
        map: map
        });
    }  
}

// Cancún {lat: 21.226643573619572 ,lng: -86.8679628139206}
// Tulum {lat: 20.250784748089515 ,lng: -87.4574133574841}
// Holbox {lat: 21.53707115199958 ,lng: -87.2876051251322}
// Bacalar {lat: 18.77824025947084 ,lng: -88.40978823305994}
// Merida {lat: 21.090425732154113 ,lng: -89.6172203711269}

