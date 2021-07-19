import axios from "axios"; //lib for simplify XMLHttpRequest
import { Communicator } from "@vidro/map-handler"; //Vidro Software map js library
import parser from "xml2json-light"; //open source XML to JSON, used for parse WMS Info
let clickedPoint = null; //store clicked coordinates for further use

const apiUrl = "<YOUR API URL>";
const user = "<YOUR USER>";
const pwd = "<YOUR USER PASSWORD>";
const customLogo = "<YOUR LOGO URL>";

const layerToLoad = "Arc"; //Layer to be loaded
const zoomLevel = 17;

//DOM Elements
const iframe = document.querySelector("#map-frame");
const infoContainer = document.querySelector("#infoContainer");
const infoContent = document.querySelector("#infoContent");
const closeInfo = document.querySelector("#closeInfo");

//1. Get BMAPS user token
axios
  .post(`${apiUrl}letsgo`, {
    user: user,
    pwd: pwd,
  })
  .then(function (response) {
    console.log(response.data.message);
    const userToken = response.data.message.token;
    //2. Get first user project
    const project_id = response.data.message.projects[0];
    console.log(project_id);
    //3. Get Map
    axios
      .get(`${apiUrl}map/${project_id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
        params: {
          logo: customLogo,
          active_layer: layerToLoad,
          show_layers: layerToLoad,
          zoom: zoomLevel,
        },
      })
      .then(function (response) {
        console.log(response.data.message);
        const sessionToken = response.data.message.sessionToken;
        //4. Load iframe
        iframe.src = `${response.data.message.iframe}?sessionToken=${sessionToken}`;
        //5. Use js lib
        const communicator = new Communicator({
          sessionToken: sessionToken,
        });
        //6. Do WMS info on clickclicked coordinates
        communicator.on("coordinates", function (data) {
          console.info("clicked coordinates", data);
          //create geometry for highlight clicked point and center map
          clickedPoint = `POINT(${data.coordinates[0]} ${data.coordinates[1]})`;
          communicator.infoFromCoordinates("wms", layerToLoad);
        });

        //info event
        communicator.on("info", function (data) {
          console.log("info received", data);
          communicator.clear(); //clear previous higlight geometry
          //highlight click point and center map o it
          communicator.Highlight({
            geom: clickedPoint,
            zoom: { type: "level", zoomLevel: zoomLevel },
          });
          //parse WMS and display Arc Id attributte
          let arc_id = parseWMSInfo(data.data);
          if (arc_id) {
            infoContainer.style.display = "block"; //show info container
            infoContent.innerHTML = `ID: ${parseWMSInfo(data.data)}`;
          } else {
            infoContainer.style.display = "none"; //hide info container in case there's no info
          }
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  })

  .catch(function (error) {
    console.log(error);
  });

//DOM handlers
closeInfo.addEventListener("click", (evt) => {
  infoContainer.style.display = "none";
});

const parseWMSInfo = (data) => {
  //console.log("parseWMSInfo", data);
  try {
    let parsedData = parser.xml2json(data);
    for (
      let i = 0;
      i < parsedData.GetFeatureInfoResponse.Layer.Feature.Attribute.length;
      i++
    ) {
      if (
        parsedData.GetFeatureInfoResponse.Layer.Feature.Attribute[i].name ===
        "arc_id"
      ) {
        return parsedData.GetFeatureInfoResponse.Layer.Feature.Attribute[i]
          .value;
      }
    }
  } catch (e) {
    return false;
  }
};
