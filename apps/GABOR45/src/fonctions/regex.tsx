const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const regexPassword = /^.{6,}$/;
const regexName = /^[a-zA-Z]{2,}$/;
const regexPhone = /^[0-9]{10}$/;
const regexAddress = /^[a-zA-Z0-9\s,'-]*$/;
const regexZip = /^[0-9]{5}$/;
const regexCity = /^[a-zA-Z\s,'-]*$/;
const regexCountry = /^[a-zA-Z\s,'-]*$/;
const regexNumber = /^[0-9]{1,}$/;
const regexDate = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
const regexTime = /^[0-9]{2}:[0-9]{2}$/;
const regexPrice = /^[0-9]{1,}(\.[0-9]{1,2})?$/;
const regexId = /^[0-9]{1,}$/;

function regexTest(value: string, regex: string): boolean {
	switch (regex) {
		case 'email':
			return regexEmail.test(value);
		case 'password':
			return regexPassword.test(value);
		case 'name':
			return regexName.test(value);
		case 'phone':
			return regexPhone.test(value);
		case 'address':
			return regexAddress.test(value);
		case 'zip':
			return regexZip.test(value);
		case 'city':
			return regexCity.test(value);
		case 'country':
			return regexCountry.test(value);
		case 'number':
			return regexNumber.test(value);
		case 'date':
			return regexDate.test(value);
		case 'time':
			return regexTime.test(value);
		case 'price':
			return regexPrice.test(value);
		case 'id':
			return regexId.test(value);
		default:
			return false;
	}
}
export default regexTest;
