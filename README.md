# FaceDetect
Es una aplicacion movil, la cual reconoce tu rosto registrado con tu datos (Nombre, Username, Email).

Analiza el rostro para verificar si es la misma persona, muestra los datos privados.

## Tecnologias Utilizadas
- [Ionic 3](http://ionicframework.com/) 
- [Firebase](https://firebase.google.com/)
- [ApiFace Servicios Cognitivos de Microsoft](https://azure.microsoft.com/en-us/services/cognitive-services/)


## Config & Start
1. Clone el repositorio e ingrese a la carpeta del mismo.

2. Instalar las dependencias:
    - ```npm install -g ionic@latest ```
    - ```npm install ```

3. En la ruta ```FaceDetect/src/app/``` crear el archivo app.config.ts y agregar las configuracion de [firebase](https://firebase.google.com/) y [ApiKey de Microsoft](https://azure.microsoft.com/en-us/services/cognitive-services/) (app.config.sample.js de ejemplo):

```
export const config = {
  firebaseConfig: {
    apiKey: "apiKey-firebase",
    authDomain: "authDomain-firebase",
    databaseURL: "databaseURL-firebase",
    projectId: "projectId-firebase",
    storageBucket: "storageBucket-firebase",
    messagingSenderId: "messagingSenderId-firebase"
  },
  apiKeyMicrosoft: 'apiKeyMicrosoft'
};
```

4. Correr el servidor ``` ionic serve ``` , puedes [ver la documentacion de ionic](http://ionicframework.com/docs/cli/) para mas comando.

## Video
[![FaceDetect](https://i.ytimg.com/vi/e3OM3bc9iW8/hqdefault.jpg)](https://youtu.be/e3OM3bc9iW8 "FaceDetect Video")
