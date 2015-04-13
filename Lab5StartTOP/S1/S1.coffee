
class Button
	Button::buttons = []

	Button::disableAllOtherButtonsExcept = (thisButton) ->
		for button, i in Button::buttons
			if button isnt thisButton and button.state is "enable"
				button.state = "disable"
				button.dom.css("background-color", "#686868")

	Button::enableButtons = () ->
		for button in Button::buttons
			if button.state is "disable" and button.state isnt "done"
				button.state = "enable"
				button.dom.css("background", "rgb(48, 63, 159)")

	Button::ifAllButtonsAreDoneEnableTheBubble = ->
		for button in Button::buttons
			if button.state isnt "done"
				return
		$('#info-bar').attr('enable', 'true')
		$('#info-bar').css('background-color', 'rgb(48, 63, 159)')
		$('#info-bar').find("#sum").text "OK"

	Button::resetAllButtons = ->
		for button in Button::buttons
			button.state = "enable"
			dom = button.dom
			dom.css('background-color', 'rgb(48, 63, 159)')
			dom.find('.adder').css('display', 'none').text ''

	constructor: (@dom) ->
		@addClickHandler()
		@state = "enable"
		Button::buttons.push @

	addClickHandler: ->
		@dom.click =>
			if @state isnt "enable"
				return
			else
				@dom.find(".adder").css('display', 'block').text "..."
				Button::disableAllOtherButtonsExcept(@)
				@state = "disable"
				@getRandomNumberFromTheServer()

	getRandomNumberFromTheServer: ->
		$.get "/", (data) =>
			@dom.find(".adder").text(data)
			@state = "done"
			@dom.css('background-color', '#686868')
			Button::enableButtons()
			Button::ifAllButtonsAreDoneEnableTheBubble()



$ ->
	startClickButtonsAndFetchDataFromServer()
	clickTheBubbleAndCaculateTheSum()
	resetIfLeaveTheApb()

startClickButtonsAndFetchDataFromServer = ->
	for dom in $ "#control-ring li"
		button = new Button($ dom)

clickTheBubbleAndCaculateTheSum = ->
	bubble = $("#info-bar")
	bubble.attr "enable" , "false"
	bubble.click =>
		if bubble.attr("enable") is 'true'
			bubble.find("#sum").text countSum()
			bubble.attr "enable" , "false"
			bubble.css('background-color', '#686868')

countSum = ->
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
	bubble.find('span').text ''
	bubble.attr 'enabled', 'false'
	bubble.css('background-color', '#686868')
