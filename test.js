class Person {
  constructor(name) {
    this.name = name
  }
  
  getName() {
    console.log(this.name)
  }
}

class Animal {
  constructor(kind) {
    this.kind = kind
  }
  
  bark() {
    console.log(this.kind)
  }
}

export {
  Animal
};

export default Person;