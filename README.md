user-server for Shumin
===========

## User DB Schema

``` javascript
{
// vvvvvvv REQUIRED vvvvvvv
    active: true,			// *
    type: {					// *
	    following_num: 0,	// *
	    following_id: []	// *
	},
    email: String,unique,   // *
    name: String,unique,    // *
    passwd: String,         // *
    language: "en", // http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
    paid_statement: false,	// *
    changed_limited: 0,		// *
    flow: 0,				// *
// vvvvvvvv OPTIONAL vvvvvv 
    bigHead: String,
    country: String, //http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
    phone: String,
    sex: String,
    bio: String,
}
/* URL behind language, country is the language and country code reference will store in DB */
```

## User API:
No.| URI | METHOD | PARAMETER | RETURN_VALUE | Detail
-- | --- | ------ | --------- | ------------ | --------
1 | ${MY_IP}/users | GET | None | [{/*user data*/}] | Get all user data in db
2 | ${MY_IP}/users/:key/:value | GET | :key, :value | {/*user data*/} | Replace :key and :value in URI to change the query option, e.g: "${MY_IP}/users/name/Chalos" is meant to query "name" as key, "Chalos" as value
3 | ${MY_IP}/users/add | POST | {email, passwd, name} | {success: true} or {error: {status}, message} | email, passwd, name are REQUIRED as parameter to add new User
4 | ${MY_IP}/users/update/:key/:value | POST | :key, :value, {/*key value pair in Schema*/} | replace :key, :value in URI as above(2), and Schema that have " * " at behind are unable to be edited.