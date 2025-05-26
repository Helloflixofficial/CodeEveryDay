// Abstract class Animal
abstract class Animal {
    // Abstract method (does not have a body)
    abstract void sound();

    // Concrete method
    void sleep() {
        System.out.println("The animal is sleeping");
    }
}

// Subclass Dog inherits from Animal
class Dog extends Animal {
    // Implementing the abstract method
    void sound() {
        System.out.println("Woof Woof");
    }
}

// Main class
public class Main {
    public static void main(String[] args) {
        Animal myDog = new Dog();
        myDog.sound();  // Calls the Dog's implementation of sound()
        myDog.sleep();  // Calls the inherited sleep() method
    }
}
