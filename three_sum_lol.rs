pub struct Solution;

impl Solution {
    pub fn three_sum(mut nums: Vec<i32>) -> Vec<Vec<i32>> {
    
       let mut res = Vec::new();
        let n = nums.len();

        if n < 3 {
            return res;
        }

        nums.sort();

        for i in 0..n - 2 {
            if i > 0 && nums[i] == nums[i - 1] {
                continue;
            }

  let mut left = i + 1;
            let mut right = n - 1;

            while left < right {
                let sum = nums[i] + nums[left] + nums[right];
    
    
    
    
    
    
    }
    
    
    
    
    fn main() {
    let nums = vec![-1, 0, 1, 2, -1, -4];
    let result = Solution::three_sum(nums);
    println!("{:?}", result); 
}
