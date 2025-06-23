struct Stack<T> {
    items: Vec<T>,
}

impl<T> Stack<T> {
    // Create a new empty stack
    fn new() -> Self {
        Stack { items: Vec::new() }
    }

    // Push an item onto the stack
    fn push(&mut self, item: T) {
        self.items.push(item);
    }

    // Pop an item off the stack (returns Option<T>)
    fn pop(&mut self) -> Option<T> {
        self.items.pop()
    }

    // Peek at the top item (without removing it)
    fn peek(&self) -> Option<&T> {
        self.items.last()
    }

    // Check if the stack is empty
    fn is_empty(&self) -> bool {
        self.items.is_empty()
    }

    // Get current size of the stack
    fn size(&self) -> usize {
        self.items.len()
    }
}

fn main() {
    let mut stack = Stack::new();

    // Push some items
    stack.push(10);
    stack.push(20);
    stack.push(30);

    println!("Top of stack: {:?}", stack.peek()); // Some(30)
    println!("Stack size: {}", stack.size());     // 3

    // Pop items
    println!("Popped: {:?}", stack.pop());        // Some(30)
    println!("Top after pop: {:?}", stack.peek()); // Some(20)

    // Check if stack is empty
    println!("Is stack empty? {}", stack.is_empty()); // false
}
