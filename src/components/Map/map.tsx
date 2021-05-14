import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import MapMarker from '../../images/MapMarker.png'

const MapLeafLet = () => {
  return (
    <MapContainer 
      center={[51.505, -0.09]}
      zoom={16} 
      style={{ width: '100%', height: "100%", zIndex: 10 }}
      dragging={false}
      touchZoom={false}
      zoomControl={false}
      scrollWheelZoom={false}
      doubleClickZoom={false}
    >
      <TileLayer 
        url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`}
        // url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX}`}
      />
       <Marker position={[51.505, -0.09]} icon={MapMarker}/> 
    </MapContainer>
  )
}

export default MapLeafLet