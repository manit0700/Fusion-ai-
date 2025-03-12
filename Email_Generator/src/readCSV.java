import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import javax.swing.JOptionPane;

public class readCSV extends javax.swing.JFrame {

    // this method reads csv file and look for the username and password that's input by the user
    public void readFile(String path, String email, String pass){
        BufferedReader buff = null;
        String line = "";
        String delimiter = ";";   // file splits it's column by ; 
        Boolean check = false;
        try{
            buff = new BufferedReader(new FileReader(path));
            while((line = buff.readLine()) != null){
                String[] file = line.split(delimiter);
                // In csv file, data is stored 
                // Username;  Email;    Passwprd
                // file[0]    file[1]   file[2]
                if(file[1].equals(email) && file[2].equals(pass)){   // if there exists email and password
                    String username = file[0].toString();

                    //TODO edit here to go directly to the MainMenu.java
                    EmailGene menuFrame = new EmailGene(username, email, pass);
                    menuFrame.setVisible(true);
                    menuFrame.pack();
                    menuFrame.setLocationRelativeTo(null);
                    this.dispose();
                    check = true;
                }
            }
            if(!check){
                    JOptionPane.showMessageDialog(null, "Either Email or Password is wrong\n");
                    new LoginOpen().loginOpen();
            }
        }catch(FileNotFoundException e){
            e.printStackTrace();
        }catch(IOException e){
            e.printStackTrace();
        }
    }



}
