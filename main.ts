input.onButtonPressed(Button.A, function () {
    if (brightness < 0) {
        brightness = 0
    } else {
        brightness += -16
    }
})
input.onButtonPressed(Button.AB, function () {
    if (colourSetting == 5) {
        colourSetting = 0
    } else {
        colourSetting += 1
    }
})
input.onButtonPressed(Button.B, function () {
    if (brightness >= 255) {
        brightness = 255
    } else {
        brightness += 16
    }
})
let brightness = 0
let colourSetting = 0
let zipLEDs = kitronik_smart_greenhouse.createGreenhouseZIPDisplay(8)
let zipStick = zipLEDs.zipStickRange()
colourSetting = 0
brightness = 128
zipStick.setBrightness(brightness)
basic.forever(function () {
    zipStick.setBrightness(brightness)
    zipStick.show()
    if (colourSetting == 0) {
        zipStick.showColor(kitronik_smart_greenhouse.colors(ZipLedColors.White))
    } else if (colourSetting == 1) {
        zipStick.showColor(kitronik_smart_greenhouse.colors(ZipLedColors.Red))
    } else if (colourSetting == 2) {
        zipStick.showColor(kitronik_smart_greenhouse.colors(ZipLedColors.Green))
    } else if (colourSetting == 3) {
        zipStick.showColor(kitronik_smart_greenhouse.colors(ZipLedColors.Blue))
    } else if (colourSetting == 4) {
        zipStick.showColor(kitronik_smart_greenhouse.rgb(255, 75, 200))
    } else if (colourSetting == 5) {
        zipStick.clear()
        zipStick.show()
    }
})
