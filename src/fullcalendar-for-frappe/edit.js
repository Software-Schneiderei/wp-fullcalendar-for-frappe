/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * Plugin-specific imports
 */
import { PanelBody, TextControl, TextareaControl } from '@wordpress/components';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

export default function Edit( { attributes, setAttributes } ) {
	const { eventsUrl, calendarOptions } = attributes;
	const exampleCalendarOptions = `{
	"locale": "de",
	"firstDay": 1
}`;
	// Editor preview: static placeholder only. FullCalendar runs on the frontend.
	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Settings', 'fullcalendar-for-frappe' ) }
				>
					<TextControl
						__next40pxDefaultSize
						label={ __(
							'URL für Termine',
							'fullcalendar-for-frappe'
						) }
						help={ __(
							'Response must be a JSON-object with a "data" key as the root node',
							'fullcalendar-for-frappe'
						) }
						value={ eventsUrl || '' }
						onChange={ ( value ) =>
							setAttributes( { eventsUrl: value } )
						}
					/>
					<TextareaControl
						help="enter JSON with options that should be passed to Fullcalendar (see https://fullcalendar.io/docs)"
						label={ __(
							'Kalender Optionen (JSON)',
							'fullcalendar-for-frappe'
						) }
						value={ calendarOptions || '' }
						placeholder={ exampleCalendarOptions }
						onChange={ ( value ) =>
							setAttributes( { calendarOptions: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				<div>
					Hier wird auf der veröffentlichten Seite ein Kalender mit
					Terminen angezeigt.
				</div>
			</div>
		</>
	);
}
