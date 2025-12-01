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

const EVENT_SRC_PER_TIMESLOT_ID = 'srcPerTimeSlot';
const EVENT_SRC_PER_DAY_ID = 'srcPerDay';

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

		const eventsPerTimeslotUrl =
			root.getAttribute( 'data-events-per-timeslot-url' ) || '';
		const eventsPerDayUrl =
			root.getAttribute( 'data-events-per-day-url' ) || '';
		const calendarEl = document.createElement( 'div' );

		const sources = {
			srcPerTimeSlot: {
				id: EVENT_SRC_PER_TIMESLOT_ID,
				url: eventsPerTimeslotUrl,
				success: ( response ) => response.data,
				eventDataTransform( eventData ) {
					eventData.title = pluralize(
						eventData.anzahl,
						' Platz frei',
						' Plätze frei'
					);
					return eventData;
				},
			},
			srcPerDay: {
				id: EVENT_SRC_PER_DAY_ID,
				url: eventsPerDayUrl,
				success: ( response ) => response.data,
				eventDataTransform( eventData ) {
					eventData.title = pluralize(
						eventData.anzahl,
						' Platz frei',
						' Plätze frei'
					);
					eventData.color =
						eventData.anzahl <= 2 ? 'yellow' : 'green';
					eventData.textColor =
						eventData.anzahl <= 2 ? 'black' : 'white';
					return eventData;
				},
			},
		};

		const getEventSourceForViewType = {
			dayGridMonth: sources[ EVENT_SRC_PER_DAY_ID ],
			timeGridDay: sources[ EVENT_SRC_PER_TIMESLOT_ID ],
			listMonth: sources[ EVENT_SRC_PER_TIMESLOT_ID ],
		};

		const staticCalendarOptions = {
			plugins: [ dayGridPlugin, timeGridPlugin, listPlugin ],
			events: sources[ EVENT_SRC_PER_DAY_ID ],
			async viewDidMount( arg ) {
				const viewType = arg.view.type;
				setActiveSource(
					calendar,
					getEventSourceForViewType[ viewType ]
				);
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

function setActiveSource( calendar, newSource ) {
	const oldSources = calendar.getEventSources();
	for ( const oldSource of oldSources ) {
		if ( oldSource.id !== newSource.id ) {
			oldSource.remove();
		}
	}
	if ( ! calendar.getEventSourceById( newSource.id ) ) {
		calendar.addEventSource( newSource );
	}
}
/* eslint-enable no-console */
