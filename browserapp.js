$(function(){
	var requestDeviceParms = {
	filters: [
		{
		name: ["MYDEVICE"]
		}
	],
	optionalServices: ["00FF"]
	};

	$("#test").click(() => {
		console.log("Running BLE Code");
		navigator.bluetooth.requestDevice(requestDeviceParms).then(device => {
			device.gatt.connect().then(gattServer =>{
				gattServer.getPrimaryService("00FF").then(gattService=>{
					gattService.getCharacteristic("FF01").then(gattCharacteristic=>{
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
