import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;


public class writeCSV extends javax.swing.JFrame {


    public void writeFile(String path, String user, String email, String pass){
    try { 
        BufferedWriter buff = new BufferedWriter(new FileWriter(path, true)); // set the buffer for the specific csv file 
        // write the user information in this order
        buff.write(user);
        buff.write(";");
        buff.write(email);
        buff.write(";");
        buff.write(pass);
        buff.write("\n");
        buff.close();
        
        //TODO edit here to go directly to the MainMenu.java
        EmailGene menuFrame = new EmailGene(user, email, pass);
        menuFrame.setVisible(true);
        menuFrame.pack();
        menuFrame.setLocationRelativeTo(null);
        this.dispose();

    }catch(FileNotFoundException e){
            e.printStackTrace();
    }catch (IOException e) { 
        System.err.println("Error writing to CSV file: " + e.getMessage());
        e.printStackTrace(); 
    } 
 
    }

}
