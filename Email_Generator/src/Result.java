import javax.swing.*;
import java.awt.*;
import java.time.LocalDateTime;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.File;



public class Result extends javax.swing.JFrame {
    public Result(String username, String email, String pass, String recipient, String content, String emailType, String emailAdd){
        
        // here formulate a question for ChatGPT
        String query = "Write an email professionally. "+"Type of email:" +emailType + " Recipient: " + recipient + " content: " + content;
        // here use method and get string answer from ChatGPT
        String result = GeneEmail(query);
        initComponents(username, email, pass, result, emailAdd);    

    }
    public void initComponents(String username, String email, String pass, String result, String emailAdd) {
        
        jPanel1 = new javax.swing.JPanel();    // main panel
        jPanel2 = new javax.swing.JPanel();    // left layout panel
        jPanel3 = new javax.swing.JPanel();    // right layout


        jLabel2 = new javax.swing.JLabel();   // left title
        jLabel3 = new javax.swing.JLabel();   // Login as ..
        jLabel4 = new javax.swing.JLabel();   // Title "Result"

        // Here it displays the generated result
        jTextArea = new javax.swing.JTextArea();
        jTextArea.setText(result);
        jScrollPane = new javax.swing.JScrollPane(jTextArea);
        

        jButton1 = new javax.swing.JButton();     // Return button
        jButton2 = new javax.swing.JButton();     // Logout button
        jButton3 = new javax.swing.JButton();     // copy button
        jButton4 = new javax.swing.JButton();     // save button

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
        setTitle("Result");
        setPreferredSize(new java.awt.Dimension(800, 500));

        // main panel
        jPanel1.setBackground(new java.awt.Color(255, 255, 255));
        jPanel1.setPreferredSize(new java.awt.Dimension(800, 500));
        jPanel1.setLayout(null);

        // set up right panel
        jPanel2.setBackground(new java.awt.Color(0, 102, 102));

        jLabel2.setFont(new java.awt.Font("Showcard Gothic", 0, 24)); // NOI18N
        jLabel2.setForeground(new java.awt.Color(255, 255, 255));
        jLabel2.setText("Email Generator");

        jLabel3.setFont(new java.awt.Font("Segoe UI Light", 0, 14)); // NOI18N
        jLabel3.setForeground(new java.awt.Color(204, 204, 204));
        jLabel3.setText("Login as " + username);


        // here left panel layout
        javax.swing.GroupLayout jPanel2Layout = new javax.swing.GroupLayout(jPanel2);
        jPanel2.setLayout(jPanel2Layout);
        jPanel2Layout.setHorizontalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel2Layout.createSequentialGroup()
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(jPanel2Layout.createSequentialGroup()
                        .addGap(137, 137, 137))
                    .addGroup(jPanel2Layout.createSequentialGroup()
                        .addGap(72, 72, 72)
                        .addComponent(jLabel3))
                    .addGroup(jPanel2Layout.createSequentialGroup()
                        .addGap(104, 104, 104)
                        .addComponent(jLabel2)))
                .addContainerGap(49, Short.MAX_VALUE))
        );
        jPanel2Layout.setVerticalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel2Layout.createSequentialGroup()
                .addGap(129, 129, 129)
                .addGap(30, 30, 30)
                .addComponent(jLabel2)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 108, Short.MAX_VALUE)
                .addComponent(jLabel3)
                .addGap(64, 64, 64))
        );

        jPanel1.add(jPanel2);
        jPanel2.setBounds(0, 0, 400, 500);

        // set up left panel 
        jPanel3.setBackground(new java.awt.Color(255, 255, 255));
        jPanel3.setMinimumSize(new java.awt.Dimension(400, 500));


        // title
        jLabel4.setFont(new java.awt.Font("Segoe UI", 1, 30)); 
        jLabel4.setForeground(new java.awt.Color(0, 102, 102));
        jLabel4.setText("Result");


        // result display
        jScrollPane.setFont(new java.awt.Font("Segoe UI", 0, 14)); 
        jScrollPane.setForeground(new java.awt.Color(102, 102, 102));
        jScrollPane.setPreferredSize(new Dimension(330, 450));

        // Return button
        jButton1.setBackground(new java.awt.Color(102, 102, 102));
        jButton1.setFont(new java.awt.Font("Segoe UI", 0, 14)); 
        jButton1.setForeground(new java.awt.Color(102, 102, 102));
        jButton1.setText("Return");
        jButton1.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton1ActionPerformed(evt, username, email, pass);
            }
        });


        // Logout button
        jButton2.setFont(new java.awt.Font("Segoe UI", 0, 14)); 
        jButton2.setForeground(new java.awt.Color(255, 51, 51));
        jButton2.setText("Logout");
        jButton2.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton2ActionPerformed(evt);
            }
        });

        // send button
        jButton3.setBackground(new java.awt.Color(102, 102, 102));
        jButton3.setFont(new java.awt.Font("Segoe UI", 0, 14));
        jButton3.setForeground(new java.awt.Color(102, 102, 102));
        jButton3.setText("Send");
        jButton3.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton3ActionPerformed(evt, emailAdd);
            }
        });

        //download
        jButton4.setBackground(new java.awt.Color(102, 102, 102));
        jButton4.setFont(new java.awt.Font("Segoe UI", 0, 14));
        jButton4.setForeground(new java.awt.Color(102, 102, 102));
        jButton4.setText("Download");
        jButton4.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton4ActionPerformed(evt);
            }
        });


        // right layout 
        javax.swing.GroupLayout LeftLayout = new javax.swing.GroupLayout(jPanel3);
        jPanel3.setLayout(LeftLayout);
        LeftLayout.setHorizontalGroup(
            LeftLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(LeftLayout.createSequentialGroup()
                .addGroup(LeftLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(LeftLayout.createSequentialGroup()
                        .addGap(138, 138, 138)
                        .addComponent(jLabel4))
                    .addGroup(LeftLayout.createSequentialGroup()
                        .addGap(30, 30, 30)
                        .addGroup(LeftLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(LeftLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                                .addComponent(jScrollPane)
                                .addComponent(jButton3, javax.swing.GroupLayout.PREFERRED_SIZE, 93, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addComponent(jButton4, javax.swing.GroupLayout.PREFERRED_SIZE, 93, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addComponent(jButton1, javax.swing.GroupLayout.PREFERRED_SIZE, 93, javax.swing.GroupLayout.PREFERRED_SIZE))
                            .addGroup(LeftLayout.createSequentialGroup()
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(jButton2)))))
                .addContainerGap(27, Short.MAX_VALUE))
        );
        LeftLayout.setVerticalGroup(
            LeftLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(LeftLayout.createSequentialGroup()
                .addGap(51, 51, 51)
                .addComponent(jLabel4)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(jScrollPane, javax.swing.GroupLayout.PREFERRED_SIZE, 150, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(26, 26, 26)
                .addComponent(jButton3, javax.swing.GroupLayout.PREFERRED_SIZE, 36, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addComponent(jButton4, javax.swing.GroupLayout.PREFERRED_SIZE, 36, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(26, 26, 26)
                .addComponent(jButton1, javax.swing.GroupLayout.PREFERRED_SIZE, 36, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(33, 33, 33)
                .addGroup(LeftLayout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jButton2))
                .addContainerGap(77, Short.MAX_VALUE))
        );

        jPanel1.add(jPanel3);
        jPanel3.setBounds(400, 0, 400, 500);

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addComponent(jPanel1, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(0, 129, Short.MAX_VALUE))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addComponent(jPanel1, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(0, 149, Short.MAX_VALUE))
        );

        getAccessibleContext().setAccessibleName("Result");

        pack();

    }// end of the initComponents

    // Return button
    public void jButton1ActionPerformed(java.awt.event.ActionEvent evt, String username, String email, String pass){
        EmailGene menuFrame = new EmailGene(username, email, pass);
        menuFrame.setVisible(true);
        menuFrame.pack();
        menuFrame.setLocationRelativeTo(null);
        this.dispose();
    }

    // Logout button
    public void jButton2ActionPerformed(java.awt.event.ActionEvent evt){
        Login LoginFrame = new Login();
        LoginFrame.setVisible(true);
        LoginFrame.pack();
        LoginFrame.setLocationRelativeTo(null); 
        this.dispose();
    }

    // send button
    public void jButton3ActionPerformed(java.awt.event.ActionEvent evt, String emailAdd){

        String emailAddress = emailAdd;

        // Specify the subject and body of the email
        String subject = "[Type Your Subject Here]";
        String body = jTextArea.getText();

        // Compose the mailto URI with the recipient's email address, subject, and body
        String mailtoURI = "mailto:" + emailAddress + "?subject=" + subject + "&body=" + body;

        try {
            // Execute the open command to open the default email client with the mailto URI
            ProcessBuilder pb = new ProcessBuilder("open", mailtoURI);
            pb.start();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void jButton4ActionPerformed(java.awt.event.ActionEvent evt){
        
        //TODO change the file path according to your local directory
        String directoryPath = "YOUR_LOCAL_DIRECTORY/EmailGenerator/emails";
        
        String content = jTextArea.getText();
        
        LocalDateTime currentDateTime = LocalDateTime.now();
        
        String fileName = currentDateTime.toString() + ".txt";
        
        File directory = new File(directoryPath);
        
        // If the directory doesn't exist, create it
        if (!directory.exists()) {
            directory.mkdirs(); // This will create all necessary parent directories
        }

        // Create a File object representing the file in the specified directory
        File file = new File(directory, fileName);

        
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(file))) {
            // Write the content to the file
            writer.write(content);

            JOptionPane.showMessageDialog(jButton4, "Successfully File Saved!!");
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    // Get the result from chatgpt
    public String GeneEmail(String prompt){
        ChatGPT myGpt = new ChatGPT();
        String result = myGpt.Query(prompt);
        return result;
    }


    public javax.swing.JPanel jPanel3;
    public javax.swing.JPanel jPanel2;
    public javax.swing.JButton jButton1;   
    public javax.swing.JButton jButton2;
    public javax.swing.JButton jButton3;
    public javax.swing.JButton jButton4;  // save button
    public javax.swing.JLabel jLabel1;
    public javax.swing.JLabel jLabel2;
    public javax.swing.JLabel jLabel3;
    public javax.swing.JLabel jLabel4;
    public javax.swing.JLabel jLabel5;
    public javax.swing.JLabel jLabel6;
    public javax.swing.JLabel jLabel7;
    public javax.swing.JPanel jPanel1;
    private javax.swing.JTextArea jTextArea;
    private javax.swing.JScrollPane jScrollPane;
    public javax.swing.JPasswordField jPasswordField1; // password
    public javax.swing.JTextField jTextField1;   // email text field
    public javax.swing.JFrame jFrame;
}
