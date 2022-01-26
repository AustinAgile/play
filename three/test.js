class Plane {
	facingDirection = [0,0,0];
	originOffset = [0,0,0];
	rotationZ = 0;

	constructor(name) {
		this.name = name;
		return this;
	}
	setFacingDirection(direction) {
		this.facingDirection = direction;
		return this;
	}
	setOriginOffset(offset) {
		this.originOffset = offset;
		return this;
	}
	setRotationZ(angle) {
		this.rotationZ = angle;
		return this;
	}
	isFacingNorth() {
		return _.isEqual(this.facingDirection, [1,0,0]);
	}
	isFacingSouth() {
		return _.isEqual(this.facingDirection, [-1,0,0]);
	}
	isFacingEast() {
		return _.isEqual(this.facingDirection, [0,-1,0]);
	}
	isFacingWest() {
		return _.isEqual(this.facingDirection, [0,1,0]);
	}
	isFacingNorthSouth() {
		return this.facingDirection[0] != 0;
	}
	isFacingEastWest() {
		return this.facingDirection[1] != 0;
	}
	getProjectionFromAngle(h) {
		return h * Math.cos(this.rotationZ*Math.PI/180);
	}
	getProjectionToAngle(h) {
		return h / Math.cos(this.rotationZ*Math.PI/180);
	}
	getProjectionHorizontalFrom(h, from) {
		var projectedHorizontalOffset = from.getProjectionToAngle(h) - (this.originOffset[0] - from.originOffset[0]);
		projectedHorizontalOffset -= (this.originOffset[1] - from.originOffset[1]) * Math.tan(from.rotationZ*Math.PI/180);
		return this.getProjectionFromAngle(projectedHorizontalOffset);
	}
	getPointInSpace(pointOnPlane) {
		return {
			x: pointOnPlane * Math.cos(this.rotationZ*Math.PI/180) + this.originOffset[0],
			y: pointOnPlane * Math.sin(this.rotationZ*Math.PI/180) + this.originOffset[1],
		};
	}
}

class WallSystem {
	name;
	plane;
	exterior = {color: {}};
	interior = {color: {}};
	surfaces = {};
	interiorHorizontal = {color: {}, surfaces: {}};
	windows = {};

	constructor(name) {
		this.name = name;
		return this;
	}

	setPlane(plane) {
		this.plane = plane;
		return this;
	}

	setExteriorMaterial(material) {
		this.exterior.color = material;
		return this;
	}

	setInteriorMaterial(material) {
		this.interior.color = material;
		return this;
	}
	setInteriorHorizontalMaterial(material) {
		this.interiorHorizontal.color = material;
		return this;
	}

	setOpacity(opacity) {
		this.opacity = opacity;
		return this;
	}

	addExteriorSurface(wall) {
		// console.log("addExteriorSurface");
		// console.log(wall);
		wall.parent = this;
		if (!wall.hasOwnProperty("color")) {wall.color = this.exterior.color;}
		// if (!wall.hasOwnProperty("windows")) {wall.windows = new Windows();}
		if (!wall.hasOwnProperty("rotation")) {wall.rotation = {x: 0, y: 0, z: 0};}
		if (!wall.hasOwnProperty("plane")) {wall.setPlane(this.plane);}
		this.surfaces[wall.name] = wall;
		return this;
	}

	addInteriorSurface(wall) {
		wall.parent = this;
		if (!wall.hasOwnProperty("color")) {wall.color = this.interior.color;}
		// if (!wall.hasOwnProperty("windows")) {wall.windows = new Windows();}
		if (!wall.hasOwnProperty("rotation")) {wall.rotation = {x: 0, y: 0, z: 0};}
		if (!wall.hasOwnProperty("plane")) {
			// console.log("here");
			wall.setPlane(this.plane);
		}
		wall.flip();
		this.surfaces[wall.name] = wall;
		return this;
	}

