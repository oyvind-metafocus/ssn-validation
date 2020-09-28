//Validation for norwegian social security numbers
var validateSocialSecurityNumberNo = function($element) {
	var $validationField = findMyHiddenBrother($element);
	if($element.val().length > 0 && $element.val().length < parseInt($element.attr("maxlength"))) {
		$validationField.val(false);
		var $errorMessage = $element.parent().find(".digiforms_validation_message");
		$errorMessage.text("Må være 11 siffer (DDMMÅÅXXXXX)");
		if ($("html").attr("lang").toLowerCase() == "se") {
			$errorMessage.text("Måste vara 11 siffror (DDMMÅÅXXXXX)");
		}
		else if ($("html").attr("lang").toLowerCase() == "en") {
			$errorMessage.text("Must be 11 digits (DDMMYYXXXXX)");
		}
	}
	else {
		var valid1 = validationMOD11($element.val().substring(0, 10), "376189452", true); //1st Kontrollsiffer
		var valid2 = validationMOD11($element.val(), "5432765432", false); //Second control number
		$validationField.val(valid1 && valid2);
		if(!(valid1 && valid2) && $element.val().length > 0) {
			var $errorMessage = $element.parent().find(".digiforms_validation_message");
			$errorMessage.text("Ugyldig fødselsnummer");
			if ($("html").attr("lang").toLowerCase() == "se") {
				$errorMessage.text("Ogiltigt personnummer");
			}
			else if ($("html").attr("lang").toLowerCase() == "en") {
				$errorMessage.text("Invalid social security number");
			}
		}
	}
}

function validationMOD11(val, weightNumber, ignoreLength) {
	var number = removeWhiteSpaces(val);

	//1. Sum up all the products of multiplying
	//each digit with the corresponding weight number
	var sum = 0;
	for(var i=0; i < number.length - 1; i++) {
		sum += number.charAt(i) * weightNumber.charAt(i);
	}

	//2. Calculate the reminder using modulo 11
	var reminderMOD11 = sum % 11;

	//3. Calculate control number (norwegian account numbers/social sequrity numbers can't have a reminder of 1)
	var calculatedControllNumber = reminderMOD11 == 0 ? 0 : 11 - reminderMOD11;

	//4. Check if the calculated control number is equal to the one entered by the user
	if (calculatedControllNumber != number[number.length - 1] && (ignoreLength || number.length == 11)) {
		return false;
	}
	else if (ignoreLength || number.length == 11) {
		return true;
	}
	else {
		return false;
	}
}

function findMyHiddenBrother($input) {
	var $validationField = $input.closest(".label_control").parent().parent().find("input[type=hidden]:first");
	return $validationField;
}

//Removes whitespaces from a given string
function removeWhiteSpaces(str) {
	var subStrings = str.split(" ");
	var newStr = "";
	for(var i=0; i < subStrings.length; i++) {
		newStr += subStrings[i].trim();
	}
	return newStr;
}

function testSwedFnr($input) {
            // Check valid length & form
            if (!input) { return false; }

            if (input.indexOf('-') === -1) {
                if (input.length === 10) {
                    input = input.slice(0, 6) + "-" + input.slice(6);
                } else {
                    input = input.slice(0, 8) + "-" + input.slice(8);
                }
            }
            if (!input.match(/^(\d{2})(\d{2})(\d{2})\-(\d{4})|(\d{4})(\d{2})(\d{2})\-(\d{4})$/)) { return false };

            // Clean input
            input = input.replace('-', '');
            if (input.length === 12) {
                input = input.substring(2);
            }

            // Declare variables
            var d = new Date(((!!RegExp.$1) ? RegExp.$1 : RegExp.$5), (((!!RegExp.$2) ? RegExp.$2 : RegExp.$6)-1), ((!!RegExp.$3) ? RegExp.$3 : RegExp.$7)),
                    sum = 0,
                    numdigits = input.length,
                    parity = numdigits % 2,
                    i,
                    digit;

            // Check valid date
            if (Object.prototype.toString.call(d) !== "[object Date]" || isNaN(d.getTime())) return false;

            // Check luhn algorithm
            for (i = 0; i < numdigits; i = i + 1) {
                digit = parseInt(input.charAt(i), 10);
                if (i % 2 === parity) { digit *= 2; }
                if (digit > 9) { digit -= 9; }
                sum += digit;
            }
            return (sum % 10) === 0;
        }
