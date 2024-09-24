import java.util.Scanner;

public class Quiz {
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        System.out.println("What is the capital of the Philippines?");

        String answer = sc.nextLine();

        System.out.print("Checking");
        for (int i = 0; i < 3; i++) {
            try {
                Thread.sleep(1000);
                System.out.print(".");
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        System.out.println();

        if (answer.equals("Manila")) {
            System.out.println("Correct!");
        } else {
            System.out.println("Incorrect!");
        }

        sc.close();
    }
}