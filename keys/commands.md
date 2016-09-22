
HOW TO SIGN DEBUG / RELEASE BUILDS
==================
==================
==================

GENERATE KEYSTORE

(WE USE THIS)
keytool -genkey -v -keystore keys/smc-debug.keystore -alias smc-debug -keyalg RSA -keysize 2048 -validity 90000

keytool -genkey -v -keystore keys/javi-apps-debug.keystore -alias javi-apps-debug -keyalg RSA -keysize 2048 -validity 90000




SIGN DEBUG APK

(WE USE THIS)
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore keys/smc-debug.keystore android-release-unsigned.apk smc-debug

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore keys/javi-apps-debug.keystore android-release-unsigned.apk javi-apps-debug


OPTIMIZE APK

(WE USE THIS)
zipalign -v 4 android-release-unsigned.apk smc-release-signed.apk 



INSTALL ON DEVICE

(WE USE THIS)
adb install smc-release-signed.apk 





SOCIAL AUTH
================

== FACEBOOK
============

==#DATA

===(WE USE THIS)
===SMC PROD APP_ID 		297780367242758
===SMC PROD APP_NAME    Shopmycourses

===(TEST)
===GAB PROD APP_ID 		736616539803779
===GAB PROD APP_NAME    Getabiker

== GOOGLE
============

==#INSTALL THE PLUGIN
cordova plugin add cordova-plugin-googleplus --save --variable REVERSED_CLIENT_ID=[INVERSED_API_KEY_HERE]

==#CREATE AN OAUTH API KEY IN GOOGLE DEV CONSOLE 

==#GET SHA-1 
	
	- GET SHA-1 FROM KEYSTORE 

	EX:

	keytool -exportcert -keystore keys/smc-debug.keystore -list -v

	keytool -exportcert -keystore keys/javi-apps-debug.keystore -list -v

	keytool -exportcert -list -v -alias <your-key-name> -keystore <path-to-production-keystore>

==#APPLY SHA-1 AND GET API_KEY

==#EX:

GOOGLE (SHOPMYCOURSES)  (DEBUG?)

com.googleusercontent.apps.979481548722-0eb5la0dn86anucanfm2d1tkbssr0o93

GOOGLE (SHOPMYCOURSES) (PROD) (DEBUG?)

(WIP)

GOOGLE (GETACOURSIER) (TEST)
com.googleusercontent.apps.996868564337-v5p0mb40u1o3qudae9a2ucuj275u7896
996868564337-v5p0mb40u1o3qudae9a2ucuj275u7896.apps.googleusercontent.com

GOOGLE (GETABIKER)(DEBUG)
com.googleusercontent.apps.626641878895-p9bhb40str3ce904c4e7dekvu9d6hd0b
626641878895-p9bhb40str3ce904c4e7dekvu9d6hd0b.apps.googleusercontent.com




HASH FOR FACEBOOK

keytool -exportcert -alias rodrigo-apps-debug -keystore keys/smc-debug.keystore | openssl sha1 -binary | openssl base64
