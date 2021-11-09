let currentDevice;
let isPause = false
let isFilt = false
const serviceUUID = '0000ff05-0000-1000-8000-00805f9b34fb'
const charUUID = '0000aa05-0000-1000-8000-00805f9b34fb'
let package = []


console.log("This is  a strange and wierd error message.")

$(".btn").click(evt => {
  document.body.style.backgroundColor = getRandomColor()
  console.log(evt.target.innerHTML, 'is clicked')
  $("#hw").get(0).innerHTML = evt.target.innerHTML + " is clicked"
  switch (evt.target.id) {
    case "bt_scan":
      scanDevice()
      break;
  
    case "bt_con":
      connectDevice(currentDevice)
      break;

    case "bt_discon":
      disconnectDevice(currentDevice)
      break;

    case "bt_pauce":
      
      break;

    case "bt_filter":
      
      break;

    default:
      console.log("this shouldn't be happend")
      break;
  }
})

document.body.style.backgroundColor=getRandomColor()

//bluetooth function
function scanDevice(){
  navigator.bluetooth.requestDevice({
    acceptAllDevices: true,
    optionalServices: [serviceUUID]
  }).then( device =>{
    currentDevice = device
    console.log(currentDevice + ' is selected')
  }).catch(err => console.log('scan request device error', err),)
}

function connectDevice(dev){
  dev.gatt.connect().then(server => {
    console.log(server)
    return server.getPrimaryService(serviceUUID)
  }).then(service => {
    console.log(service)
    return service.getCharacteristic(charUUID)
  }).then(char =>{
    console.log(char)
    char.startNotifications().then(c => {
      c.addEventListener('characteristicvaluechanged', function(evt){
        if(!isPause){
          console.log('in eventlistener')
          package = Array.from(new Uint16Array(this.value.buffer))
          $("#package_title")[0].innerHTML = 'Package length is ' + package.length
          $("#package_body")[0].innerHTML = '[' + package + ']'
        }
      })
    })
  }).catch(err => console.log('connect device error ', err),)
}

function disconnectDevice(dev){
  dev.gatt.disconnect()
  console.log(dev.name, ' is disconnected')
  package = []
}

//utility function
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}