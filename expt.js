var pIDdigs = 100000000;
var participant_id = Math.floor(pIDdigs + Math.random() * (9 * pIDdigs - 1));

var timeline = [];

var post_eft_instructions = {
	type: 'instructions',
	pages: [
		'Now you will be asked questions about the events you came up with. Please do not try to change your imagination of the events based on the questions. Instead, answer them based on the mental images you already had.',
		'Move the sliders to indicate your answers. The more you agree with the option on one side, the closer you should move the slider to it. For example, if you completely agree with the option on the left, move the slider all the way to the left. If you completely agree with the option on the right, move the slider all the way to the right.',
		'Some of these questions ask about visual perspective. When we imagine events, we can see them from different points of view in our mind’s eye. If we see the scene from the point of view of our own eyes, this is called a “first-person” perspective. If we see it from any other point of view, this is called a “third-person” perspective. Sometimes we switch back and forth between the two.'
	]
};

timeline.push(post_eft_instructions);

var post_eft_task = {
	type: 'html-slider-response'
}