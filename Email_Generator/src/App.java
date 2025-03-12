public class App extends javax.swing.JFrame{    // when ActionListener is implemented then, actionPerformed(ActionEvent e) has to be implemented

    public static void main(String[] args) throws Exception {
        // from the App class which is frame of the GUI
        // we operate and customize it from this main method
        // create new LoginOpen class that can display the login window
        new LoginOpen().loginOpen();
    }
}
// new comment 2/15