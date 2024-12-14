<p align="center">
  <img src="public/favicon.svg" alt="CloseUp" width="200"/>
  <h1 align="center">CloseUp</h1>
</p>

<p align="center">
  CloseUp 3D model viewer for web and desktop
</p>

## About
The CloseUp viewer is based on [m3dv](https://github.com/123Wampir/m3dv) library. The user interface is created using [Vue](https://vuejs.org/). [Electron](https://www.electronjs.org/) was used for desktop builds.

## Features
- Supports GLTF, STEP, IGES, BREP formats
- Powerful clipping planes
- Two types of model explode strategies (simple and phased)
- Material editor
- Environment settings
- Properties view
- Keyboard shortcuts
- UI theming

## Build & Run
There's some scripts in [package.json](package.json) to help you with basic tasks.

First of all, use `npm i` to get all the necessary dependencies.

### Run
1. To run in browser use `npm run dev`
2. To run on desktop use `npm run start`

### Build
1. To build for browser use `npm run build`. Output's to `dist` folder
2. To build binaries for specified system use `npm run make-win`, `npm run make-linux` or `npm run make-darwin`
3. To build binaries archive use `npm run make-win-zip`, `npm run make-linux-zip` or `npm run make-darwin-zip`

## Bugs & Contributing
If you have any problem with this viewer, have suggestions for improvements, or want to help with development, feel free to create new Issue or Pull Request.

## Showcase
App UI
![App UI](/readme/readme1.png)
Sections settings
![Sections settings](/readme/readme2.jpg)
Exploded view
![Exploded view](/readme/readme3.jpg)
Material editor
![Material editor](/readme/readme4.jpg)
Electron app
![Electron app](/readme/readme5.jpg)
You can view the help by clicking on the button in the upper right corner
![help popup](/readme/readme6.jpg)