// Class A - Base class
class A {
    int sqr;

    // Method to calculate square
    void Square(int p) {
        sqr = p * p;
        System.out.println("Square of " + p + " is: " + sqr);
    }
}

// Class B extends A - Derived class for calculating cube
class B extends A {
    int cub;

    // Method to calculate cube
    void Cube(int p) {
        cub = p * p * p;
        System.out.println("Cube of " + p + " is: " + cub);
    }
}

// Class C extends A - Another derived class for calculating square root
class C extends A {
    double squareRoot;

    // Method to calculate square root
    void SquareRoot(double p) {
        squareRoot = Math.sqrt(p);
        System.out.println("Square root of " + p + " is: " + squareRoot);
    }
}

// Main class to test hierarchical inheritance
public class TreeInheritance {
    public static void main(String[] args) {
        // Creating object of class B
        B leftChild = new B();
        System.out.println("Access through B's object:");
        leftChild.Cube(3);       // Calculating cube using B
        leftChild.Square(5);     // Calculating square using inherited method from A

        // Creating object of class C
        C rightChild = new C();
        System.out.println("Access through C's object:");
        rightChild.Square(7);     // Calculating square using inherited method from A
        rightChild.SquareRoot(49); // Calculating square root using C
    }
}
