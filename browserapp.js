$(function(){
	var requestDeviceParms = {
	filters: [
		{
		name: ["AMCTestDevice"]
		}
	],
	optionalServices: ["2937aa48-6f5c-4778-9078-f804143a1c71"]
	};

	$("#connect").click(() => {
		console.log("Running BLE Code");
		navigator.bluetooth.requestDevice(requestDeviceParms).then(device => {
			device.gatt.connect().then(gattServer =>{
				gattServer.getPrimaryService("2937aa48-6f5c-4778-9078-f804143a1c71").then(gattService=>{
					gattService.getCharacteristic("58eabb08-ea2d-4606-a3ec-f6adefbf7cb2").then(gattCharacteristic=>{
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

	$("#unpair").click(() => {
		console.log("You clicked the Unpair button!!!!");
	});
	
});
