var pIDdigs = 100000000;
var participant_id = Math.floor(pIDdigs + Math.random() * (9 * pIDdigs - 1));

var timeline = [];
/*
	SET FULLSCREEN
*/
/*
timeline.push({
	type: 'fullscreen',
	fullscreen_mode: true
});
*/
/*
	DEMOGRAPHIC INFO
*/
/*
var age = {
	type: 'survey-text',
	questions: [{prompt: 'What is your age in years?'}],
	post_trial_gap: 100
};
var gender = {
	type: 'survey-multi-choice',
	questions: [{prompt: 'What is your gender?', options: ['Man', 'Woman', 'Other/prefer not to say'], horizontal: true}]
};
timeline.push(age, gender);
*/
/*
	PSIQ
*/
/*
	DES
*/
/*
	EFT INSTRUCTIONS
*/
/*
timeline.push({
	type: 'instructions',
	pages: [
		'Now you will be shown some cue words and, in response, you will come up with future events that could happen to you.',
		'The cue words are just to give you some inspiration; the future events you come up with do not have to be related to the words.',
		'You will come up with 4 events that could happen in approximately 1 week, 1 month, 6 months, and 1 year, respectively.',
		'These should be events that:</br></br>' +
			'1. You have actually planned or could realistically happen</br>' +
			'2. Would happen at a specific time</br>' +
			'3. Would happen at a specific place</br>' +
			'3. Would not last longer than a day</br>' +
			'4. Are distinct and have not happened yet',
		'Examples of events that are NOT appropriate for this study:</br></br>' + 
			'1. Commuting to school (Has already happened many times)</br>' +
			'2. Going to classes (Not specific and takes more than a day)</br>' +
			'3. Friend starting classes at a different university (Not an event that happens to you)',
		'Examples of events that ARE appropriate for this study:</br></br>' +
			'1. Running into an old friend</br>' + 
			'2. Moving into a new apartment</br>' + 
			'3. Meeting up with someone to buy a used textbook',
	],
	show_clickable_nav: true
});
*/
/*
	EFT TASK
*/

var cue_words = [];
var delays = ['1 week', '1 month', '6 months', '12 months'];
var event_titles = []; // Participant's event titles
for (i = 0; i < delays.length; i++) {
	timeline.push({
		type: 'survey-text',
		preamble: delays[i] + '<br>Cue: ' + cue_words.splice(Math.floor(cue_words.length*Math.random()), 1)[0],
		questions: [
			{
				prompt: 'Event title:',
				rows: 1
			},
			{
				prompt: 'Detailed description',
				rows: 10,
				columns: 100
			},
		],
		on_finish: function(data) {
			var resp = JSON.parse(data.responses);
			event_titles.push(resp.Q0);
		}
	})
}

/*
	POST-EFT TASK
*/
/*
timeline.push({ // Post-EFT task instructions
	type: 'instructions',
	pages: [
		'Now you will be asked questions about the events you came up with. Please do not try to change your imagination of the events based on the questions. Instead, answer them based on the mental images you already had.',
		'Move the sliders to indicate your answers. The more you agree with the option on one side, the closer you should move the slider to it. For example, if you completely agree with the option on the left, move the slider all the way to the left. If you completely agree with the option on the right, move the slider all the way to the right.',
		'Some of these questions ask about visual perspective. When we imagine events, we can see them from different points of view in our mind’s eye. If we see the scene from the point of view of our own eyes, this is called a “first-person” perspective. If we see it from any other point of view, this is called a “third-person” perspective. Sometimes we switch back and forth between the two.'
	],
	show_clickable_nav: true
});

var post_eft_qs = [
	'Was your mental image of the event faint or vivid?',
	'Was the location of the event familiar to you?',
	'Was the general emotional tone of the event positive or negative?',
	'Were the emotions associated with the event intense?',
	'What percentage of the time did you see the scene from a first-person perspective?',
	'When you saw the scene from a third-person perspective, did you see yourself in it?'
];

var post_eft_labels = [
	['Faint', 'Vivid'],
	['Totally unfamiliar', 'Totally familiar'],
	['Negative', 'Positive'],
	['Not intense', 'Very intense'],
	['0%', '25%', '50%', '75%', '100%'],
	['Not at all', 'Somewhat', 'Very clearly']
];

var post_eft_iterators = {
	i: 0,
	j: 0
}

for (i = 0; i < delays.length; i++) { // Questions for each event title
	for (j = 0; j < post_eft_qs.length; j++) {
		timeline.push({
			type: 'html-slider-response',
			stimulus: '', // Placeholders
			labels: '',
			on_start: function(trial) { // Dynamically retrieve event titles and appropriate labels
				trial.stimulus = event_titles[post_eft_iterators.i] +
					'<br><br>' +
					post_eft_qs[post_eft_iterators.j];
				trial.labels = post_eft_labels[post_eft_iterators.j]
				// Update global iterators
				if (post_eft_iterators.j == post_eft_qs.length - 1) {
					post_eft_iterators.j = 0;
					post_eft_iterators.i++;
				} else {
					post_eft_iterators.j++;
				}
			}
		})
	}
}
*/
/*
	DELAY DISCOUNTING TASK
*/

