var pIDdigs = 100000000;
var participant_id = Math.floor(pIDdigs + Math.random() * (9 * pIDdigs - 1));
var slider_width = '500px'; // Slider width for visual analog scales

jsPsych.data.addProperties({
	participant_id: participant_id
});

save_data = function() {
	var form = document.createElement('form');
	document.body.appendChild(form);
	form.method = 'post';
	form.action = 'saveData.php';
	var data = {
		txt: jsPsych.data.get().csv(),
		pID: participant_id
	}
	var name;
	for (name in data) {
		var input = document.createElement('input');
		input.type = 'hidden';
		input.name = name;
		input.value = data[name];
		form.appendChild(input);
	}
	form.submit();
}

var timeline = [];

/*
	SET FULLSCREEN
*/

timeline.push({
	type: 'fullscreen',
	fullscreen_mode: true
});

/*
	DEMOGRAPHIC INFO
*/

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

/*
	PSIQ
*/

var psiq = {
	type: 'instructions', 
	pages: [
		'Plymouth Sensory Image Questionnaire<br><br><br><br>',
		'Please try to form the images described below and rate each mental image on the following scale:',
		'0 (no image at all) to 10 (image as clear and vivid as real life)', 
		'Tick the appropriate box for each item. Please rate every item.'
	], 
	show_clickable_nav: true
};

timeline.push(psiq);

var preambles = [ 
	'<b>Imagine the appearance of</b>:',
	'<b>Imagine the sound of</b>:',
	'<b>Imagine the smell of</b>:',
	'<b>Imagine the taste of</b>:',
	'<b>Imagine touching</b>:',
	'<b>Imagine the bodily sensation of</b>:',
	'<b>Imagine feeling</b>:'
];

var texts = [
	[
		'a friend you know well',
		'a cat climbing a tree',
		'a sunset',
		'the front door of your house',
		'a bonfire'
	],
	[
		'an ambulance siren', 
		'hands clapping in aplause',
		'the mewing of a cat', 
		'the sound of a car horn',
		'the sound of children playing'
	], 
	[
		'a stuffy room',
		'a rose',
		'fresh paint',
		'newly cut glass',
		'burning wood'
	],
	[
		'mustard',
		'toothpaste',
		'lemon',
		'sea water',
		'black pepper'
	],
	[
		'warm sand',
		'a soft towel',
		'a sunset',
		'the front door of your house',
		'a bonfire'
	],
	[
		'relaxing in a warm bath',
		'having a sore throat',
		'threading a needle',
		'jumping into a swimming pool',
		'walking briskly in the cold'
	],
	[
		'excited',
		'relieved',
		'furious',
		'in love',
		'scared'
	]
];

