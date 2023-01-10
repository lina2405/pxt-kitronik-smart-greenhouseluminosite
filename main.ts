input.onButtonPressed(Button.B, function () {
    if (colourSetting == 5) {
        colourSetting = 0
    } else {
        colourSetting += 1
    }
    if (brightness >= 255) {
        brightness = 255
    } else {
        brightness += 16
    }
    if (brightness == 0) {
        brightness = 0
    } else {
        brightness += -16
    }
})
let soilHue = 0
let humidHue = 0
let tempHue = 0
let brightness = 0
let colourSetting = 0
let zipLEDS = kitronik_smart_greenhouse.createGreenhouseZIPDisplay(8)
let zipStick = zipLEDS.zipStickRange()
colourSetting = 0
brightness = 128
zipStick.setBrightness(brightness)
zipLEDS = kitronik_smart_greenhouse.createGreenhouseZIPDisplay(8)
let statusLEDs = zipLEDS.statusLedsRange()
basic.forever(function () {
    basic.showNumber(kitronik_smart_greenhouse.temperature(TemperatureUnitList.C))
    basic.showNumber(kitronik_smart_greenhouse.humidity())
    basic.showNumber(kitronik_smart_greenhouse.readIOPin(kitronik_smart_greenhouse.PinType.analog, kitronik_smart_greenhouse.IOPins.p1))
})
basic.forever(function () {
    if (brightness >= 100) {
        brightness = 0
    }
})
basic.forever(function () {
    if (brightness < 100) {
        brightness = 120
    }
})
basic.forever(function () {
    tempHue = Math.map(kitronik_smart_greenhouse.temperature(TemperatureUnitList.C), 0, 40, 210, 0)
    humidHue = Math.map(kitronik_smart_greenhouse.humidity(), 0, 100, 35, 150)
    soilHue = Math.map(kitronik_smart_greenhouse.readIOPin(kitronik_smart_greenhouse.PinType.analog, kitronik_smart_greenhouse.IOPins.p1), 0, 1023, 35, 150)
    statusLEDs.setZipLedColor(0, kitronik_smart_greenhouse.hueToRGB(tempHue))
    statusLEDs.setZipLedColor(1, kitronik_smart_greenhouse.hueToRGB(humidHue))
    statusLEDs.setZipLedColor(2, kitronik_smart_greenhouse.hueToRGB(soilHue))
    statusLEDs.show()
})
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
