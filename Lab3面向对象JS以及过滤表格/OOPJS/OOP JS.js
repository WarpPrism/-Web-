//Homework 1

function Base(arg) {
	this.instanceVariable = arg;
}
Base.prototype.instanceMethod = function() {
	console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
}
Base.staticVariable = "Base";
Base.staticMethod = function() {
	console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
}

function Derived(arg) {
	this.instanceVariable = arg;
}
Derived.staticVariable = "Derived";

function extend(base, derived) {
	derived.prototype.instanceMethod = function() {
		base.prototype.instanceMethod.call(this);
		console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
	}
	derived.staticMethod = function() {
		base.staticMethod.call(this);
		console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
	}
}
extend(Base, Derived);


console.log("\nTest 1\n");
example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();
delete example;

console.log("\n----------------------------我是华丽丽的分割线----------------------------\n");
console.log("\nTest 2\n");
example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();