
arr = new Array()
arr = [0, 1, 2, 3, 4]
index = 0

class Button
	Button::buttons = []

	Button::disableOtherButtonsExcept = (thisButton) ->
		for button in Button::buttons
			if button isnt thisButton and button.state is "enable"
				button.state = "disable"
				button.dom.css("background-color", "gray")

	Button::enableButtonsAfterDone = () ->
		for button in Button::buttons
			if button.state is "disable"
				button.state = "enable"
				button.dom.css("background-color", "rgb(48, 63, 159)")

	Button::clickAllButtonsInOrder = (index) ->
		if index >= 5 then return
		btns = Button::buttons
		current = arr[index]
		btns[current].executeClickEvent()

	executeClickEvent: () ->
		@dom.find(".adder").css("display", "block").text "..."
		@state = "waiting"
		Button::disableOtherButtonsExcept(@)
		@getRandomNumberFromTheServer()

	getRandomNumberFromTheServer: () ->
		$.get "/", (data) =>
			if @state is "waiting"
				@dom.find(".adder").text data
				@state = "done"
				@dom.css("background-color", "gray")
				Button::ifAllButtonsAreDoneClickTheBubble()
				Button::enableButtonsAfterDone()
				Button::clickAllButtonsInOrder(index++)

	Button::ifAllButtonsAreDoneClickTheBubble = () ->
		for button in Button::buttons
			if button.state isnt "done"
				return

		bubble = $("#info-bar")
		bubble.attr("enable", "true")
		bubble.css("background-color", "gray")
		bubble.find("#sum").text countSum()

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
		if index isnt 0 then return
		Button::clickAllButtonsInOrder(index)

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
		index = 0

resetBubble = ->
	bubble = $('#info-bar')
	bubble.find('span').text ""
	bubble.css('background-color', 'gray')

