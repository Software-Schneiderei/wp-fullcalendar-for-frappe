<?php
/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<?php
/**
 * Render the frontend block container and expose the configured events URL
 * as a data attribute so the `viewScript` can initialize FullCalendar.
 */
$wrapper_attrs = get_block_wrapper_attributes();
$events_per_timeslot_url = isset( $attributes['eventsPerTimeslotUrl'] ) ? $attributes['eventsPerTimeslotUrl'] : '';
$events_per_day_url      = isset( $attributes['eventsPerDayUrl'] ) ? $attributes['eventsPerDayUrl'] : '';
$calendar_options        = isset( $attributes['calendarOptions'] ) ? $attributes['calendarOptions'] : '';
?>
<div <?php echo $wrapper_attrs; ?>>
	<div 
		class="fullcalendar-for-frappe__root"
		data-events-per-timeslot-url="<?php echo esc_attr( $events_per_timeslot_url ); ?>" 
		data-events-per-day-url="<?php echo esc_attr( $events_per_day_url ); ?>" 
		data-calendar-options="<?php echo esc_attr( $calendar_options ); ?>">
	</div>
</div>
