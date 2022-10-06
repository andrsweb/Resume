<?php

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
	echo 'Пожалуйста, заполните все поля.';
	die();
}

// Only letters & spaces in name.
if( ! as_check_name( $person_name ) || ! as_check_name( $person_lastname ) ){
	echo 'Введите корректное имя и фамилию.';
	die();
}

// Check data length to avoid very large text.
if(
	! as_check_length( $person_name, 1, 30 ) ||
	! as_check_length( $person_lastname, 1, 30 ) ||
	! as_check_length( $person_email, 1, 30 )
){
	echo 'Поля имени и почты не должны превышать 30 символов.';
	die();
}

// Check E-mail.
if( ! filter_var( $person_email, FILTER_VALIDATE_EMAIL ) ){
	echo 'Некорректный формат почты.';
	die();
}

// Prepare message for mail.
$message = "Хайль! \\о\n" .
	"Тебе написало какое-то тело:\n\n" .
	"Зовут - $person_name $person_lastname\n" .
	"Email - $person_email\n" .
	"Нарыгал эту дичь - $form_textarea\n\n\n" .
	"Сало уронили! \\о";
// Mail headers.
$headers = "From: voenkomat@" . $_SERVER['HTTP_HOST'] . "\r\n" .
	"Reply-To: voenkomat@" . $_SERVER['HTTP_HOST'] . "\r\n" .
	"X-Mailer: PHP/" . phpversion();

// Sending mail.
if( mail('andrsweb@gmail.com', 'ПОВЕСТКА', $message, $headers ) )
	echo 'Спасибо за Ваше сообщение! Я свяжусь с Вами в кратчайшие сроки.';	// Success.
else
	echo 'Отправка не удалась. Попробуйте ещё раз позднее.';	// Failed.

die();

