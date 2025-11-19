/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/**
 * Frontend initializer for the FullCalendar block.
 *
 * This file is enqueued on any page that contains the block (see block.json -> viewScript).
 * It looks for `.fullcalendar-for-frappe__root` containers rendered by `render.php` and
 * mounts a FullCalendar instance into each one, fetching events from the configured API.
 */

import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

/* eslint-disable no-console */
document.addEventListener( 'DOMContentLoaded', function () {
	const roots = document.querySelectorAll( '.fullcalendar-for-frappe__root' );
	if ( ! roots || roots.length === 0 ) {
		return;
	}

	roots.forEach( function ( root ) {
		// Avoid initializing twice
		if ( root.__fc_initialized ) {
			return;
		}

		const  eventsUrl = root.getAttribute( 'data-events-url' ) || '';
		const calendarEl = document.createElement( 'div' );

		const staticCalendarOptions = {
			plugins: [ dayGridPlugin, timeGridPlugin, listPlugin ],
			events: {
				url: eventsUrl,
				success( response ) {
					const events = response.data;
					Array.prototype.slice
						.call( events )
						.forEach(
							( event ) =>
								( event.title = pluralize(
									event.anzahl,
									' Platz verfügbar',
									' Plätze verfügbar'
								) )
						);
					return events;
				},
			},
		};

		root.appendChild( calendarEl );
		const customCalendarOptions = JSON.parse(
			root.getAttribute( 'data-calendar-options' ) || '{}'
		);
		const calendarOptions = {
			...staticCalendarOptions,
			...customCalendarOptions,
		};
		const calendar = new Calendar( calendarEl, calendarOptions );

		calendar.render();
		root.__fc_initialized = true;
	} );
} );

function pluralize( count, singularString, pluralString ) {
	return count + ( count === 1 ? singularString : pluralString );
}
/* eslint-enable no-console */
