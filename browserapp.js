$(function(){
	var requestDeviceParms = {
	filters: [
		{
		name: ["AMCTestDevice"]
		}
	],
	optionalServices: ["4fafc201-1fb5-459e-8fcc-c5c9c331914b"]
	};

	$("#connect").click(() => {
		console.log("Running BLE Code");
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

	$("unpair").click(() => {
		console.log("You clicked the Unpair button!!!!");
	});
	
});