var dd_data = { // Global variable for tracking the progress of the delay discounting task
	mon_amts: [50, 100],
	immediate_value: 50,
	delayed_value: 100,
	// Cued delays: 1 week, 1 month, 6 months, 12 months
	// Uncued delays: 2 weeks, 2 months, 8 months, 14 months
	delays: ['7 days', '14 days', '30 days', '60 days', '180 days', '240 days', '360 days', '420 days'],
	cued: [true, false, true, false, true, false, true, false],
	cue_count: 0, // Which cue are we on?
	delay_count: 0, // Which delay are we on?
	max_trials: 5, // How many trials per delay?
	trial_count: 0, // Which trial are we on in the current delay?
	div_pre: '<div style="height: 100px; width: 250px;">', // To ensure consistent button sizes
	div_post: '</div>'
};
var dd_instructions = {
	type: 'instructions',
	pages: [
		'Now you will make a series of monetary choices.',
		'You will be asked whether you would prefer some amount of money now or another amount later.',
		'Click the option that you would choose. There are no right or wrong answers.'
	],
	show_clickable_nav: true,
	post_trial_gap: 1000
};
var dd_trial = {
	type: 'html-button-response',
	stimulus: '', // Am I allowed to just not specify one?
	choices: ['', ''], // Placeholders
	post_trial_gap: 500,
	data: {}, // Placeholder
	on_start: function(trial) {
		if (dd_data.trial_count > 0) {
			var last_data = jsPsych.data.getLastTimelineData().values()[0];
			var inc = dd_data.delayed_value/4*0.5**(dd_data.trial_count - 1); // Amount by which immediate quantity is incremented
			if (last_data.button_pressed == last_data.order) { // Immediate choice was made
				dd_data.immediate_value -= inc;
			} else { // Delayed choice was made
				dd_data.immediate_value += inc;
			}
		}
		trial.data = {
			immediate_value: Math.round(dd_data.immediate_value), // Dollar value of immediate reward
			delayed_value: Math.round(dd_data.delayed_value), // Dollar value of delayed reward
			delay_text: dd_data.delay_text, // Display text specifying delay
			immediate_text: dd_data.immediate_text, // Display text specifying delay
			order: Math.round(Math.random()) // Order in which buttons appear; 0 = imm, del; 1 = del, imm
		}
		var imm = dd_data.div_pre +
			'<p>$' + trial.data.immediate_value + '</p>' +
			'<p>now</p>' +
			dd_data.div_post;
		if (dd_data.cued[dd_data.delay_count]) {
			var tag = '<p>(' + event_titles[dd_data.cue_count] + ')</p>';
		} else {
			var tag = '';
		}
		var del = dd_data.div_pre +
			'<p>$' + trial.data.delayed_value + '</p>' +
			'<p>in ' + dd_data.delays[dd_data.delay_count] + '</p>' +
			tag + 
			dd_data.div_post;
		if (trial.data.order == 0) {
			trial.choices = [imm, del];
		} else {
			trial.choices = [del, imm];
		}
		dd_data.trial_count++;
	}
};

var dd_loop = {
	timeline: [dd_trial],
	loop_function: function(data) {
		if (dd_data.trial_count == dd_data.max_trials) { // Increment the delay counter
			dd_data.delay_count++;
			if (dd_data.delay_count == dd_data.delays.length) { // Exit if we're done all the delays
				return false;
			} // Else reset everything
			if (dd_data.cued[dd_data.delay_count]) {
				dd_data.cue_count++;
			}
			dd_data.trial_count = 0;
			dd_data.immediate_value = dd_data.mon_amts[0];
		}
		return true; // Else continue the loop
	}
};

timeline.push(dd_instructions, dd_loop);

jsPsych.init({
	timeline: timeline
});