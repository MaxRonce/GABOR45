import {
  createEvent,
  h,
  registerInstance
} from "./chunk-MHQRHQ7X.js";
import "./chunk-A6UBFJWH.js";

// ../../node_modules/@ionic/pwa-elements/dist/esm-es5/pwa-camera-modal.entry.js
var __awaiter = function(t, e, n, r) {
  function o(t2) {
    return t2 instanceof n ? t2 : new n(function(e2) {
      e2(t2);
    });
  }
  return new (n || (n = Promise))(function(n2, i) {
    function a(t2) {
      try {
        c(r.next(t2));
      } catch (t3) {
        i(t3);
      }
    }
    function s(t2) {
      try {
        c(r["throw"](t2));
      } catch (t3) {
        i(t3);
      }
    }
    function c(t2) {
      t2.done ? n2(t2.value) : o(t2.value).then(a, s);
    }
    c((r = r.apply(t, e || [])).next());
  });
};
var __generator = function(t, e) {
  var n = { label: 0, sent: function() {
    if (i[0] & 1)
      throw i[1];
    return i[1];
  }, trys: [], ops: [] }, r, o, i, a;
  return a = { next: s(0), throw: s(1), return: s(2) }, typeof Symbol === "function" && (a[Symbol.iterator] = function() {
    return this;
  }), a;
  function s(t2) {
    return function(e2) {
      return c([t2, e2]);
    };
  }
  function c(s2) {
    if (r)
      throw new TypeError("Generator is already executing.");
    while (a && (a = 0, s2[0] && (n = 0)), n)
      try {
        if (r = 1, o && (i = s2[0] & 2 ? o["return"] : s2[0] ? o["throw"] || ((i = o["return"]) && i.call(o), 0) : o.next) && !(i = i.call(o, s2[1])).done)
          return i;
        if (o = 0, i)
          s2 = [s2[0] & 2, i.value];
        switch (s2[0]) {
          case 0:
          case 1:
            i = s2;
            break;
          case 4:
            n.label++;
            return { value: s2[1], done: false };
          case 5:
            n.label++;
            o = s2[1];
            s2 = [0];
            continue;
          case 7:
            s2 = n.ops.pop();
            n.trys.pop();
            continue;
          default:
            if (!(i = n.trys, i = i.length > 0 && i[i.length - 1]) && (s2[0] === 6 || s2[0] === 2)) {
              n = 0;
              continue;
            }
            if (s2[0] === 3 && (!i || s2[1] > i[0] && s2[1] < i[3])) {
              n.label = s2[1];
              break;
            }
            if (s2[0] === 6 && n.label < i[1]) {
              n.label = i[1];
              i = s2;
              break;
            }
            if (i && n.label < i[2]) {
              n.label = i[2];
              n.ops.push(s2);
              break;
            }
            if (i[2])
              n.ops.pop();
            n.trys.pop();
            continue;
        }
        s2 = e.call(t, n);
      } catch (t2) {
        s2 = [6, t2];
        o = 0;
      } finally {
        r = i = 0;
      }
    if (s2[0] & 5)
      throw s2[1];
    return { value: s2[0] ? s2[1] : void 0, done: true };
  }
};
var cameraModalCss = ":host{z-index:1000;position:fixed;top:0;left:0;width:100%;height:100%;display:-ms-flexbox;display:flex;contain:strict}.wrapper{-ms-flex:1;flex:1;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;background-color:rgba(0, 0, 0, 0.15)}.content{-webkit-box-shadow:0px 0px 5px rgba(0, 0, 0, 0.2);box-shadow:0px 0px 5px rgba(0, 0, 0, 0.2);width:600px;height:600px}";
var PWACameraModal = function() {
  function t(t2) {
    registerInstance(this, t2);
    this.onPhoto = createEvent(this, "onPhoto", 7);
    this.noDeviceError = createEvent(this, "noDeviceError", 7);
    this.facingMode = "user";
  }
  t.prototype.present = function() {
    return __awaiter(this, void 0, void 0, function() {
      var t2;
      var e = this;
      return __generator(this, function(n) {
        t2 = document.createElement("pwa-camera-modal-instance");
        t2.facingMode = this.facingMode;
        t2.addEventListener("onPhoto", function(t3) {
          return __awaiter(e, void 0, void 0, function() {
            var e2;
            return __generator(this, function(n2) {
              if (!this._modal) {
                return [2];
              }
              e2 = t3.detail;
              this.onPhoto.emit(e2);
              return [2];
            });
          });
        });
        t2.addEventListener("noDeviceError", function(t3) {
          return __awaiter(e, void 0, void 0, function() {
            return __generator(this, function(e2) {
              this.noDeviceError.emit(t3);
              return [2];
            });
          });
        });
        document.body.append(t2);
        this._modal = t2;
        return [2];
      });
    });
  };
  t.prototype.dismiss = function() {
    return __awaiter(this, void 0, void 0, function() {
      return __generator(this, function(t2) {
        if (!this._modal) {
          return [2];
        }
        this._modal && this._modal.parentNode.removeChild(this._modal);
        this._modal = null;
        return [2];
      });
    });
  };
  t.prototype.render = function() {
    return h("div", null);
  };
  return t;
}();
PWACameraModal.style = cameraModalCss;
export {
  PWACameraModal as pwa_camera_modal
};
//# sourceMappingURL=pwa-camera-modal.entry-QF4OP6BA.js.map