var psiq = {
	type: 'html-slider-response',
	min: 0,
	max: 10,
	step: 1,
	start: 5, 
	slider_width: 650,
	labels: ['0<br>No image at all', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10<br>Image as clear and vivid as real life'],
	timeline: []
};

for (i = 0; i < preambles.length; i++) {
	for (j = 0; j < texts[i].length; j++) {
		psiq.timeline.push({stimulus: preambles[i] + '<br><br>' + texts[i][j]})
	}
}

timeline.push(psiq);

var transition = {
	type: 'instructions', 
	pages: [
		'Thank you for completing the Plymouth Sensory Image Questionnaire. <br><br> Now The Dissociative Experiences Scale questionnaire will begin.<br><br>'
	], 
	show_clickable_nav: true
};

timeline.push(transition);

/*
	DES
*/

var des = {
	type: 'instructions', 
	pages: [
		'This questionnaire asks about experiences that you may have in your daily life. We are interested in how often you have these experiences.<br><br> It is important, however, that your answers show how often these experiences happen to you when you are not under the influence of alcohol or drugs.',
		'To answer the questions, please determine to what degree each experience described in the question applies to you, and select the number to show what percentage of the time you have the experience.',
		'For example:<br> 0% <b>(Never)</b> 10 20 30 40 50 60 70 80 90 100% <b>(Always)</b>',
		'There are 28 questions.',
		'<b>Disclaimer</b>: This self-assessment tool is not a substitute for clinical diagnosis or advice'
	], 
	show_clickable_nav: true
};

timeline.push(des);

var preambles= [
 'Select the number to show what percentage of the time this happens to you.<br><br>' 
];

questions = [ 
	'Some people have the experience of driving or riding in a car or bus or subway and suddenly realizing that they don’t remember what has happened during all or part of the trip.', 
	'Some people find that sometimes they are listening to someone talk and they suddenly realize that they did not hear part or all of what was said.',
	'Some people have the experience of finding themselves in a place and have no idea how they got there.',
	'Some people have the experience of finding themselves dressed in clothes that they don’t remember putting on.',
	'Some people have the experience of finding new things among their belongings that they do not remember buying.',
	'Some people sometimes find that they are approached by people that they do not know, who call them by another name or insist that they have met them before.', 
	'Some people sometimes have the experience of feeling as though they are standing next to themselves or watching themselves do something and they actually see themselves as if they were looking at another person.', 
	'Some people are told that they sometimes do not recognize friends of family members.',
	'Some people find that they have no memory for some important events in their lives (for example, a wedding or graduation).', 
	'Some people have the experience of being accused of lying when they do not think that they have lied.',
	'Some people have the experience of looking in a mirror and not recognizing themselves.',
	'Some people have the experience of feeling that other people, objects, and the world around them are not real.',
	'Some people have the experience of feeling that their body does not seem to belong to them.',
	'Some people have the experience of sometimes remembering a past event so vividly that they feel as if they were reliving that event.',
	'Some people have the experience of not being sure whether things that they remember happening really did happen or whether they just dreamed them.',
	'Some people have the experience of being in a familiar place but finding it strange and unfamiliar.',
	'Some people find that when they are watching television or a movie they become so absorbed in the story that they are unaware of other events happening around them.', 
	'Some people find that they become so involved in a fantasy or daydream that it feels as though it were really happening to them.',
	'Some people find that they sometimes are able to ignore pain.',
	'Some people find that they sometimes sit staring off into space, thinking of nothing, and are not aware of the passage of time.', 
	'Some people sometimes find that when they are alone they talk out loud to themselves.',
	'Some people find that in one situation they may act so differently compared with another situation that they feel almost as if they were two different people.',
	'Some people sometimes find that in certain situations they are able to do things with amazing ease and spontaneity that would usually be difficult for them (for example, sports, work, social situations, etc.).', 
	'Some people sometimes find that they cannot remember whether they have done something or have just thought about doing that thing (for example, not knowing whether they have just mailed a letter or have just thought about mailing it).', 
	'Some people find evidence that they have done things that they do not remember doing.',
	'Some people sometimes find writings, drawings, or notes among their belongings that they must have done but cannot remember doing.', 
	'Some people sometimes find that they hear voices inside their head that tell them to do things or comment on things that they are doing.', 
	'Some people sometimes feel as if they are looking at the world through a fog, so that people and objects appear far away or unclear.'
];

var des = {
	type: 'html-slider-response',
	min: 0,
	max: 100,
	step: 1,
	start: 50, 
	slider_width: 650,
	labels: ['0%<br>Never', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100%<br>Always'],	
	timeline: []
};

for (i = 0; i < questions.length; i++) {
	des.timeline.push({stimulus: preambles + '<br><br>' + questions[i]})
}

timeline.push(des);

var conclusion = {
	type: 'instructions', 
	pages: [
		'Thank you for completing the Dissociative Experiences Scale questionnaire.<br><br>'

	], 
	show_clickable_nav: true

};

timeline.push(conclusion);

/*
	EFT INSTRUCTIONS
*/

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

/*
	EFT TASK
*/

var cue_words = ['ANIMAL','APPLE','ARM','ARMY','ARTIST','AUTOMOBILE','AVENUE','BABY','BAR','BATH','BEAR','BED','BIRD','BLACK','BLOOD','BLUE','BOARD','BODY','BOOK','BOTTLE','BOWL','BOY','BRAIN','BREAD','BREAST','BUILDING','BURN','BUTTER','CAMP','CANDY','CAR','CARS','CASH','CAT','CELL','CHAIR','CHEESE','CHILD','CHILDREN','CHRISTMAS','CHURCH','CIRCLE','CITY','CLOCK','CLOTHING','COAST','COFFEE','COIN','COLLEGE','CORN','CORNER','COTTAGE','DARK','DIAMOND','DINNER','DOCTOR','DOGS','DOLL','DOLLAR','DOOR','DOORS','DRESS','DUST','EARTH','ENGINE','FACTORY','FAMILY','FAT','FEET','FINGERS','FIRE','FLAG','FLOOD','FLOWER','FOOT','FOREHEAD','FOREST','FORK','FRIEND','FRUIT','FUR','FURNITURE','GENTLEMAN','GIFT','GIRL','GOLD','GRANDMOTHER','GRASS','GREEN','GUNS','HALL','HAND','HANDS','HEAD','HOME','HORSE','HOSPITAL','HOT','HOTEL','HOUSE','HUSBAND','INDUSTRY','INSECT','INSTRUMENT','IRON','JUDGE','KING','KISS','LADIES','LAKE','LAMP','LETTER','LIBRARY','LIGHT','LIP','LIQUOR','LOVE','MACHINE','MAGAZINE','MAN','MARRIAGE','MARRIED','MEAT','METAL','MONEY','MOON','MORNING','MOTHER','MOUNTAIN','NAIL','NEEDLE','NEWSPAPER','NOVEL','OCEAN','OFFICE','OFFICER','OVEN','PAINT','PAPER','PARENTS','PARTY','PEACH','PENCIL','PEOPLE','PERSON','PHOTOGRAPH','PHYSICIAN','PICTURE','PIPE','PLANT','POTATO','PROFESSOR','PUPIL','QUARTER','QUEEN','RED','RIVER','ROCK','ROD','ROOM','SALT','SEA','SEAT','SHADOW','SHIP','SHOES','SHORE','SHOULDER','SKIN','SKY','SNOW','SOIL','SON','SQUARE','STAR','STEAM','STONE','STORM','STOVE','STREET','STRING','STUDENT','SUGAR','TABLE','TEACHER','TICKET','TOBACCO','TOOL','TOY','TREE','UNIVERSITY','VEGETABLE','WALL','WATER','WEAPON','WHEAT','WHITE','WIFE','WINDOW','WINE','WINTER','WOMAN','WORLD','YELLOW',];
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
			start: -20,
			stimulus: '', // Placeholders
			labels: '',
			skip_btn: true,
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
	timeline: timeline,
	on_finish: save_data
});
