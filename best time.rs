fn max_profit(prices: Vec<i32>) -> i32 {
    let mut min_price = i32::MAX;
    let mut max_profit = 0;

    for price in prices {
        if price < min_price {
            min_price = price;
        } else if price - min_price > max_profit {
            max_profit = price - min_price;
        }
    }

    max_profit
}

fn main() {
    let prices = vec![7, 1, 5, 3, 6, 4];
    println!("Max Profit: {}", max_profit(prices)); // Output Is Five!
}
