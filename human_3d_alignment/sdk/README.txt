Framsticks SDK in JavaScript
----------------------------

Note: Emscripten does not like spaces in paths.
In order to compile the Framsticks SDK properly, ensure you don't have spaces in directory names.

To generate the newest JavaScript version of the Framsticks SDK, you need to have the latest version
of Emscripten installed. To perform a compilation, you first need to activate the Emscripten SDK:

On Windows:
	emsdk.bat activate latest

On Linux:
	emsdk activate latest

The emsdk script should be available in your Emscripten install directory.
"latest" can be replaced by any name of the Emscripten version installed. 
After activating the Emscripten SDK, to compile Framsticks SDK you need to call:

On Windows:
	emmake.bat mingw32-make.exe -j8 --directory=../../cpp -f ../js/sdk/Makefile-SDK-Emscripten.mak

On Linux:
	$EMSCRIPTEN/emmake make --directory=../../cpp -f ../js/sdk/Makefile-SDK-Emscripten.mak

After completing this, the JavaScript version of Framsticks SDK should be available as frams-sdk.js.



Classes, methods and fields available in JavaScript Framsticks SDK are defined in js_interface/js_interface.idl.
To access them from a JavaScript app, you need to include the JavaScript version of Framsticks SDK file in HTML:
	<script src="sdk/frams-sdk.js"></script>

and then you can access Framsticks classes in JavaScript files using the Module variable like that:
	let gcm = new Module.DefaultGenoConvManager();
	gcm.addDefaultConverters();
	let dummyGeno = new Module.Geno().useConverters(gcm);
	Module.destroy(dummyGeno);
	let validators = new Module.Validators();
	dummyGeno = new Module.Geno().useValidators(validators);
	Module.destroy(dummyGeno);
	let modelValidator = new Module.ModelGenoValidator();
	validators.append(modelValidator);
