//console.log("this:", this)
//console.log("arguments:", arguments)

with (mediums.vnc) {
    
    //connect("curlyben")
    connect("msedgewin10")
   // connect("192.168.0.31")
    
    //connect("10.210.138.155")
    
    doubleclick("chromeicon.png")

    find("chromebrowseraddressbar.png")
    
    type("cool dogs")

    type(keys.return)
}

