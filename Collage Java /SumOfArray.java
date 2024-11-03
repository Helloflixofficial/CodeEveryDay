// Class to find the sum of array elements
class SumOfArray {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5}; // Array elements
        int i = 0, sum = 0;

        // While loop to calculate the sum of array elements
        while (i < arr.length) {
            sum = sum + arr[i];
            // System.out.println("the data is : " + sum);
            i++;
        }

        System.out.println("Sum of Array: " + sum);
    }
}
