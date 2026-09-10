<?php
header('Content-Type: application/json; charset=UTF-8');

require('PHPMailer/PHPMailerAutoload.php');

function respond($success, $message, $code = 200) {
    http_response_code($code);
    echo json_encode(array(
        'success' => $success,
        'message' => $message,
    ));
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Invalid request method.', 405);
}

$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';
$website = isset($_POST['website']) ? trim($_POST['website']) : '';

if ($website !== '') {
    respond(true, 'Thanks. Your request has been sent.');
}

if ($name === '' || $email === '' || $phone === '' || $subject === '' || $message === '') {
    respond(false, 'Please fill in all required fields.', 422);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Please enter a valid email address.', 422);
}

$mail = new PHPMailer(true);

try {
    $mail->SMTPDebug = 0;
    $mail->isSMTP();
    $mail->Host = 'smtp.migadu.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'info@hudsonhelm.com';
    $mail->Password = 'Welcome123$';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;
    $mail->CharSet = 'UTF-8';

    $mail->setFrom('info@hudsonhelm.com', 'Hudson Helm');
    $mail->addAddress('info@hudsonhelm.com', 'Hudson Helm');
    $mail->addReplyTo($email, $name);

    $safeName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
    $safeEmail = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
    $safePhone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
    $safeSubject = htmlspecialchars($subject, ENT_QUOTES, 'UTF-8');
    $safeMessage = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));

    $mail->isHTML(true);
    $mail->Subject = 'New website inquiry: ' . $subject;
    $mail->Body = ''
        . '<h2>New inquiry from HudsonHelm.com</h2>'
        . '<p><strong>Name:</strong> ' . $safeName . '</p>'
        . '<p><strong>Email:</strong> ' . $safeEmail . '</p>'
        . '<p><strong>Phone:</strong> ' . $safePhone . '</p>'
        . '<p><strong>Subject:</strong> ' . $safeSubject . '</p>'
        . '<p><strong>Message:</strong><br>' . $safeMessage . '</p>';
    $mail->AltBody = "New inquiry from HudsonHelm.com

"
        . "Name: {$name}
"
        . "Email: {$email}
"
        . "Phone: {$phone}
"
        . "Subject: {$subject}

"
        . "Message:
{$message}
";

    $mail->send();
    respond(true, 'Thanks. Your request has been sent.');
} catch (Exception $e) {
    respond(false, 'Sorry, your request could not be sent right now.', 500);
}
