# How to publish the library

1. Checkout the latest version of the main branch:
```
git checkout main
git pull
```
2. Update the library version number:
```
npm version patch
git push origin main
```
3. Build the library:
```
npm run build
```
4. Publish the library:
```
npm publish
```
