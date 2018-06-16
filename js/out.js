/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// Do zrobienia wykresu, który będzie się zmieniał dynamicznie skorzystać z chartjs-plugin-streaming\n\n$(function () {\n    // Pole do wyboru opcji\n\n    var chart = $(\"#canvas\");\n\n    var laptimeOptions = [];\n    var selectY1 = $('#Y-axis-1');\n\n    var lapDataUrl = 'http://localhost:3000/test-lap/';\n\n    selectY1.on('change', function () {\n        showData(lapDataUrl, this.value);\n    });\n\n    function renderData(givenLapData, selectedData) {\n\n        // Label\n\n        var labels = givenLapData.map(function (e) {\n            return e.DistanceM;\n        });\n\n        // Dodatkowe linie\n\n        // var dataSpeed = givenLapData.map(function(e) {\n        //     return e.SpeedKph;\n        // });\n        // var dataAcceleration = givenLapData.map(function(e) {\n        //     return e.LongitudinalAccelerationG;\n        // });\n\n        // Input data\n        var inputData = givenLapData.map(function (e) {\n            return e[selectedData];\n        });\n\n        var ctx = canvas.getContext('2d');\n        var config = {\n            type: 'line',\n            data: {\n                labels: labels,\n                datasets: [{\n                    label: selectedData,\n                    data: inputData,\n                    backgroundColor: 'rgba(0, 119, 204, 0.3)'\n                }]\n\n                // Wyswietlanie dodatkowych linii\n\n                // ,\n                //     {\n                //         label: 'Acceleration',\n                //         data: dataAcceleration,\n                //         backgroundColor: 'rgba(249, 14, 14, 0.3)'\n                //     }]\n            }\n        };\n\n        var chart = new Chart(ctx, config);\n    }\n\n    function showData(givenUrl) {\n        var selectedLapData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'SpeedKph';\n\n        $.ajax({\n            url: givenUrl\n        }).done(function (response) {\n            // console.log(Object.keys(response[0]));\n            laptimeOptions = Object.keys(response[0]);\n            laptimeOptions.map(function (element) {\n                selectY1.append($('<option>' + element + '</option>'));\n            });\n            renderData(response, selectedLapData);\n        }).fail(function (error) {\n            console.log(error);\n        });\n    }\n\n    showData(lapDataUrl);\n\n    // ROZKMINIĆ JAK TO DZIAŁA\n    // File upload\n\n    var Upload = function Upload(file) {\n        this.file = file;\n    };\n\n    Upload.prototype.getType = function () {\n        return this.file.type;\n    };\n    Upload.prototype.getSize = function () {\n        return this.file.size;\n    };\n    Upload.prototype.getName = function () {\n        return this.file.name;\n    };\n    Upload.prototype.doUpload = function () {\n        var that = this;\n        var formData = new FormData();\n\n        // add assoc key values, this will be posts values\n        formData.append(\"file\", this.file, this.getName());\n        formData.append(\"upload_file\", true);\n\n        $.ajax({\n            type: \"POST\",\n            url: \"script\",\n            xhr: function xhr() {\n                var myXhr = $.ajaxSettings.xhr();\n                if (myXhr.upload) {\n                    myXhr.upload.addEventListener('progress', that.progressHandling, false);\n                }\n                return myXhr;\n            },\n            success: function success(data) {\n                // tutaj powinienem wrzucony plik wrzucić do src #video-file a pozniej odpalic load()\n                // $(\"#video-file\").attr('src', Upload.getName);\n            },\n            error: function error(_error) {\n                console.log(_error);\n            },\n            async: true,\n            data: formData,\n            cache: false,\n            contentType: false,\n            processData: false,\n            timeout: 60000\n        });\n    };\n\n    Upload.prototype.progressHandling = function (event) {\n        var percent = 0;\n        var position = event.loaded || event.position;\n        var total = event.total;\n        var progress_bar_id = \"#progress-wrp\";\n        if (event.lengthComputable) {\n            percent = Math.ceil(position / total * 100);\n        }\n        // update progressbars classes so it fits your code\n        $(progress_bar_id + \" .progress-bar\").css(\"width\", +percent + \"%\");\n        $(progress_bar_id + \" .status\").text(percent + \"%\");\n    };\n\n    //Change id to your id\n    $(\"#video-file-upload\").on(\"change\", function (e) {\n        var file = $(this)[0].files[0];\n        var upload = new Upload(file);\n\n        // maby check size or type here with upload.getSize() and upload.getType()\n\n        // execute upload\n        upload.doUpload();\n    });\n});\n\n//# sourceURL=webpack:///./js/app.js?");

/***/ })

/******/ });