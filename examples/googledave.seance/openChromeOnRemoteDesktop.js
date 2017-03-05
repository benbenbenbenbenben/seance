//console.log("this:", this)
//console.log("arguments:", arguments)

with (mediums.vnc) {
    
    connect("curlyben")
    
    doubleclick("chromeicon.png")

    find("chromebrowseraddressbar.png")
    
    type("cool dogs")

    type(keys.return)
}

