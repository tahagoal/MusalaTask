echo 'Backend Start ..'
cd ./Back
echo 'Installing Packages ..'
npm install
echo 'Building Backend ..'
npm run tsc
echo 'Frontend Start ..'
cd ../Front
echo 'Installing Packages ..'
npm install
echo 'Building Frontend ..'
ng build --prod