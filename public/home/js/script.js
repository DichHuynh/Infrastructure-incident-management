var mymap = L.map('mapid').setView([16.0669077, 108.2137987], 19); // Đặt vị trí trung tâm
// Thêm Tile Layer từ OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 19
}).addTo(mymap);

// Thêm Marker tại vị trí trung tâm
L.marker([16.0669077, 108.2137987]).addTo(mymap)
  .bindPopup('Đây là vị trí trung tâm.')
  .openPopup();