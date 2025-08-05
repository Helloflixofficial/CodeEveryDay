// allready solved practice 

struct Solution;

impl Solution {
    pub fn most_words_found(sentences: Vec<String>) -> i32 {
        sentences
            .iter()
            .map(|s| s.split_whitespace().count() as i32)
            .max()
            .unwrap_or(0)
    }
}

fn main() {
    let sentences = vec![
        String::from("alice and bob love leetcode"),
        String::from("i think so too"),
        String::from("this is great thanks very much"),
    ];

    let result = Solution::most_words_found(sentences);
    println!("Maximum number of words in a sentence: {}", result);
}
