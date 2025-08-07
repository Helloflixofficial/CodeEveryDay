///Next day am bored
impl Solution {
    pub fn check_inclusion(s1: String, s2: String) -> bool {
        use std::collections::HashMap;

        let len1 = s1.len();
        let len2 = s2.len();

        if len1 > len2 {
            return false;
        }


 let mut count1 = [0; 26];
        for ch in s1.bytes() {
            count1[(ch - b'a') as usize] += 1;
        }

          let mut count2 = [0; 26];
        for ch in s2.bytes().take(len1) {
            count2[(ch - b'a') as usize] += 1;
        }

        if count1 == count2 {
            return true;
        }

        for i in len1..len2 {
            let add = s2.as_bytes()[i];
            let remove = s2.as_bytes()[i - len1];

            count2[(add - b'a') as usize] += 1;
            count2[(remove - b'a') as usize] -= 1;

            if count1 == count2 {
                return true;
            }
        }

        false
    }


      


    }












  fn main() {
    let s1 = "ab".to_string();
    let s2 = "eidbaooo".to_string();
    println!("{}", Solution::check_inclusion(s1, s2)); 
}
