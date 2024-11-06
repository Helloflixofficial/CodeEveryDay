 // Overloaded methods
class MathOperations {
    int add(int a, int b) {
        return a + b;
    }
    
    double add(double a, double b) {
        return a + b;
    }
    
    int add(int a, int b, int c) {
        return a + b + c;
    }
}

public class Main {
    public static void main(String[] args) {
        MathOperations math = new MathOperations();
        System.out.println("Sum of two integers: " + math.add(10, 20));         // Calls add(int, int)
        System.out.println("Sum of two doubles: " + math.add(5.5, 3.3));        // Calls add(double, double)
        System.out.println("Sum of three integers: " + math.add(1, 2, 3));      // Calls add(int, int, int)
    }
}
