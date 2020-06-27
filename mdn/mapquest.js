var L;

window.onload = function() {
  L.mapquest.key = 'a9LvCQ9nZ8pqbOHaPiCg0C2mZvNjQWFT';

  let map = L.mapquest.map('map', {
    center: [53.480759, -2.242631],
    layers: L.mapquest.tileLayer('map'),
    zoom: 12
  });

  map.addControl(L.mapquest.control({ position: 'bottomright' }));

  L.marker([53.480759, -2.242631], {
    icon: L.mapquest.icons.marker({
      primaryColor: '#22407F',
      secondaryColor: '#3B5998',
      shadow: true,
      size: 'md',
      symbol: 'A'
    })
  })
  .bindPopup('This is Manchester!')
  .addTo(map);
}