// Primary: 4fafc201-1fb5-459e-8fcc-c5c9c331914b
// Get data characteristic: beb5483e-36e1-4688-b7f5-ea07361b26a8
// Start measurement characteristic: f9bf42c7-52a8-4b96-8f68-6a88326e1269

/******************************************************************************
 * Working function to get reading from the esp
 ******************************************************************************/
$(function(){
	var requestDeviceParms = {
	filters: [
		{name: ["AMCTestDevice"]}
		//{services: '4fafc201-1fb5-459e-8fcc-c5c9c331914b'},
		//{services: 'beb5483e-36e1-4688-b7f5-ea07361b26a8'},
		//{acceptAllDevices: true}
	],
	optionalServices: ["4fafc201-1fb5-459e-8fcc-c5c9c331914b"]
	};

	$("#pair").click(() => {
		console.log("Pairing Device");
		navigator.bluetooth.requestDevice(requestDeviceParms).then(device => {
			device.gatt.connect().then(gattServer =>{
				gattServer.getPrimaryService("4fafc201-1fb5-459e-8fcc-c5c9c331914b").then(gattService=>{
					gattService.getCharacteristic("beb5483e-36e1-4688-b7f5-ea07361b26a8").then(gattCharacteristic=>{
						gattCharacteristic.startNotifications().then(gattCharacteristic=>{
							gattCharacteristic.addEventListener("characteristicvaluechanged", event=>{
								var value = event.target.value.getUint8(0);
								$("#notifiedValue").text("" + value);
							});
						});
					});
				});
			});
		});
	});

});

/******************************************************************************
 * This one will work one day haha.
 ******************************************************************************/
/*
$(function(){
	var requestDeviceParms = {
	filters: [
		{name: ["AMCTestDevice"]}
		//{services: '4fafc201-1fb5-459e-8fcc-c5c9c331914b'},
		//{services: 'beb5483e-36e1-4688-b7f5-ea07361b26a8'},
		//{acceptAllDevices: true}
	],
	optionalServices: ["4fafc201-1fb5-459e-8fcc-c5c9c331914b"]
	};

	$("#read").click(() => {
		console.log("Getting value on from device");
		navigator.bluetooth.requestDevice(requestDeviceParms)
		   .then(device => {device.gatt.connect()
		   .then(gattServer =>{gattServer.getPrimaryService("4fafc201-1fb5-459e-8fcc-c5c9c331914b")
		   .then(gattService=>{gattService.getCharacteristic("beb5483e-36e1-4688-b7f5-ea07361b26a8")
		   .then(gattCharacteristic=>{gattCharacteristic.startNotifications()
		   .then(gattCharacteristic=>{gattCharacteristic.addEventListener("characteristicvaluechanged", event=>{
									  var value = event.target.value.getUint8(0);
								      $("#notifiedValue").text("" + value);
							});
		   console.log("startNotifications() failed!!")
						});
					});
				});
			});
		});
	});

});
*/
function turnLEDOn(){
	console.log('Turning LED on...');
}