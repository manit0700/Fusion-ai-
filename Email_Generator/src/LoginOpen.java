public class LoginOpen extends javax.swing.JFrame{

    public void loginOpen(){
        Login LoginFrame = new Login();
        LoginFrame.setVisible(true);
        LoginFrame.pack();
        LoginFrame.setLocationRelativeTo(null);
        this.dispose();
    }

}
