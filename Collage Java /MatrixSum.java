import java.util.Scanner;

public class MatrixSum {
    public static void main(String[] args) {
        int row, col;
        Scanner s1 = new Scanner(System.in);
        System.out.println("Enter the value of rows");
        row = s1.nextInt();
        System.out.println("Enter the value of Columns");
        col = s1.nextInt();
        int[][] arr = new int[row][col];
        System.out.println("Enter the Elements");

        for (int i = 0; i < row; i++) {
            for (int j = 0; j < col; j++) {
                arr[i][j] = s1.nextInt();
            }
        }
        for (int i = 0; i < row; i++) {
            for (int j = 0; j < col; j++) {
                System.out.println(arr[i][j] + " ");
            }
            System.out.println();
        }
        for (int i = 0; i < row; i++) {
            int sum = 0;
            for (int j = 0; j < col; j++) {
                sum = sum + arr[i][j];
            }
            System.out.println("Sum of row " + (i + 1) + ":" + sum);
        }
        s1.close();
    }
}
