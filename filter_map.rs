fn main(){
let v1 = vec![1,2,3,4,5];
let v2 = v1.iter().filter_map(|i| {
    match i {
        1..=3 => Some(i),
        _=> None,
    }
}).collect::<Vec<_>>();

println!("{:?}",v2);
}

