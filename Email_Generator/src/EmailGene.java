import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;
import java.util.regex.Pattern;
import javax.swing.JOptionPane;

public class EmailGene extends javax.swing.JFrame{
    
    // This is the Gnerate window that will take user inputs "Recipient" and "Content"

    String recipient = "";
    String emailAdd = "";
    String content = "";
    String emailType = "";

    public EmailGene(String username, String email, String pass){  
        initComponents(username, email, pass);
    }

    public void  initComponents(String username, String email, String pass){
        
        jPanel1 = new javax.swing.JPanel();
        jPanel2 = new javax.swing.JPanel();
        jPanel3 = new javax.swing.JPanel();

        jLabel1 = new javax.swing.JLabel();
        jLabel2 = new javax.swing.JLabel();
        jLabel3 = new javax.swing.JLabel();
        jLabel4 = new javax.swing.JLabel();
        jLabel5 = new javax.swing.JLabel();
        jLabel6 = new javax.swing.JLabel();
        jLabel7 = new javax.swing.JLabel();

        // email address
        jEmailField = new javax.swing.JTextField();
        // The name of the recipient
        jTextField = new javax.swing.JTextField();       
           
        // Content textfield here user input their content of email
        jTextArea = new javax.swing.JTextArea(); 
        jScrollPane = new javax.swing.JScrollPane(jTextArea);

        // menu bar
        jMenuBar = new JMenuBar();

        // Create a JMenu
        jMenu = new JMenu("Type of Email");

        // Create menu items
        jMenuItem1 = new JMenuItem("Request Email");
        jMenuItem2 = new JMenuItem("Confirmation Email");
        jMenuItem3 = new JMenuItem("Announcement Email");
        jMenuItem4 = new JMenuItem("Welcome Email");
        jMenuItem5 = new JMenuItem("Special Offer Email");

        // Add menu items to the menu
        jMenu.add(jMenuItem1);
        jMenu.add(jMenuItem2);
        jMenu.add(jMenuItem3);
        jMenu.add(jMenuItem4);
        jMenu.add(jMenuItem5);

        // Text changes when user choose 
        jMenuItem1.addActionListener(e -> {jMenu.setText("Request"); emailType = "Request Email";});
        jMenuItem2.addActionListener(e -> {jMenu.setText("Confirmation"); emailType = "Confirmation Email";});
        jMenuItem3.addActionListener(e -> {jMenu.setText("Announcement"); emailType = "Announcement Email";});
        jMenuItem4.addActionListener(e -> {jMenu.setText("Welcome"); emailType = "Welcome Email";});
        jMenuItem5.addActionListener(e -> {jMenu.setText("Special Offer"); emailType = "Special Email";});

        jMenuBar.add(jMenu);


        jButton1 = new javax.swing.JButton();       // Search
        jButton2 = new javax.swing.JButton();       // Logout button

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
        setTitle("Generate");
        setPreferredSize(new java.awt.Dimension(800, 500));

        jPanel1.setBackground(new java.awt.Color(255, 255, 255));
        jPanel1.setPreferredSize(new java.awt.Dimension(800, 500));
        jPanel1.setLayout(null);

        jPanel2.setBackground(new java.awt.Color(0, 102, 102));

        jLabel2.setFont(new java.awt.Font("Showcard Gothic", 0, 24)); // NOI18N
        jLabel2.setForeground(new java.awt.Color(255, 255, 255));
        jLabel2.setText("Email Generator");

        jLabel3.setFont(new java.awt.Font("Segoe UI Light", 0, 14)); // NOI18N
        jLabel3.setForeground(new java.awt.Color(204, 204, 204));
        jLabel3.setText("Login as "+username);

        javax.swing.GroupLayout jPanel2Layout = new javax.swing.GroupLayout(jPanel2);
        jPanel2.setLayout(jPanel2Layout);
        jPanel2Layout.setHorizontalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel2Layout.createSequentialGroup()
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(jPanel2Layout.createSequentialGroup()
                        .addGap(137, 137, 137)
                        .addComponent(jLabel1))
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
                .addComponent(jLabel1)
                .addGap(30, 30, 30)
                .addComponent(jLabel2)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 108, Short.MAX_VALUE)
                .addComponent(jLabel3)
                .addGap(64, 64, 64))
        );

        jPanel1.add(jPanel2);
        jPanel2.setBounds(0, 0, 400, 500);

        jPanel3.setBackground(new java.awt.Color(255, 255, 255));

        jLabel4.setBackground(new java.awt.Color(0, 102, 102));
        jLabel4.setFont(new java.awt.Font("Segoe UI", 1, 24)); // NOI18N
        jLabel4.setText("Generate");

        jLabel7.setBackground(new java.awt.Color(102, 102, 102));
        jLabel7.setFont(new java.awt.Font("Segoe UI", 0, 14)); // NOI18N
        jLabel7.setText("Recipient Email Address");

        jLabel5.setBackground(new java.awt.Color(102, 102, 102));
        jLabel5.setFont(new java.awt.Font("Segoe UI", 0, 14)); // NOI18N
        jLabel5.setText("Recipient Name");

        jEmailField.setFont(new java.awt.Font("Segoe UI", 0, 14)); // NOI18N
        jEmailField.setForeground(new java.awt.Color(102, 102, 102));

        jTextField.setFont(new java.awt.Font("Segoe UI", 0, 14)); // NOI18N
        jTextField.setForeground(new java.awt.Color(102, 102, 102));

        jLabel6.setBackground(new java.awt.Color(102, 102, 102));
        jLabel6.setFont(new java.awt.Font("Segoe UI", 0, 14)); // NOI18N
        jLabel6.setText("Briefly describe your email content:");

        jScrollPane.setFont(new java.awt.Font("Segoe UI", 0, 14)); // NOI18N
        jScrollPane.setForeground(new java.awt.Color(102, 102, 102));


        jButton1.setBackground(new java.awt.Color(0, 102, 102));
        jButton1.setForeground(new java.awt.Color(102, 102, 102));
        jButton1.setText("Generate");
        jButton1.addActionListener(new java.awt.event.ActionListener() {      // Initialize actionLister for Sign up button
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton1ActionPerformed(evt, username, email, pass);
            }
        });

        jButton2.setForeground(new java.awt.Color(255, 51, 51));
        jButton2.setText("Logout");
        jButton2.addActionListener(new java.awt.event.ActionListener() {        // initialize the action listener for Login Skip button
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton2ActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout jPanel3Layout = new javax.swing.GroupLayout(jPanel3);
        jPanel3.setLayout(jPanel3Layout);
        jPanel3Layout.setHorizontalGroup(
            jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel3Layout.createSequentialGroup()
                .addGroup(jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(jPanel3Layout.createSequentialGroup()
                        .addGap(145, 145, 145)
                        .addComponent(jLabel4))
                    .addGroup(jPanel3Layout.createSequentialGroup()
                        .addGap(44, 44, 44)
                        .addGroup(jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                                .addComponent(jLabel7)
                                .addComponent(jEmailField, javax.swing.GroupLayout.DEFAULT_SIZE, 332, Short.MAX_VALUE)
                                .addComponent(jLabel5)
                                .addComponent(jTextField, javax.swing.GroupLayout.DEFAULT_SIZE, 332, Short.MAX_VALUE)
                                .addComponent(jLabel6)
                                .addComponent(jScrollPane))
                            .addComponent(jButton1, javax.swing.GroupLayout.PREFERRED_SIZE, 91, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(jMenuBar, javax.swing.GroupLayout.PREFERRED_SIZE, 120, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addGroup(jPanel3Layout.createSequentialGroup()
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                                .addComponent(jButton2, javax.swing.GroupLayout.PREFERRED_SIZE, 84, javax.swing.GroupLayout.PREFERRED_SIZE)))))
                .addContainerGap(24, Short.MAX_VALUE))
        );
        jPanel3Layout.setVerticalGroup(
            jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel3Layout.createSequentialGroup()
                .addGap(28, 28, 28)
                .addComponent(jLabel4)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(jLabel7)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(jEmailField, javax.swing.GroupLayout.PREFERRED_SIZE, 40, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(jLabel5)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(jTextField, javax.swing.GroupLayout.PREFERRED_SIZE, 40, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(18, 18, 29)
                .addComponent(jMenuBar, javax.swing.GroupLayout.PREFERRED_SIZE, 37, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(18, 18, 18)
                .addComponent(jLabel6)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(jScrollPane, javax.swing.GroupLayout.PREFERRED_SIZE, 80, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(18, 18, 18)
                .addComponent(jButton1, javax.swing.GroupLayout.PREFERRED_SIZE, 37, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(13, 13, 13)
                .addGroup(jPanel3Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jButton2, javax.swing.GroupLayout.PREFERRED_SIZE, 31, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addContainerGap(45, Short.MAX_VALUE))
        );

        jPanel1.add(jPanel3);
        jPanel3.setBounds(400, 0, 400, 500);

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addComponent(jPanel1, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(0, 113, Short.MAX_VALUE))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addComponent(jPanel1, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(0, 126, Short.MAX_VALUE))
        );

        pack();

} // the end of initialcomponents


    // if generate button is clicked
    public void jButton1ActionPerformed(java.awt.event.ActionEvent evt, String username, String email, String pass){

        // get the email address
        emailAdd = jEmailField.getText();
        // get the name of recipient         
        recipient = jTextField.getText();  
        // get the content of email
        content = jTextArea.getText();

        if((emailAdd.isEmpty() || recipient.isEmpty() || content.isEmpty())){
            JOptionPane.showMessageDialog(jButton1 , "Not enough information is provided");
        }
        else if(!isValid(emailAdd)){    // email validity
            JOptionPane.showMessageDialog(jButton1 , "Enter a valid email");
        }else{
            //display the result window
            Result ResultFrame = new Result(username, email, pass, recipient, content, emailType, emailAdd);
            ResultFrame.setVisible(true);
            ResultFrame.pack();
            ResultFrame.setLocationRelativeTo(null); 
            this.dispose();     // release screen resources 
        }
    }


    // if logout button is clicked
    public void jButton2ActionPerformed(java.awt.event.ActionEvent evt){
        //display the login window
        Login LoginFrame = new Login();
        LoginFrame.setVisible(true);
        LoginFrame.pack();
        LoginFrame.setLocationRelativeTo(null); 
        this.dispose();     // release screen resources 
    }

    // check if the eamil is valid 
    public static boolean isValid(String email)     
    { 
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\."+ 
                            "[a-zA-Z0-9_+&*-]+)*@" + 
                            "(?:[a-zA-Z0-9-]+\\.)+[a-z" + 
                            "A-Z]{2,7}$"; 
                              
        Pattern pat = Pattern.compile(emailRegex); 
        if (email == null) 
            return false; 
        return pat.matcher(email).matches(); 
    } 

    private javax.swing.JButton jButton1;
    private javax.swing.JButton jButton2;

    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JLabel jLabel4;
    private javax.swing.JLabel jLabel5;
    private javax.swing.JLabel jLabel6;
    private javax.swing.JLabel jLabel7;

    private javax.swing.JMenuBar jMenuBar;
    private javax.swing.JMenu jMenu;
    private javax.swing.JMenuItem jMenuItem1;
    private javax.swing.JMenuItem jMenuItem2;
    private javax.swing.JMenuItem jMenuItem3;
    private javax.swing.JMenuItem jMenuItem4;
    private javax.swing.JMenuItem jMenuItem5;
    
    private javax.swing.JPanel jPanel1;
    private javax.swing.JPanel jPanel2;
    private javax.swing.JPanel jPanel3;

    private javax.swing.JTextField jTextField;
    private javax.swing.JTextField jEmailField;
    private javax.swing.JTextArea jTextArea;
    private javax.swing.JScrollPane jScrollPane;
}

