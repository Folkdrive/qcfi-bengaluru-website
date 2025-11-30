<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Your client's email address
    $to = "qcfiblrdigital@gmail.com";
    
    // Get form data
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $phone = htmlspecialchars(trim($_POST['phone']));
    $organization = htmlspecialchars(trim($_POST['organization']));
    $subject = htmlspecialchars(trim($_POST['subject']));
    $message = htmlspecialchars(trim($_POST['message']));
    
    // Basic validation
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        http_response_code(400);
        echo "error";
        exit;
    }
    
    // Email validation
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "error";
        exit;
    }
    
    // Email subject
    $email_subject = "New QCFI Bengaluru Contact: " . $subject;
    
    // Email body (formatted nicely)
    $email_body = "============================================
    NEW CONTACT FORM SUBMISSION - QCFI BENGALURU
============================================

CONTACT DETAILS:
----------------
Name: $name
Email: $email
Phone: " . ($phone ?: 'Not provided') . "
Organization: " . ($organization ?: 'Not provided') . "
Subject: $subject

MESSAGE:
--------
$message

--------------------------------------------
This email was sent from the QCFI Bengaluru 
website contact form on " . date('Y-m-d H:i:s') . "
--------------------------------------------";
    
    // Email headers
    $headers = "From: QCFI Bengaluru Website <noreply@qcfibengaluru.org>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    // Send email
    if (mail($to, $email_subject, $email_body, $headers)) {
        // Success response
        http_response_code(200);
        echo "success";
    } else {
        // Error response - for debugging
        error_log("Email sending failed for: $email");
        http_response_code(500);
        echo "error";
    }
} else {
    // Not a POST request
    http_response_code(403);
    echo "Method not allowed";
}
?>