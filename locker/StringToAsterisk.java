import java.util.Random;
import java.util.Scanner;

public class StringToAsterisk {
    // ANSI color codes
    public static final String RESET = "\u001B[0m";
    public static final String RED = "\u001B[31m";
    public static final String GREEN = "\u001B[32m";
    public static final String YELLOW = "\u001B[33m";
    public static final String BLUE = "\u001B[34m";
    public static final String PURPLE = "\u001B[35m";
    public static final String CYAN = "\u001B[36m";
    public static final String WHITE = "\u001B[37m";

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter your input: ");
        String input = scanner.nextLine();
        input = input.toUpperCase();

        // Detailed patterns for letters and numbers
        String[][] patterns = {
                { "    *    ", "   * *   ", "  *   *  ", " *     * ", " ******* ", "*       *", "*       *",
                        "*       *", "*       *" }, // A
                { "******   ", "*     *  ", "*     *  ", "******   ", "*     *  ", "*     *  ", "*     *  ",
                        "*     *  ", "******   " }, // B
                { "  *****  ", " *       ", "*        ", "*        ", "*        ", "*        ", "*        ",
                        " *       ", "  *****  " }, // C
                { "******   ", "*     *  ", "*      * ", "*      * ", "*      * ", "*      * ", "*      * ",
                        "*     *  ", "******   " }, // D
                { "*********", "*        ", "*        ", "*        ", "*********", "*        ", "*        ",
                        "*        ", "*********" }, // E
                { "*********", "*        ", "*        ", "*           ", "*********", "*        ", "*        ",
                        "*        ", "*        " }, // F
                { "  *****  ", " *       ", "*        ", "*        ", "*   **** ", "*      * ", "*      * ",
                        " *     * ", "  *****  " }, // G
                { "*       *", "*       *", "*       *", "*       *", "*********", "*       *", "*       *",
                        "*       *", "*       *" }, // H
                { "*********", "    *    ", "    *    ", "    *    ", "    *    ", "    *    ", "    *    ",
                        "    *    ", "*********" }, // I
                { "*********", "      *  ", "      *  ", "      *  ", "      *  ", "      *  ", "      *  ",
                        "*     *  ", " *****   " }, // J
                { "*     *  ", "*    *   ", "*   *    ", "*  *     ", "*****    ", "*  *     ", "*   *    ",
                        "*    *   ", "*     *  " }, // K
                { "*        ", "*        ", "*        ", "*        ", "*        ", "*        ", "*        ",
                        "*        ", "*********" }, // L
                { "*       *", "**     **", "* *   * *", "*  * *  *", "*   *   *", "*       *", "*       *",
                        "*       *", "*       *" }, // M
                { "*       *", "**      *", "* *     *", "*  *    *", "*   *   *", "*    *  *", "*     * *",
                        "*      **", "*       *" }, // N
                { "  *****  ", " *     * ", "*       *", "*       *", "*       *", "*       *", "*       *",
                        " *     * ", "  *****  " }, // O
                { "******   ", "*     *  ", "*     *  ", "*     *  ", "******   ", "*        ", "*        ",
                        "*        ", "*        " }, // P
                { "  *****  ", " *     * ", "*       *", "*       *", "*       *", "*       *", "*     * *",
                        " *     * ", "  ***** *" }, // Q
                { "******   ", "*     *  ", "*     *  ", "*     *  ", "******   ", "*   *    ", "*    *   ",
                        "*     *  ", "*      * " }, // R
                { "  *****  ", "*        ", "*        ", "*        ", "  *****  ", "       * ", "       * ",
                        "       * ", "  *****  " }, // S
                { "*********", "    *    ", "    *    ", "    *    ", "    *    ", "    *    ", "    *    ",
                        "    *    ", "    *    " }, // T
                { "*       *", "*       *", "*       *", "*       *", "*       *", "*       *", "*       *",
                        " *     * ", "  *****  " }, // U
                { "*       *", "*       *", "*       *", "*       *", "*       *", "*       *", " *     * ",
                        "  *   *  ", "   ***   " }, // V
                { "*       *", "*       *", "*       *", "*       *", "*   *   *", "*  * *  *", "* *   * *",
                        "**     **", "*       *" }, // W
                { "*       *", " *     * ", "  *   *  ", "   * *   ", "    *    ", "   * *   ", "  *   *  ",
                        " *     * ", "*       *" }, // X
                { "*       *", " *     * ", "  *   *  ", "   * *   ", "    *    ", "    *    ", "    *    ",
                        "    *    ", "    *    " }, // Y
                { "*********", "       * ", "      *  ", "     *   ", "    *    ", "   *     ", "  *      ",
                        " *       ", "*********" }, // Z
                { "  *****  ", " *     * ", "*       *", "*       *", "*       *", "*       *", "*       *",
                        " *     * ", "  *****  " }, // 0
                { "    *    ", "   **    ", "  * *    ", "    *    ", "    *    ", "    *    ", "    *    ",
                        "    *    ", "*********" }, // 1
                { "  *****  ", " *     * ", "       * ", "      *  ", "     *   ", "    *    ", "   *     ",
                        "  *      ", "*********" }, // 2
                { "*********", "       * ", "      *  ", "     *   ", "  *****  ", "     *   ", "      *  ",
                        "       * ", "*********" }, // 3
                { "*       *", "*       *", "*       *", "*       *", "*********", "        *", "        *",
                        "        *", "        *" }, // 4
                { "*********", "*        ", "*        ", "*        ", "*********", "       * ", "       * ",
                        "       * ", "*********" }, // 5
                { "  *****  ", " *       ", "*        ", "*        ", "******** ", "*       *", "*       *",
                        " *     * ", "  *****  " }, // 6
                { "*********", "       * ", "      *  ", "     *   ", "    *    ", "   *     ", "  *      ",
                        " *       ", "*        " }, // 7
                { "  *****  ", " *     * ", "*       *", " *     * ", "  *****  ", " *     * ", "*       *",
                        " *     * ", "  *****  " }, // 8
                { "  *****  ", " *     * ", "*       *", " *     * ", "  *****  ", "       * ", "       * ",
                        "      *  ", "  *****  " } // 9
        };

        String[] SPACE = {
                "         ", "         ", "         ", "         ", "         ", "         ", "         ", "         ",
                "         "
        };

        // Iterate over the rows of the patterns
        Random random = new Random();
        for (int i = 0; i < 9; i++) { // Adjusted to 9 rows
            for (char c : input.toCharArray()) {
                String color = getRandomColor(random);
                if (c >= 'A' && c <= 'Z') {
                    System.out.print(color + patterns[c - 'A'][i] + RESET + "  ");
                } else if (c >= '0' && c <= '9') {
                    System.out.print(color + patterns[c - '0' + 26][i] + RESET + "  "); // Offset to get digits
                } else {
                    System.out.print(SPACE[i] + "  ");
                }
            }
            System.out.println();
        }

        scanner.close();
    }

    // Method to get a random color
    private static String getRandomColor(Random random) {
        String[] colors = { RED, GREEN, YELLOW, BLUE, PURPLE, CYAN, WHITE };
        return colors[random.nextInt(colors.length)];
    }
}