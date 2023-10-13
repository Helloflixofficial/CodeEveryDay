#include <iostream>

int main() {
    int rowCount, colCount;

    std::cout << "Enter the number of rows: ";
    std::cin >> rowCount;
    std::cout << "Enter the number of columns: ";
    std::cin >> colCount;

    int arr[rowCount][colCount];
    int count = 0;

    // Input phase
    std::cout << "Enter the elements of the array:" << std::endl;
    for (int i = 0; i < rowCount; i++) {
        for (int j = 0; j < colCount; j++) {
            std::cin >> arr[i][j];
        }
    }

    // Count phase
    for (int i = 0; i < rowCount; i++) {
        for (int j = 0; j < colCount; j++) {
            if (arr[i][j] % 5 == 0) {
                count++;
            }
        }
    }

    // Display the count
    std::cout << "Count of elements divisible by 5: " << count << std::endl;

    return 0;
}
