
class Button
	Button::buttons = []

	Button::clickAllButtonsTogether = () ->
		for button in Button::buttons
			if button.state is "enable"
				button.dom.find(".adder").css("display", "block").text "..."
				button.state = "waiting"
				button.getRandomNumberFromTheServer()

	getRandomNumberFromTheServer: () ->
		$.get "/", (data) =>
			if @state is "waiting"
				@dom.find(".adder").text data
				@state = "done"
				@dom.css("background-color", "gray")
				Button::ifAllButtonsAreDoneClickTheBubble()

	Button::ifAllButtonsAreDoneClickTheBubble = () ->
		for button in Button::buttons
			if button.state isnt "done"
				return

		bubble = $("#info-bar")
		bubble.find("#sum").text countSum()
		bubble.css("background-color", "gray")

	constructor: (@dom) ->
		@state = "enable"
		Button::buttons.push @

	Button::resetAllButtons = () ->
		for button in Button::buttons
			button.state = "enable"
			button.dom.css("background-color", "rgb(48, 63, 159)")
			button.dom.find(".adder").css("display", "none").text ""


$ ->
	initButtons()
	clickTheAtPlusToStartTheRobot()
	resetIfLeaveTheApb()

initButtons = () ->
	for dom in $ "#control-ring li"
		button = new Button($ dom)

clickTheAtPlusToStartTheRobot = () ->
	$(".apb").click =>
		Button::clickAllButtonsTogether()

countSum = () ->
	result = 0
	for dom in $('#control-ring li')
		number = $(dom).find('.adder').text()
		result += parseInt number
	result

resetIfLeaveTheApb = ->
	$('#at-plus-container').on 'mouseleave', ->
		Button::resetAllButtons()
		resetBubble()

resetBubble = ->
	bubble = $('#info-bar')
	bubble.find('#sum').text ''
	bubble.css('background-color', 'gray')

