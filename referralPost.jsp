<%@ page import="java.sql.*" %>
<%@ page import="java.io.*,java.util.*,javax.mail.*"%>
<%@ page import="javax.mail.internet.*,javax.activation.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*" %>
<%@page import="java.text.SimpleDateFormat"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
    
<html>
<head>
    <title>Referral Registration</title>
</head>
<body>
</body>
<%
    if (request.getParameter("user-name") != null)
    {
        PreparedStatement prepareStatement = null;
        try {
            Class.forName("com.mysql.jdbc.Driver").newInstance();

            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/krhome","root","int_vps");
            String queryString = "INSERT INTO referral(name,phone,email,refer,stay_flag,stay_address,profession,prefer_location,lastdate_need,house_requirement) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

            prepareStatement = connection.prepareStatement(queryString);
            prepareStatement.setString(1, request.getParameter("user-name"));
            prepareStatement.setString(2, request.getParameter("user-phone"));
            prepareStatement.setString(3, request.getParameter("user-email"));
            prepareStatement.setString(4, request.getParameter("user-refer"));
            prepareStatement.setString(5, request.getParameter("user-stay"));
            prepareStatement.setString(6, request.getParameter("user-address"));
            prepareStatement.setString(7, request.getParameter("user-profession"));
            prepareStatement.setString(8, request.getParameter("user-location"));
            prepareStatement.setString(9, request.getParameter("user-date"));
            prepareStatement.setString(10, request.getParameter("user-message"));
            prepareStatement.executeUpdate();
   
            //send email
            // Recipient's email ID needs to be mentioned.
            String result;
            // Sender's email ID needs to be mentioned
            String from = "Admin@krhome.com";

            // Get system properties object
            Properties properties = System.getProperties();
   
            final String username ="userKRHome@gmail.com";
            final String password ="KRHome246";

            // Setup mail server
            properties.put("mail.smtp.host", "smtp.gmail.com");
            properties.put("mail.smtp.starttls.enable", "true");
            properties.put("mail.smtp.auth", "true"); 
            properties.put("mail.smtp.port", "587"); 
        
            // Get the default Session object
            Session mailSession = Session.getInstance(properties,
              new javax.mail.Authenticator() {
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(username, password);
                }
            });
			
            // Create a default MimeMessage object.
            MimeMessage message = new MimeMessage(mailSession);
            // Set From: header field of the header.
            message.setFrom(new InternetAddress(from));
            // Set To: header field of the header.
           
            message.addRecipient(Message.RecipientType.TO, new InternetAddress("rhalim@gmail.com"));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress("myhome389@gmail.com"));
   
            // Set Subject: header field
            String subject = "[KR HOME Referral] referral for " + request.getParameter("user-name");
   
            if (!(request.getParameter("user-refer") + "").equals(""))
            {
                subject += " by " + request.getParameter("user-refer");
            }
   
            message.setSubject(subject);

            java.util.Date date = new java.util.Date();
            SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
            // Now set the actual message
            message.setContent("New Referral information <br/><br/> 1. Name : " + request.getParameter("user-name") + " <br/> 2. Phone : " + request.getParameter("user-phone") + " <br/> 3. Email : " + request.getParameter("user-email") + " <br/> 4. Refer from : " + request.getParameter("user-refer") + " <br/> 5. Stay at our house : " + request.getParameter("user-stay") + " <br/> 6. Address : " + request.getParameter("user-address") + " <br/> 7. Profession : " + request.getParameter("user-profession") + " <br/> 8. Preferred Location : " + request.getParameter("user-location") + " <br/> 9. Latest Date need housing : " + request.getParameter("user-date") + " <br/> 10. Housing Requirement :" + request.getParameter("user-message") + " <br/> 11. Created : " + formatter.format(date) + " <br/><br/> Please kindly follow up. <br/> <br/> Thanks. <br/> Admin KR Home","text/html");
            // Send message
            Transport.send(message);
            result = "Sent message successfully....";
         
			response.sendRedirect("success.html");

        } catch (Exception ex) {
            out.println("Error processing data : " + ex.getMessage());
        } finally {
            try {
                if (prepareStatement != null) prepareStatement.close();
            } catch (SQLException e) {
            }
        }
    }
    else
    {
        out.println("Please fill parameter");
    }
%>
</html>
