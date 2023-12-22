import {
  WebPlugin
} from "./chunk-IGYLX5MJ.js";
import "./chunk-A6UBFJWH.js";

// ../../node_modules/@capacitor/geolocation/dist/esm/web.js
var GeolocationWeb = class extends WebPlugin {
  async getCurrentPosition(options) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((pos) => {
        resolve(pos);
      }, (err) => {
        reject(err);
      }, Object.assign({ enableHighAccuracy: false, timeout: 1e4, maximumAge: 0 }, options));
    });
  }
  async watchPosition(options, callback) {
    const id = navigator.geolocation.watchPosition((pos) => {
      callback(pos);
    }, (err) => {
      callback(null, err);
    }, Object.assign({ enableHighAccuracy: false, timeout: 1e4, maximumAge: 0 }, options));
    return `${id}`;
  }
  async clearWatch(options) {
    window.navigator.geolocation.clearWatch(parseInt(options.id, 10));
  }
  async checkPermissions() {
    if (typeof navigator === "undefined" || !navigator.permissions) {
      throw this.unavailable("Permissions API not available in this browser");
    }
    const permission = await window.navigator.permissions.query({
      name: "geolocation"
    });
    return { location: permission.state, coarseLocation: permission.state };
  }
  async requestPermissions() {
    throw this.unimplemented("Not implemented on web.");
  }
};
var Geolocation = new GeolocationWeb();
export {
  Geolocation,
  GeolocationWeb
};
//# sourceMappingURL=web-36VCT6RF.js.map
