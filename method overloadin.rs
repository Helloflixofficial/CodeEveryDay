// Trait that simulates the 'add' functionality
trait AddNumbers {
    fn add(&self) -> i32;
}

// Implementing 'add' for two integers
impl AddNumbers for (i32, i32) {
    fn add(&self) -> i32 {
        self.0 + self.1
    }
}

// Implementing 'add' for three integers
impl AddNumbers for (i32, i32, i32) {
    fn add(&self) -> i32 {
        self.0 + self.1 + self.2
    }
}

// Implementing 'add' for two floating-point numbers
impl AddNumbers for (f64, f64) {
    fn add(&self) -> i32 {
        (self.0 + self.1) as i32
    }
}

fn main() {
    // Using the 'add' method for two integers
    let sum1 = (5, 10).add();
    println!("Sum of two integers: {}", sum1);

    // Using the 'add' method for three integers
    let sum2 = (5, 10, 15).add();
    println!("Sum of three integers: {}", sum2);

    // Using the 'add' method for two floating-point numbers
    let sum3 = (5.5, 10.5).add();
    println!("Sum of two doubles (rounded to integer): {}", sum3);
}
