<?php

require_once '../vendor/autoload.php';

/**
 * Clean incoming value from trash.
 *
 * @param	mixed	$value	Some value to clean.
 * @return	mixed	$value	The same value, but cleaned.
 */
function as_clean_value( $value )
{
	$value = trim( $value );
	$value = stripslashes( $value );
	$value = strip_tags( $value );

	return htmlspecialchars( $value );
}

/**
 * Function checks if value length is between min and max parameters.
 *
 * @param   string	$value  Specific string..
 * @param   int		$min    Minimum symbols value length.
 * @param   int		$max	Maximum symbols value length.
 * @return  bool            True if OK, false if value length is too small or large.
 */
function as_check_length( string $value, int $min, int $max ): bool
{
	return ! ( mb_strlen( $value ) < $min || mb_strlen( $value ) > $max );
}

/**
 * Function checks name symbols.
 *
 * @param   string  $name   Some name.
 * @return  bool            True if OK, false if string has bad symbols.
 */
function as_check_name( string $name ): bool
{
	return preg_match('/^[a-zа-я\s]+$/iu', $name );
}

$person_name		= isset( $_POST['person-name'] ) ? as_clean_value( $_POST['person-name'] ) : null;
$person_lastname	= isset( $_POST['person-lastname'] ) ? as_clean_value( $_POST['person-lastname'] ) : null;
$person_email		= isset( $_POST['person-email'] ) ? as_clean_value( $_POST['person-email'] ) : null;
$form_textarea		= isset( $_POST['form-textarea'] ) ? as_clean_value( $_POST['form-textarea'] ) : null;

// All fields are required.
if( ! $person_name || ! $person_lastname || ! $person_email || ! $form_textarea ){
	echo 'Please fill out all fields';
	die();
}

// Only letters & spaces in name.
if( ! as_check_name( $person_name ) || ! as_check_name( $person_lastname ) ){
	echo 'Enter the correct first and last name';
	die();
}

// Check data length to avoid very large text.
if(
	! as_check_length( $person_name, 1, 30 ) ||
	! as_check_length( $person_lastname, 1, 30 ) ||
	! as_check_length( $person_email, 1, 30 )
){
	echo 'The name and mail fields must not exceed 30 characters.';
	die();
}

// Check E-mail.
if( ! filter_var( $person_email, FILTER_VALIDATE_EMAIL ) ){
	echo 'Incorrect mail format.';
	die();
}

// Prepare message for mail.
$message = "Hello Andrii \\о\n" .
	"You take a letter:\n\n" .
	"Name - $person_name $person_lastname\n" .
	"Email - $person_email\n" .
	"Someone wrote to you - $form_textarea\n\n\n" .
// Mail headers.
$headers = "From: no-reply@" . $_SERVER['HTTP_HOST'] . "\r\n" .
	"Reply-To: no-reply@" . $_SERVER['HTTP_HOST'] . "\r\n" .
	"X-Mailer: PHP/" . phpversion();

$transport = (new Swift_SmtpTransport('smtp.gmail.com', 465, "ssl"))
	->setUsername('andrsweb@gmail.com')
	->setPassword('wugpebnnpayxoxjc');

$mailer = new Swift_Mailer($transport);

$message = (new Swift_Message('POVESTKA'))
	->setFrom(['no-reply@' . $_SERVER['HTTP_HOST'] => 'VOENKOMAT'])
	->setTo(['andrsweb@gmail.com' => 'Andrei'])
	->setBody($message);

$result = $mailer->send($message);

if( $result )
	echo 'Thank you for your message! I will contact you as soon as possible.';	// Success.
else
	echo 'Sending failed. Try again later.';	// Failed.

die();

