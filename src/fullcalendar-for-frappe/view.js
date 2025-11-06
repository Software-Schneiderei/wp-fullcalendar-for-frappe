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

		const eventsUrl = root.getAttribute( 'data-events-url' ) || '';
		const calendarEl = document.createElement( 'div' );

		root.appendChild( calendarEl );

		const calendar = new Calendar( calendarEl, {
			plugins: [ dayGridPlugin, timeGridPlugin, listPlugin ],
			initialView: 'dayGridMonth',
			headerToolbar: {
				left: 'prev,next today',
				center: 'title',
				right: 'dayGridMonth,timeGridWeek,listWeek',
			},
			// Provide events via an async fetch so the API can accept start/end params
			events( info, successCallback, failureCallback ) {
				if ( ! eventsUrl ) {
					successCallback( [] );
					return;
				}

				// Build URL safely ( support relative URLs )
				let url;
				try {
					url = new URL( eventsUrl );
				} catch ( e ) {
					url = new URL( eventsUrl, window.location.origin );
				}

				url.searchParams.set( 'start', info.startStr );
				url.searchParams.set( 'end', info.endStr );

				fetch( url.toString(), {
					method: 'GET',
					credentials: 'same-origin',
					headers: { Accept: 'application/json' },
				} )
					.then( function ( response ) {
						if ( ! response.ok ) {
							throw new Error(
								`${ response.status } ${ response.statusText }`
							);
						}
						return response.json();
					} )
					.then( function ( response ) {
						const events = Array.isArray( response.data )
							? response.data
							: [ response.data ];
						successCallback( events );
					} )
					.catch( function ( err ) {
						console.error(
							`FullCalendar: Failed to fetch events from ${ eventsUrl }`,
							err
						);
						failureCallback( err );
					} );
			},
			// optional: show loading indicator via FullCalendar callbacks
			loading( isLoading ) {
				if ( isLoading ) {
					root.classList.add( 'fc-loading' );
				} else {
					root.classList.remove( 'fc-loading' );
				}
			},
		} );

		calendar.render();
		root.__fc_initialized = true;
	} );
} );
/* eslint-enable no-console */
