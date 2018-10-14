var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics = function(d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function(d, b) {
            d.__proto__ = b;
          }) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
define([
  "require",
  "exports",
  "../util/ModConstant",
  "../core/Modifier",
  "../math/Vector2",
  "../math/Matrix"
], function(require, exports, ModConstant_1, Modifier_1, Vector2_1, Matrix_1) {
  
  Object.defineProperty(exports, "__esModule", { value: true });
  var Bend = /** @class */ (function(_super) {
    __extends(Bend, _super);
    function Bend(f, o, a) {
      if (f === void 0) {
        f = 0;
      }
      if (o === void 0) {
        o = 0.5;
      }
      if (a === void 0) {
        a = 0;
      }
      var _this = _super.call(this) || this;
      _this._constraint = ModConstant_1.ModConstant.NONE;
      _this.switchAxes = false;
      _this._force = f;
      _this._offset = o;
      _this.angle = a;
      return _this;
    }
    Bend.prototype.setModifiable = function(mod) {
      _super.prototype.setModifiable.call(this, mod);
      this.max = this.switchAxes ? mod.midAxis : mod.maxAxis;
      this.min = mod.minAxis;
      this.mid = this.switchAxes ? mod.maxAxis : mod.midAxis;
      this.width = mod.getSize(this.max);
      this.height = mod.getSize(this.mid);
      this.origin = mod.getMin(this.max);
      this._diagAngle = Math.atan(this.width / this.height);
    };
    Object.defineProperty(Bend.prototype, "force", {
      get: function() {
        return this._force;
      },
      set: function(f) {
        this._force = f;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Bend.prototype, "constraint", {
      get: function() {
        return this._constraint;
      },
      set: function(c) {
        this._constraint = c;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Bend.prototype, "offset", {
      get: function() {
        return this._offset;
      },
      set: function(offset) {
        this._offset = offset;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Bend.prototype, "diagAngle", {
      get: function() {
        return this._diagAngle;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Bend.prototype, "angle", {
      get: function() {
        return this._angle;
      },
      set: function(a) {
        this._angle = a;
        this.m1 = new Matrix_1.Matrix(1, 0, 0, 1);
        this.m1.rotate(this._angle);
        this.m2 = new Matrix_1.Matrix(1, 0, 0, 1);
        this.m2.rotate(-this._angle);
      },
      enumerable: true,
      configurable: true
    });
    Bend.prototype.apply = function() {
      if (this.force == 0) return;
      var vs = this.mod.getVertices();
      var vc = vs.length;
      var distance = this.origin + this.width * this.offset;
      var radius = this.width / Math.PI / this.force;
      var bendAngle = Math.PI * 2 * (this.width / (radius * Math.PI * 2));
      for (var i = 0; i < vc; i++) {
        var v = vs[i];
        var vmax = v.getValue(this.max);
        var vmid = v.getValue(this.mid);
        var vmin = v.getValue(this.min);
        var np = this.m1.transformPoint(new Vector2_1.Vector2(vmax, vmid));
        vmax = np.x;
        vmid = np.y;
        var p = (vmax - this.origin) / this.width;
        if (
          (this.constraint == ModConstant_1.ModConstant.LEFT &&
            p <= this.offset) ||
          (this.constraint == ModConstant_1.ModConstant.RIGHT &&
            p >= this.offset)
        ) {
        } else {
          var fa = Math.PI / 2 - bendAngle * this.offset + bendAngle * p;
          var op = Math.sin(fa) * (radius + vmin);
          var ow = Math.cos(fa) * (radius + vmin);
          vmin = op - radius;
          vmax = distance - ow;
        }
        var np2 = this.m2.transformPoint(new Vector2_1.Vector2(vmax, vmid));
        vmax = np2.x;
        vmid = np2.y;
        v.setValue(this.max, vmax);
        v.setValue(this.mid, vmid);
        v.setValue(this.min, vmin);
      }
    };
    return Bend;
  })(Modifier_1.Modifier);
  exports.Bend = Bend;
});