	addInteriorHorizontalSurface(floor) {
		floor.parent = this;
		// if (!floor.hasOwnProperty("color")) {floor.color = this.interiorHorizontal.color;}
		// if (!floor.hasOwnProperty("windows")) {floor.windows = new Windows();}
		if (!floor.hasOwnProperty("color")) {floor.color = this.interior.color;}
		if (!floor.hasOwnProperty("rotation")) {floor.rotation = {x: 90, y: 0, z: 0};}
		if (!floor.hasOwnProperty("plane")) {floor.setPlane(this.plane);}
		this.surfaces[floor.name] = floor;
		return this;
	}
	addHorizontalSurface(surface) {
		surface.parent = this;
		if (!surface.hasOwnProperty("color")) {surface.color = this.interior.color;}
		if (!surface.hasOwnProperty("rotation")) {surface.rotation = {x: -90, y: 0, z: 0};}
		if (!surface.hasOwnProperty("plane")) {surface.setPlane(this.plane);}
		this.surfaces[surface.name] = surface;
		return this;
	}

	addWindow(window) {
		this.windows[window.name] = window;
		return this;
	}

	call(f) {
		f.apply(null, _.concat([this], _.drop(arguments)));
		return this;
	}
}

class Surface {
	name = "";
	size = {w:0, h:0, dw:0};
	offset = {x:0, y:0, z:0, dx:0, dy:0, dz:0};
	mirror = false;
	parent = false;
	pointsInSpace = [];
	constructor(name) {
		this.name = name;
		return this;
	};
	setProperties(properties) {
		_.merge(this, properties);
		return this;
	};
	setParent(parent) {
		this.parent = parent;
		return this;
	}
	setPlane(plane) {
		this.plane = plane;
		if (this.plane.facingDirection[0] > 0 || this.plane.facingDirection[1] > 0) {this.flip();}
		return this;
	}
	setSize(size) {
		this.size = _.merge({w:0, h:0, dw:0}, size);
		return this;
	}
	setOffset(offset) {
		this.offset = _.merge({x:0, y:0, z:0, dx:0, dy:0, dz:0}, offset);
		return this;
	}
	setRotation(rotation) {
		// console.log("setRotation");
		// console.log(this);
		this.rotation = rotation;
		return this;
	}
	setWindows(windows) {
		this.windows = windows;
		return this;
	}
	setOn(on) {
		this.on = on;
		this.setPlane(on.plane);
		// console.log("settin on");
		// console.log(on);
		// console.log(this);
		// console.log(this.parent);
		// this.plane = this.parent.walls[on].plane;
		return this;
	}
	setMaterial(material) {
		this.color = material;
		return this;
	}
	setBevel(bevel) {
		this.bevel = bevel;
		return this;
	}
	setMirror(mirror) {
		this.mirror = mirror;
		return this;
	}
	flip() {
		this.mirror = !this.mirror;
		return this;
	}
	addPointInSpace(point) {
		this.pointsInSpace.push(point);
		return this;
	}
	call(f) {
		f(this);
		return this;
	}
};

class Window {
	name = "";
	size = {};
	offset = {};
	constructor(name) {
		this.name = name;
		return this;
	};
	setSize(size) {
		this.size = size;
		return this;
	};
	//This is the offset from the origin of the plane, not any of the walls.
	setOffset(offset) {//rename to PlaneOriginOffset
		this.offset = offset;
		return this;
	};
};

class Windows {
	wallSystem;
	names = [];
	jambs = [];
	constructor(names) {
		this.wallSystem = false;
		if (!names) {names = [];}
		return this.setNames(names);
	};
	setNames(names) {
		this.names = names;
		return this;
	};
	setWall(wall) {
		this.wall = wall;
		this.wallSystem = wall.parent;
		return this;
	};
	setJambsAll() {
		this.jambs = this.names;
		return this;
	};
};

export { Plane, WallSystem, Surface, Window, Windows };
