<?php
// This file is generated. Do not modify it manually.
return array(
	'fullcalendar-for-frappe' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'software-schneiderei/fullcalendar-for-frappe',
		'version' => '0.1.0',
		'title' => 'Fullcalendar',
		'category' => 'widgets',
		'icon' => 'calendar-alt',
		'description' => 'Fullcalendar frontend for fetching available appointments from an API',
		'example' => array(
			
		),
		'supports' => array(
			'align' => true,
			'dimensions' => array(
				'aspectRatio' => true,
				'minHeight' => true
			),
			'color' => array(
				'background' => true,
				'text' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true,
				'blockGap' => true
			)
		),
		'textdomain' => 'fullcalendar-for-frappe',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js',
		'attributes' => array(
			'eventsUrl' => array(
				'type' => 'string'
			),
			'calendarOptions' => array(
				'type' => 'string'
			)
		)
	)
);
