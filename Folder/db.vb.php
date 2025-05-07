Imports System.Data.SqlClient

Module InsertRecordExample
    Sub Main()

       
 Dim connectionString As String = "Data Source=YOUR_SERVER_NAME;Initial Catalog=YourDatabaseName;Integrated Security=True"
        ' Collect data to insert
        Console.Write("Enter Student Name: ")
        Dim name As String = Console.ReadLine()

        Console.Write("Enter Student Age: ")
        Dim age As Integer = Integer.Parse(Console.ReadLine())

        ' Define SQL insert query
        Dim query As String = "INSERT INTO Students (Name, Age) VALUES (@Name, @Age)"

        ' Create and use connection
        Using conn As New SqlConnection(connectionString)
            Try
                conn.Open()
                Using cmd As New SqlCommand(query, conn)
                    ' Add parameters to avoid SQL injection
                    cmd.Parameters.AddWithValue("@Name", name)
                    cmd.Parameters.AddWithValue("@Age", age)

                    ' Execute query
                    Dim rowsInserted As Integer = cmd.ExecuteNonQuery()

                    ' Confirm insertion
                    If rowsInserted > 0 Then
                        Console.WriteLine("Record inserted successfully.")
                    Else
                        Console.WriteLine("Insertion failed.")
                    End If
                End Using
            Catch ex As Exception
                Console.WriteLine("Error: " & ex.Message)
            End Try
        End Using

        Console.ReadLine()
    End Sub
End Module















Module ArrayExample
    Sub Main()
        Dim numbers() As Integer = {12, 45, 67, 3, 89, 22}
        Dim max As Integer = numbers(0)
        Dim min As Integer = numbers(0)

        For Each num As Integer In numbers
          
            If num > max Then
                max = num
                
                
            End If
            If num < min Then
                min = num
                
            End If
        Next
        Console.WriteLine("Maximum element: " & max)
        Console.WriteLine("Minimum element: " & min)
    End Sub
End Module

