import L from "leaflet";
import {} from "mapbox-gl-leaflet";
import { GridLayer, withLeaflet } from "react-leaflet";

class MapBoxGLLayer extends GridLayer {
  createLeafletElement(props){
    return L.mapboxGL(props);
  }
}

export default withLeaflet(MapBoxGLLayer);  