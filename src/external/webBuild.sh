#!/bin/sh
#assuming we are in the external folder already
# delete the old out folder if it exists
if [ -d "fernQuestOut" ]; then
    rm -rf fernQuestOut
    echo 'removed old out folder...'
fi

#head to the fernquest directory
cd ~/Documents/FernQuest/ || exit
echo 'working in fernquest directory'

echo 'building binary wasm file and JS'
# build the backend into wasm files
emcc -Os --bind FernQuestBindings.cpp -Icpp src/Interact.cpp -s WASM=1 -s MODULARIZE=1 -o FernQuestInteract.js
echo 'done building'

echo 'moving files'
#make the folder we want
mkdir fernQuestOut

#move the files to their respective places
mv FernQuestInteract.js fernQuestOut/FernQuestInteract.js
mv FernQuestInteract.wasm fernQuestOut/FernQuestInteract.wasm

mv fernQuestOut ~/Documents/myReactApp/src/external/fernQuestOut

echo 'done!'
