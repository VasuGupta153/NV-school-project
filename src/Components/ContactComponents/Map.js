import React, {useState} from "react"
import ReactMapGL, {Marker, Popup} from "react-map-gl"
import mapIcon from "../../images/map-icon.svg"

const Map = () => {
    
    const [selectedSchool, setSelectedSchool] = useState(false);

    const [viewport, setViewport] = useState({
        latitude: 29.922011,
        longitude: 77.301186,
        zoom: 10,
        width: "100%",

        height: "65vh"
    })

    return(
        <div>
            <ReactMapGL 
            {...viewport} 
            mapboxApiAccessToken={process.env.REACT_APP_MAP_API}
            mapStyle="mapbox://styles/ayugupcse123/ckdl6cvrt1tco1iph0t9gcq3k"
            onViewportChange={viewport => {
                setViewport(viewport);
            }}
            >
                <Marker 
                    latitude = {29.922011}
                    longitude = {77.301186}
                >
                    <button
                    style={{background: "transparent", border: "none", cursor: "pointer"}}
                    onClick={e=>{
                        e.preventDefault();
                        setSelectedSchool(true);
                    }}
                    >
                        <img src={mapIcon} alt=""></img>
                    </button>
                </Marker>
                
                {selectedSchool ? (
                    <Popup
                    latitude = {29.922011}
                    longitude = {77.301186}
                    onClose={()=>{
                        setSelectedSchool(false);
                    }}
                >
                    <div>
                        <h2 style={{margin: "0"}}>N.V. Recent Public School</h2>
                    </div>
                </Popup>
                ) : null}
            </ReactMapGL>
        </div>
    )
}


export default Map;