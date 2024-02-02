const regexEmail = new RegExp(
	'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
);
const regexPassword = new RegExp('^.{6,}$');
const regexName = new RegExp('^[a-zA-Z]{2,}$');
const regexPhone = new RegExp('^[0-9]{10}$');
const regexAddress = new RegExp("^[a-zA-Z0-9s,'-]*$");
const regexZip = new RegExp('^[0-9]{5}$');
const regexCity = new RegExp("^[a-zA-Zs,'-]*$");
const regexCountry = new RegExp("^[a-zA-Zs,'-]*$");
const regexNumber = new RegExp('^[0-9]{1,}$');
const regexDate = new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}$');
const regexTime = new RegExp('^[0-9]{2}:[0-9]{2}$');
const regexPrice = new RegExp('^[0-9]{1,}(.[0-9]{1,2})?$');
const regexId = new RegExp('^[0-9]{1,}$');
const regexUrl = new RegExp(
	'(\b(https?|ftp|file)://)?[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]',
);
const regexFacebook = new RegExp('^[A-Za-z.]{1,50}$');
const regexInstagram = new RegExp('^[A-Za-z.]{1,50}$');
const regexTwitter = new RegExp('^[A-Za-z.]{1,50}$');

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
		case 'url':
			return regexUrl.test(value);
		case 'facebook':
			return regexFacebook.test(value);
		case 'instagram':
			return regexInstagram.test(value);
		case 'twitter':
			return regexTwitter.test(value);
		default:
			return false;
	}
}
export default regexTest;
