fn main() {
    let number = 42;

    println!("Checking number: {}", number);

    if number < 0 {
        println!("This number is negative.");
    } else if number == 0 {
        println!("This number is zero.");
    } else if number > 0 && number <= 10 {
        println!("A small positive number.");
    } else if number > 10 && number <= 100 {
        println!("A decent-sized number.");
    } else {
        println!("Whoa, that's a big number!");
    }

    // Nested if-else for practice
    if number % 2 == 0 {
        if number % 3 == 0 {
            println!("Divisible by both 2 and 3.");
        } else {
            println!("Even but not divisible by 3.");
        }
    } else {
        println!("This is an odd number.");
    }
}
