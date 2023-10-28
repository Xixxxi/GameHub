const textElement = document.getElementById("text");
const optionButtonsElement = document.getElementById("option-buttons");

//function that starts the Game & sets the state of application as it needs to be
function startGame(){
  state = {};
  showTextNode(1);
}

//display on what option we are on
function showTextNode(textNodeIndex){
  
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
  textElement.innerText = textNode.text;
  while(optionButtonsElement.firstChild){
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }
  textNode.options.forEach(option => {
    if(showOption(option)){
      const button = document.createElement("button");
      button.innerText = option.text;
      button.classList.add("btn");
      button.addEventListener("click", () => selectOption(option));
      optionButtonsElement.appendChild(button);
     }
  });
}
  

// function to show option depending on state
function showOption(option){
  return option.requiredState == null || option.requiredState(state);
}

//takes whatever option was selected
function selectOption(option){
  
 const nextTextNodeId = option.nextText;
  if(nextTextNodeId <= 0){
    return startGame();
  }
  
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId);
}

// another const declared here !!!!!!!!!!!!!!!!!!!!!!!!!

const textNodes = [
  {
    id: 1,
    text: "You wake up on top of a mysterious hill. \n You don't know where you are but maybe you can find out. \n You feel the cold wind lowering your body temperature, but for now it's ok. \n\n It's pretty foggy around the hill but you can see a River further south, you also see a small village far north. \n\n Close to the place you woke up you see a piece of cloth you pick up. \n It's a little warmer now, but where do you go?",
    options: [
    {
    text: "Go south along the river",
    setState: {cloth: true},
    nextText: 2
  },{
    text: "Go north towards the village",
    setState: {cloth: true},
    nextText: 3
       }   
    ]
  },
  
  //north-way story !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  {
    id: 3,
    text: "You venture forth in search of answers to where you are, when the fog starts to increasingly get worse and worse. \n You try to walk a straight line towards the village, but you aren't quite sure how straight it is. After walking for some hours you realize that you got lost. \n You try to remember where you've seen this town but it isn't that easy. \n\n You walk and walk and suddenly see a little cabin. It appears to be empty.",
    options: [
    {
    text: "Go inside",
    nextText: 5
  },{
    text: "Ignore the Cabin",
    nextText: 7
      }    
    ]
  },   {
    id: 5,
    text: "Door is not opening, it is locked from the outside. You see some bigger stones lying around. Also a small back window appears to be loose.",
    options: [
    {
    text: "Pick up a stone and break the lock",
    setState: {stone: true, lock: true},
    nextText: 9
  }, {
    text: "Break the window",
    nextText: 11
  } ,{
    text: "Ignore the Cabin",
    nextText: 7
      }    
    ]
  }, 
  //Break the cabins lock !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    {
    id: 9,
    text: "You picked up the stone and broke the lock, both things you take inside. It is empty, as you assumed. Actually it looks quite cozy too. You lock the door from inside and lay down on the couch. ..And as it's getting darker and darker, you fall asleep. \n After some good hours of sleep you wake up in a quite good mood. \n You see that the cabin has plenty of food stashed and you start to eat. After eliminating some of the food you find a backpack full of useful items, such as a knife, some medical stuff and so on. \n Also it's not foggy anymore so it would be best to head further towards the village. \n \n While you're not sure about where to continue the road, you see a small hill that could maybe help you. It's quite a way but maybe it could help.",
    options: [
    {
    text: "Climb the hill",
    nextText: 99
  },{
    text: "Try to guess your way to the village",
    nextText: 1111112
      }    
    ]
  },
  
  //Hill-cLimbing after cabin starts here wakeup !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
  {
    id: 99,
    text: "You walk towards the hill. \n You had quite a good night, also now that you are supplied theres only one way to go. \n You walk and walk and about some hours later you reach the top of this hill. It's higher up than you initially imagined so the view is pretty good. You have a clean 360° view of your surroundings, but about 0 idea where to go next. \n Deep in the mountains it appears as if there would be some kind of mountain village. Further north a lot of houses seem like village you once were headed towards.",
    options: [
    {
    text: "Explore mountain village",
    nextText: 1111111
  },{
    text: "Go towards initial village",
    nextText: 1111112
      }    
    ]
  },
  
  //Hill-cLimbing after cabin wakeup ends here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
  
  //Break cabins lock over !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
  //Break window starts here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
    {
    id: 11,
    text: "You break the back window and enter the cabin. It is empty, as you assumed. Actually it looks quite cozy too. You lay down on the couch and as it's getting darker and darker, you fall asleep. After only a few hours of sleep, but still in the middle of the night you here loud noises right next to you, and immediately you wake up. A whole fox-like looking family entered the cabin through the open window you broke. As it turnes out they don't like sharing their sleeping spot so somebody has to leave.",
    options: [
    {
    text: "Fight the foxes",
    nextText: 111
  },{
    text: "Leave the cabin",
    setState: {cloth: false},
    nextText: 112
      }    
    ]
  },
 
  // rushed-out starts here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  {
    id: 112,
    text: "While you rush out of that cabin you forget your piece of cloth that was covering you on the couch. It's so dark that you barely see anything but you run and run and finally stop running, only because you've tripped over a root and knocked yourself out. Well done. ",
    options: [
    {
    text: "Try to wake up",
    nextText: 1121
  },{
    text: "Restart",
    nextText: -1
  }
    ]
  }, {
    id: 1121,
    text: "If only it would be that easy...",
    options: [
    {
    text: "Restart",
    nextText: -1
      }
    ]
  }, 
  // rushed-out ends here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
   // fighting the foxes starts here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  {
    id: 111,
    text: "You try to fight all of the foxes at once. It is a hard fight but surprisingly you win. Unfortunatly you got bitten quite often while fighting and these animals are known to spread diseases. Nevertheless you look around yourself and think about your situation. You see a sword-looking metal piece lying around under the table. Outside it's still pretty dark and you're wounded.",
    options: [
    {
    text: "Search the cabin and stay",
    nextText: 1111
  },{
    text: "Grab the metal and leave",
    nextText: 1112
      }
    ]
  }, 
  {
    id: 1111,
    text: "After succesfully defeating the foxes, you block the window and start to search the cabin for anything helpful. You find a bag with a lot of medical supplies and you immediately start to treat yourself. You also found some drugs against infections and a lot of food so you also start to eat. As it's still dark outside and you're still pretty tired you eventually fall asleep while eating.",
    options: [
    {
    text: "Wake up",
    nextText: 11111
  },{
    text: "Don't wake up",
    nextText: -1
      }
    ]
  },
  {
    id: 11111,
    text: "Good Morning. \n It was quite a tough night, wasn't it? \n You finish the food you've slept on the rest of the night and turn your mind to outside. \n How are you going to find out who or where you are? The village you initially wanted to visit seems to be marked on a map on this cabins table. But from the map you can also tell that it's quite a long way still. You pack your bag full of useful items and plan your next step.",
    options: [
    {
    text: "Head towards village on map",
    nextText: 111111
  },{
    text: "Try to remember and guess your way",
    nextText: 1111112
      }
    ]
  }, 
  
 
  { id: 111111,
    text: "With your bag packed you head towards the marked village on the map. You walk and walk and after some time you stop for some rest. You eat some things you took out the cabin and rethink your choices. \n Could you have done it better? \n It doesn't matter now. \n You continue to walk and walk and theres even a little mountain you pass. While standing on top of the mountain you see two villages.\n One is further north, appearing to be the initial village you wanted to visit. \n But, your map tells you to go east from this mountain to a village hidden in the mountains clouds.",
    options: [
    {
    text: "Head towards mountain village",
    nextText: 1111111
  },{
    text: "Head towards initial village",
    nextText: 1111112
      }
    ]
  }, 
  // Head towards mountaivillage starts here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  { id: 1111111,
    text: "So that was really your choice.. ok. \n You head towards this mysterious village hidden in the mountains clouds. But it's a quite hard and long way. But somehow you feel this could be worth it. You walk and walk and slowly the terrain is getting harder and harder. You come to a poin of different choices. You could climb the way up which would be a lot faster. But the climb looks dangerous and you aren't sure if it's worth the risk. \n Walking also is an opiton, it's just a way longer one.",
    options: [
    {
    text: "Climb",
    setState: {brave: true},
    nextText: 11111115
  },{
    text: "Walk",
    nextText: 11111116
      }
    ]
  },
  
    { id: 11111115,
    text: "Ok, so you decided to climb up the way to the top. Brave decision. \n You climb higher and higher and then ...  You reach the Top. \n Here you see that the way you've climbed up apparently has been climbed by other people before too. Right at the end of the climbing route there is something graved into the rock saying: 'We saw your efforts - we acknowledge your efforts \n follow the route - it may lead you to truth' \n You see two possible ways of continuing your journey. \n One is steeper but faster, the other one looks safer but also longer.",
    options: [
    {
    text: "Short Way",
    nextText: 111111155
  },{
    text: "Long Way",
    nextText: 111111166
      }
    ]
  },
  
    { id: 11111116,
    text: "So you've decided to walk up the moutain. It'll take a while but you go on. \n As you walk you begin to look at your surroundings. Rock. Rock everywhere. \n Trees dissappear more and more with every bit of height you gain. You walk and walk and finally see two different ways you could choose to walk on. \n From here, one way seems short and ok to walk. The other one goes a around a corner so you can't really tell how the way looks. \n Where do you go? ",
    options: [
    {
    text: "The short one",
    nextText: 111111155
  },{
    text: "The other one",
    nextText: 111111166
      }
    ]
  },
  // Two paths short and long one to mountain village start here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
  // longer path towards mountain village starts here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    { id: 111111166,
    text: "After walking for a while, you are definetly sure that you have taken the longer route. It also seems to lead off your direction a little but for now you don't care. You walk and walk. \n A few hours into the way you see that the route you have chosen is blocked. Some huge loose rocks must've fallen off a mountains cliff.. so that now conquering these rocks seem like climbing a mountain. \n You could go back, but night could catch you somewhere in the mountains, and taht is dangerous.",
    options: [
    {
    text: "Try to climb the rocks",   
    nextText: 1111111666
  },{
    text: "Go back",
    nextText: 1111111667
      }, {
        text: "Climb the rocks",                                    
        requiredState: currentState => currentState.brave,     
        nextText: 1111111668                                         
      }
    ]
  },
  
    { id: 1111111668,
    text: "Since you are quite a brave climber, you easily manage this obstacle. And after climbing a while on these rocks, a possible transition to the once shorter route you haven't picked becomes visible. \n Choice is yours.",
    options: [
    {
    text: "Transition",   
    nextText: 111111155
      }, {
        text: "Go on",
        nextText: 11111116688,
      }
    ]
  },  { id: 11111116688,
    text: "Now that you've passed your obstacle you see that the way from here and on increasingly gets worse and worse. \n Soon you see it will become unmanagable. \n Since you anyway usually enjoy walking more than climbing you decide to climb back up the these roadblocking rocks. From here on you could go back or transition to the other way. \n What do you do?",
    options: [
    {
    text: "Transition",   
    nextText: 111111155
      }, {
        text: "Go back",
        nextText: 1111111667,
      }
    ]
  }, 
   { id: 1111111666,
    text: "You try to climb the rocks when suddenly some of the loose rocks start to rearrange. \n You weren't planned for this rearrangement. \n Good luck next time.",
    options: [
    {
    text: "Restart",   
    nextText: -1
      }
    ]
  },
  
   { id: 1111111667,
    text: "You go back all the way to where you could have walked the shorter path. \n You also lost some time doing that unfortunately. \n But since you've walked back the way you've seen it differently and you think there might be a thrid way. \n A shortcut that could lead you closer to your target, but you aren't sure. \n Additionally all of these rocks seem pretty loose.",
    options: [
    {
    text: "Take shortcut",   
    nextText: 1111111666
      }, {
        text: "Take initial short route",
        nextText: 111111155
      }
    ]
  }, 
  
  // long-path towards mountainvillage ends here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  
  // Short path to mountain village starts here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   { id: 111111155,
    text: "So you start walking and yea, you see it's more dangerous on this side. \n Nevertheless you keep on going and going. A little deeper into the way you hear some crumbling noises behind you. \n A huge cliff behind you just collapses in front of your eyes. But surprisingly.. you make it out unharmed. \n You walk and walk and finally come to an end. There is a sign right in front of you and behind it you see huge walls and a gate. \n The sign says: \n 'Only the brave - Only the wise' \n 'If you don't belong here - then you pay the price.' \n On the huge wall behind the sign you see some ways to enter.",
    options: [
    {
    text: "Go through the the gate",   
    nextText: 1111111555
      }, {
        text: "Climb the Wall",
        requiredState: currentState => currentState.brave,     
        nextText: 1111111556
      }, {
        text: "Search for more information",
        setState: {wire: true},
        nextText: 1111111557
      }
    ]
  }, 
     { id: 1111111555,
    text: "You carelessly walk through the gate, only to realize that there was a wired trap installed at it. \n You get smashed by a falling log.",
    options: [
    {
    text: "Restart",   
    nextText: -1
      }
    ]       
  },  { id: 1111111557,
    text: "As you search for more information at the gate, you realize that there was a wired trap installed at it. \n You deeinstall the trap and keep the wire. Also since you now already walked through the gate, you might as well continue walking.",
    options: [
    {
    text: "Walk on",   
    nextText: 11111115571
      }
    ]
  },  { id: 1111111556,
    text: "You climb the wall and jump over it. You look around and realize that there was a wired trap installed at the walls gate. \n Other than this mysterious construction nothing else seems to spark special attention. ..And since you now already walked past the gate, you might as well continue walking.",
    options: [
    {
    text: "Walk on",   
    nextText: 11111115571
      }
    ]
  },
  // Two paths short and long one to mountain village end here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // Walk past gate starts here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  { id: 11111115571,
    text: "You walk and walk. \n walk and walk. \n\n Everything here seems so beautiful. \n\n Everything here is so quiet. \n\n Maybe you'll find the truth somewhere. \n\n Maybe it's in your mind. \n ",
    options: [
    {
    text: "Walk on",   
    nextText: 111111155711
      }
    ]
  },
  
   { id: 111111155711,
    text: "You continue your way towards what you believe will be your answer. You walk and walk. \n After some time passes you encounter another wall and another gate. \n This one has a sign too, it says: \n 'If you make false be true' \n 'There definetly is no place here for you' \n Though, the gate seems to be open and you could just walk through. You could try to climb over this one alternatively too.",
    options: [
    {
    text: "Walk on",   
    nextText: 1111111557111
      }, {
        text: "Search for more information",
        nextText: 1111111557112
      }, {
        text: "Climb",
        nextText: 1111111557113       
      }
    ]
  },
  
   { id: 1111111557112,
    text: "You couldn't find anything.",
    options: [
    {
    text: "Walk through gate",   
    nextText: 1111111557111
      } , {
        text: "Climb",
        nextText: 1111111557113       
      }
    ]
  },
   { id: 1111111557113,
    text: "You found a good spot and started to climb. You almost climbed the wall when suddenly you grabbed something sharp. \n You cut your hand and fell to the ground. You aren't really injured but you wouldn't recommend trying this again.",
    options: [
    {
    text: "Walk through gate",   
    nextText: 1111111557111
      }, {
        text: "Climb again",
        nextText: 11111115571133
      }
    ]
  }, 
   { id: 11111115571133,
    text: "You are really doing it again, alright. You find a good spot and start. \n You almost climb the wall when suddenly you grab something sharp. \n You think you can do it better this time but in reality you cut yourself way worse this time. \n It turns out cutting yourself on random objects you can't identify isn't that good for you. \n Think about it next time.",
    options: [
     {
        text: "Restart",
        nextText: -1
      }
    ]
  },
  
  
  // Walk past 1 gate ends here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    
  // Walk past second gate starts here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
  { id: 1111111557111,
    text: "'You have now entered the second Gate' \n That's the first thing you see upon walking though the gate. \n The place here looks different, way different than everything you've seen before. \n But it also looks beautiful. \n You start to get distracted as the birds start to sing. \n You see trees on this mountain again, that weren't here before, you think. \n Even the rock has a different color, so magical it seems. \n What incredible place this is.. \n\n Maybe a place in your dreams.",
    options: [
    {
    text: "Continue",   
    nextText: 11111115571111
      } 
    ]
  }, { id: 11111115571111,
    text: "You continue your way. \n Everything seems easier from now on. \n Nevertheless, even here it gets dark sometime. ..And it looks like the time is about to start soon again. \n You think you'll propably have some more time left and you keep on moving. \n But after a while you realize that's it's getting dark quicker than you expected it to get so you decide to look for a place to sleep this night. \n\n In your close environment you see a cozy looking cave you could spend the night in. \n You could also continue searching but the darker it gets the less you see and getting lost in the mountains can be very dangerous.",
    options: [
    {
    text: "Sleep",   
    nextText: 1886441
      }, {
        text:"Search",
        nextText: 1886442 
      } 
    ]
  },
   { id: 1886442,
    text: "Ok so you continue to search for a place to spend the night. \n Some more searching passes, but you still haven't found a place you are happy with. \n Eventually it became so dark that you can barely see anything again. \n Well.. I guess the things you have, sometimes, are better. \n\n So you walk in the dark on this high mountains land. \n As you notice your lost, neither map nor a plan. \n It doesn't take you long to slip - have more fun on your next trip.",
    options: [
    {
    text: "Restart",
    nextText: -1
    }]
  }, 
  { id: 1886441,
    text: "You get into the cave and make yourself comfortable. \n While it gets darker you increasingly get tired. \n Until, you fall asleep.",
    options: [
    {
    text: "Wake up",
    nextText: 18864411
    }, {
    text: "Don't Wake up",
    nextText: -1
    }]
  }, 
  { id: 18864411,
    text: "Good Morning. \n\n You slowly wake up and gather your stuff. \n As you approach the exit of this cave, you think about this place. \n Weird isn't it? You don't really know. Never mind. \n You walk out and continue on your path. \n\n It doesn't take long until a third gate appears. \n It says: \n\n 'The language of all languages will guide you the way' \n 'The student who comes prepared will live to see another day' \n '13-1-20-8' \n\n That's strange.. \n However you still need to overcome this obstacle somehow, but this time it's different. \n\n This gate has three different alleys seperated from each other and all of them are numbered. \n\n Which one do you pick?",
    options: [
    {
    text: "Alley '40'",
    nextText: 188644112
    }, {
    text: "Alley '42'",
    nextText: 188644111
    }, {
    text: "Alley '45'",
    nextText: 188644112
    }]
  }, 
  { id: 188644112,
    text: "You enter Alley 40 but it doesn't take you very long. \n\n As the floor beneath you turns out to be a trap and it suggests you, you were wrong. \n\n It's quite a long way down, so have fun on your trip. \n\n Maybe next time you'll get the message and maybe next time you think.",
    options: [
    {
    text: "Restart",
    nextText: -1
    }]
  },
   { id: 188644113,
    text: "You enter Alley 45 but it doesn't take you very long. \n\n As the floor beneath you turns out to be a trap and it suggests you, you were wrong. \n\n It's quite a long way down, so have fun on your trip. \n\n Maybe next time you'll get the message and maybe next time you think.",
    options: [
    {
    text: "Restart",
    nextText: -1
    }]
  },
  // ALLEY 42 STARTS HERE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
   { id: 188644111,
    text: "You enter Alley 42. How easy you think. \n But this path leads you to a building-like construction, and more riddles as you probably think. \n As you get closer to this constructuion, you see 4 equal looking doors you could enter. \n On the wall it says: \n\n 'Choose the first, but not from left, nor from right.' \n 'Now choose the second and much further you'll thrive.' \n\n All Doors are in nummerical order. All Doors only open from the outside.",
    options: [
    {
    text: "Door 1",
    nextText: 1886441112
    },  {
    text: "Door 2",
    nextText: 1886441112
    },  {
    text: "Door 3",
    nextText: 1886441111
    },  {
    text: "Door 4",
    nextText: 1886441112
    }]
  },
   { id: 1886441112,
    text: "Are you really sure?",
    options: [
    {
    text: "Yes",
    nextText: 18864411122
    }, {
      text: "No",
      nextText: 188644111
    }]
  },
   { id: 18864411122,
    text: "This time you were wrong, but for next time I'll tell you a trick. \n\n Remove left and right and the second one is what you should pick. \n ",
    options: [
    {
    text: "Restart",
    nextText: -1
    }]
  },
  // PAST DOOR 3 / ALLEY 42 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  { id: 1886441111,
    text: "You walk past the door, another one passed, great you think. \n But it doesn't take very long again, for the riddles to begin. \n You cross this empty room and at the end of it you face a tunnel. \n But the tunnel splits in 4 corridors, again providing you with some signs and some riddles. \n Additionally, you realize that these corridors probably only go one-way. \n Each path has a number on it and in font of them all a writing that says: \n\n 'You already came far' \n 'The mind be thy protector' \n 'The numbers guide you the way..' \n '..and you only select them.'",
    options: [
    {
    text: "Corridor '22'",
    nextText: 18864411114
    },  {
    text: "Corridor '45'",
    nextText: 18864411111
    },  {
    text: "Corridor '68'",
    nextText: 18864411114
    },  {
    text: "Corridor '91'",
    nextText: 18864411114
    }]
  },
  { id: 18864411114,
    text: "Are you really sure you want to continue along this corridor? \n ",
    options: [
    {
    text: "Yes",
    nextText: 188644111144
    }, {
      text: "No",
      nextText: 1886441111
    }]
  },
  { id: 188644111144,
    text: "'The magic of numbers- a magic so fine' \n\n 'That only who passes - comes out here alive.' \n\n\n How did you get here?",
    options: [
    {
    text: "Restart",
    nextText: -1
    }]
  },
       { id: 18864411111,
    text: "Are you really sure you want to continue along this corridor? \n ",
    options: [
    {
    text: "Yes",
    nextText: 188644111115
    }, {
      text: "No",
      nextText: 1886441111
    }]
  },
  { id: 188644111115,
    text: "You enter the corridor. \n\n It seems as if this path leads to the exit of this building. Finally you could continue your route. \n Why does this place even exist? \n For now you just continue your way.. \n As you approach what appears to be the exit, you're again faced with different doors and a decision. \n On the wall above it says: \n\n 'Enjoy the fruit of your labour' \n\n 'Listen to the numbers as they guide' \n\n 'The fruit will help you with your answer' \n\n 'But only who truly understands, will see through disguise.'",
    options: [
    {
    text: "Door '15'",
    nextText: 1886441111154
    }, {
    text: "Door '18'",
    nextText: 1886441111155
    }, {
    text: "Door '21'",
    nextText: 1886441111154
    }, {
    text: "Door '24'",
    nextText: 1886441111154
    }]
  },
  { id: 1886441111154,
    text: "Since it really is the last door before continuing your journey, I will ask again. \n\n Are you really sure? \n\n",
    options: [
    {
    text: "Yes",
    nextText: 18864411111544
    }, {
      text: "No",
      nextText: 188644111115
    }]
  }, 
   { id: 18864411111544,
    text: "You've chosen wrong this time, but for next time I'll help you my friend. \n\n The numbers you did chose this time, weren't guides, instead they just pretend. \n",
    options: [
    {
    text: "Restart",
    nextText: -1
    }]
  }, 
   { id: 1886441111155,
    text: "Since it really is the last door before continuing your journey, I will ask again. \n\n Are you really sure? \n\n",
    options: [
    {
    text: "Yes",
    nextText: 18864411111555
    }, {
      text: "No",
      nextText: 188644111115
    }]
  }, 
   { id: 18864411111555,
    text: "Amazing work my friend. What a sharp mind you have. \n\n As you exit this building, you walk back on the initial trail again. \n From here, you see that there isn't any way around this building. \n That being said, it's good that you have made it through finally. \n So as you continue walking further down this trail towards mystery, you encounter some other intresting mysteries###################### ########################### ############################ ##########################",
    options: [
    {
    text: "Rest###########################",
    nextText: -1
    }]
  }, 
  // HEad towards mountaivillage ends here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // HEAD TOWARDS MOUNTAINVILLAGE STARTS HERE / AFTER GATE 3 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
  
  // HEAD TOWARDS INITIAL VILLAGE STARTS HERE  !!!!!!!!!!!+MERCHANT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
  { id: 1111112,
    text: "You try to remember the way you initially walked when suddenly you come across a strange merchant.\n You ask some questions but the merchant appears to have no answer for any of them. \n Though, he likes the piece of cloth you wear, appearently it's valuable. \n He offers you different items, what dou you do? ",
    options: [
    {
    text: "Trade the cloth for a sword",
    requiredState: currentState => currentState.cloth,
    setState: {cloth: false, sword: true},
    nextText: 1111121
  },{
    text: "Trade the cloth for some weird gems",
    requiredState: currentState => currentState.cloth,
    setState: {cloth: false, weirdGems: true},
    nextText: 1111121
      }, {
        text: "Ignore the merchant",
        nextText: 1111122
      }
    ]
  },  {
    id: 1111121,
    text: "After trading with the merchant he tells you that you are headed in a dangerous way. He could be lying, but why would he? \n He tells you that people headed through the forrest you are heading towards usually never make it out. \n He offers you help by navigating you to his home town if you want. As always it would be a long way again.",
    options: [
    {
    text: "Ignore his Warning",
    nextText: 1111122
  },{
    text: "Follow his navigation",
    nextText: 11111212
      }
    ]
  }, 
   {
    id: 11111212,
    text: "After listening to the merchants navigation you seem to know where to go. He could be lying, but why would he? \n For now let's just walk the way and as always it would be a long way again. \n You walk and walk and walk. \n Suddenly you get attacked by two random persons. They both have metal objects in their hands and they both appear to be willing to fight.",
    options: [
    {
    text: "Fight the robbers",
    requiredState: currentState => currentState.sword, 
    setState: {brave: true},  
    nextText: 111112121                                       
  },{
    text: "Trade with the robbers",
    requiredState: currentState => currentState.weirdGems,
    setState: {weirdGems: false},
    nextText: 111112122                                       
      },{
        text: "Flee the robbers",
        nextText: 111112123
      }
    ]
  }, 
  { id: 111112123,
    text: "You try to flee the robbers and you start running. \n You run and run and for a while it all seems good. \n But then you see yourself getting surrounded by all these robbers and you realize it all was a trap. \n Think twice before trusting someone you don't know next time.",
    options: [
    {
    text: "Restart",
    nextText: -1
    }]
  }, 
   { id: 111112122,
    text: "These people came to steal not to trade. \n Your bad.",
    options: [
    {
    text: "Restart",
    nextText: -1
    }]
  },
    { id: 111112121,
    text: "You are alone and they aren't. \n But ok you want it, so let's do it. \n You fight and fight and ... actually defeat all of them.",
    options: [
    {
    text: "Search the bodies",
    setState: {map: true},                                                    // requiredState: currentState => currentState.map, to mountain village from here !!!!
    nextText: 1111121211
    }, {
      text: "Go back to the merchant",
      nextText: 1111121212
    }]
  },  { id: 1111121211,
    text: "You find a map which taks you directly to a special mountain village. \n Obviously you pick that up.",
    options: [
    {
    text: "Head towards village on the map",
    requiredState: currentState => currentState.map,   
    nextText: 1111111
    }, {
      text: "Go back to the merchant",
      nextText: 1111121212
    }]
  }, 
  { id: 1111121212,
    text: "He isn't here anymore.",
    options: [
    {
    text: "Head towards village on the map",
    requiredState: currentState => currentState.map, 
    nextText: 1111111
    }, {
      text: "Walk initial way",
      nextText: 1111122                                                          
    }]
  },
  
  //Ignoring NORTH_WAY - merchant warning starts hereeee !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  { id: 1111122,
    text: "So you ignore the merchants warning and continue to walk in the forrest behind him. It seems to be the way you wanted to go but you aren't that sure. The forrest really seem a little strange. You get deeper and deeper into the thick green bushes and trees. As it's getting increasingly hard to keep your direction it also seems like it would start to rain soon. \n You walk and walk and walk. \n Suddenly at one point there is a dangerous river you have to cross. \n At one part of this river, you see the remainings of what once was a bridge. You could use them to climb over the river but you aren't too sure. \n On another part the river gets pretty narrow, so that maybe you could jump over it. But that would be quite a risky jump.",
    options: [
    {
    text: "Jump at narrow spot",
    nextText: 11111221
  },{
    text: "Climb over broken bridge",
    nextText: 11111222
      }
    ]
  }, 
  // after bridge jump starts here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  {
    id: 11111221,
    text: "You find a good jumping spot. You plan, you concentrate. \n\n You start running ... you jump ..\n .. aaand \n\n surprisingly you make it. \n\n Welcome to the other side of the River. \n The forrest doesn't seem to hard to cross from here on so you continue walking, but at one point your way splits. \n You see some marked trees and a path you could take, but it leads away from your direction. \n Though this weird way looks as if it's been used before.",
    options: [
    {
    text: "Continue straight line",
    nextText: 0551
  },{
    text: "Follow marked trees",
    nextText: 0552
      }
    ]
  }, 
  //Continue straight line starts here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   { id: 0551,
    text: "So you start moving towards what you believe would be a straight line to the village. \n As you walk towards your goal, you see the forrest getting thinner and thinner. \n You walk and walk. The more you walk the closer the image of a village appears for you at the horizon. \n You actually found a little village. In fact it's only a few houses and stables. \n Now the closer you get the more it appears to you that this villages houses are empty. \n The doors are open and the stables empty.",
    options: [
    {
    text: "Make noise",
    nextText: 05511
  }, {
    text: "Go inside house",
    nextText: 05512
  } ]
  }, 
  { id: 05511,
    text: "You start making noises. In fact, pretty loud ones. \n\n But nobody seems to care.",
    options: [
    {
    text: "Make more noise",
    nextText: 055111
  }, {
    text: "Go inside house",
    nextText: 05512
  } ]
  }, 
  { id: 055111,
    text: "As i said...\n\n nobody cares.",
    options: [
   {
    text: "Go inside house",
    nextText: 05512
  } ]
  }, 
  { id: 05512,
    text: "You pick one you like and you enter it. Whatever, I call it good choice. Wasn't that big of a choice anyway. \n Now since you already found such a nice place why not spend the night in it. \n It still is early but you could use some rest and loot the property here. \n What do you think?",
    options: [
   {
    text: "Loot and Relax here",
    nextText: 055122
  } , {
    text: "Keep on walking",
    nextText: 055123
  }]
  }, 
  { id: 055123,
    text: "Alright so you seem like no friend to pausing. Well at least let's start walking then. \n But now that you look outside you see it's getting a little dark already. So what do you do now?",
    options: [
   {
    text: "Go back inside house",
    nextText: 05512
  }, {
    text: "Keep walking",
    nextText: 0551233
  } ]
  },
  { id: 0551233,
    text: "So you leave these houses behind and start your journey again. \n You still have a path in your mind you want to follow, so why not do that. \n But as you walk further away from the houses, the darkness around you increases. You still would have the option to go back.",
    options: [
   {
    text: "Go back to house",
    nextText: 05512
  }, {
    text: "Leave houses",
    nextText: 05512333
  } ]
  },
   { id: 05512333,
    text: "Usually you make good choices. \n\n This time apparently it wasn't the case.",
    options: [
   {
    text: "Restart",
    nextText: -1
  } ]
  }, 
 //LOOT AND RELAX IN HOUSE STARTS HERE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  { id: 055122,
    text: "So you've really decided to loot and relax around this area for the night. \n\n I do really like your descision. However time passes and you eat something and go to sleep. \n As the sun slowly starts to rise you wake up. It was a good night sleep. \n But as this morning mood passes your usual questions start to arise again. \n In fact how is it possible that you still haven't met anyone you could really ask anything. \n Besides why are these places you encounter all empty, where are the people. \n So many questions, but not any answers... \n\n However you are still adventerous and willing to find out. So it shall happen. \n You grab some useful things and walk out. \n Far away you see some smoke, or at least something appears to look like smoke.\n Alternatively you could look out for any clues of human signs and walk that way. \n\n What is it going to be?",
    options: [
   {
    text: "Follow the smoke",
    nextText: 0551222
  }, {
    text: "Look for clues",
    nextText: 0551220
  }]
  }, 
 //Question are you sure  SMOKE || ROCK !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    { id: 505512225,
    text: "Are you sure you want to change plans?",
    options: [
   {
    text: "Yes",
    nextText: 0551222
  }, {
    text: "No",
    nextText: 05512200                                                   //Go to rock formation path
  }]
  },
//FOLLOW THE SMOKE STARTS HERE  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  { id: 0551222,
    text: "You know they say that, where there is smoke - there will also be fire. \n In your case you are more than happy to find out the origin of this smoke. \n Luckily there aren't so many trees around where you are so the smoke is easily visible. \n You go on and on and as you get closer and closer you start to smell it. \n It's an aggressive smell but you continue on your route",
    options: [
   {
    text: "Foll############################### ########################",
    nextText: -1
  }, {
    text: "Look######################### ##############################",
    nextText: -1
  }]
  },
 //LOOK FOR CLUES/ROCK FORMATION STARTS HERE  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  { id: 0551220,
    text: "So you decide to look for other signs of possible humanity. \n Somehow you think you eventually will find something, but you also don't exactly know what to look out for. So you just keep on going. \n Anything would help, broken branches, lost or forgotten items, at this point really anything. \n And as you walk and walk you start to reckognize some weird rock formations far in the distance. \n At this point you could still return to the smoke as it's propably still visible from your old position. \n What is it going to be?",
    options: [
   {
    text: "Go back to smoke",
    nextText: 505512225
  }, {
    text: "Go to Rock formation",
    nextText: 05512200
  }]
  },
  //ROCK FORMATION STARTS HERE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   { id: 05512200,
    text: "So you start walking towards this weird rock constellation. \n You don't know why or how it could help you, but somehow you think it'll help. Why not. \n It's quite a way so you walk and walk. As you get closer t#################################",
    options: [
   {
    text: "Ye###",
    nextText: 0551222
  }, {
    text: "N#####",
    nextText: -1                         
  }]
  },
  //Continue straight line ends here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
  //Walk special way starts here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  { id: 0552,
    text: "You follow the marked trees as you start walking on the weird man-made looking path. \n But as you walk further you notice that the path you took ends at a huge rock wall. \n Luckily there's a ladder attached to it, even though it looks old and pretty ruined. \n Nevertheless, you think this must be the best view you could get around here.",
    options: [
    {
    text: "Go back",
    nextText: 05521
  }, {
    text: "Climb ladder",
    nextText: 05522
  } ]
  },
  { id: 05521,
    text: "You trust your guts and maybe this was the better decision. \n Why would you want the view now anyway. \n You walked back to where this special way started.",
    options: [
    {
    text: "Walk initial straight line",
    nextText: 0551
  }]
  }, 
  { id: 05522,
    text: "You start climbing up the ladder and you get really high. \n Unfortunatly at one point the ladder ends, but the top of this wall is still far. \n You try to climb down but the old ladder doesn't appear to like that. \n So ... sadly, the ladder breaks and you fall to the ground. \n Didn't you see how ruined the ladder was?",
    options: [
    {
    text: "Restart",
    nextText: -1
  }]
  }, 
  //Walk special way ends here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // after bridge jump ends here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 
  {id: 11111222,
    text: "You try to find a way to use the remainings of the bridge to cross it. You plan. \n Once you are quite sure about what to do you start climbing. It actually seems ok to cross even though it makes constant noises. You carefully walk step by step, when suddenly the tiles underneath your feett break and you fall into the river. \n There you goooo.  ",
    options: [
    {
    text: "Restart",
    nextText: -1
  } ]
  }, 
  // Ignoring north way merchant ends here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
  //grad the metal sword and leave !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  {
    id: 1112,
    text: "You grab the metal thing you found under the table and leave the cabin. It wasn't the smartest choice as it's still dark and you still are quite tired, but you walk on. \n You walk and walk but slowly everything you see becomes so vivid. You are still wounded so you lay on the ground next to a tree, as your eyes slowly close themselves.",
    options: [
    {
    text: "Wake up fast",
    nextText: 11121
  },{
    text: "Wake up after long sleep",
    nextText: 11122
      }
    ]
  }, 
  
  {
    id: 11122,
    text: "You wake up as the sun goes down again. You are wounded and you feel very bad. \n As you try to find a direction to walk you get weaker and weaker. \n Eventually you come to a stop and fall down. \n You've just lost way too much blood over your long day sleep. \n May you choose wiser next time.",
    options: [
    {
    text: "Restart",
    nextText: -1
    }]
  },  
  
  { id: 11121,
    text: "You wake up as the sun rises. \n You still are wounded but somehow you feel better. But you have to continue your way before you could get in worse condition. You've slept in the middle of a forrest but you see a little river deeper in the bushes. As you get closer to that river you see some ways of crossing it. Crossing it also feels like the right thing to do, even though it seems like a dangerous river you should be careful of.",
    options: [
    {
    text: "Jump at narrow spot",
    nextText: 11111221
  },{
    text: "Try to climb over broken bridge",
    nextText: 11111222
      }
    ]
  },
  
  //Ignoring the cabin !!! NORTH_WAY !!! starts here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  {
    id: 7,
    text: "You ignore the cabin and continue on walking through the fog. \n You walk and walk, but slowly you get more and more tired. You realize that you will fall asleep soon but you don't know where. \n There is a mysteriously hidden cave you see not far from you. \n Alternatively there are plenty of big trees sourrounding you.",
    options: [
    {
    text: "Sleep inside the cave",
    nextText: 13
  },{
    text: "Sleep on top of a tree.",
    nextText: 15
      }    
    ]
  },  
  
  // Sleep inside the cave starts here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    {
    id: 13,
    text: "You have chosen to enter the mysterious cave. You are really tired and ready to sleep, additionally its very dark and very quite, so it could be ok for the night. You've once heard rumors about dangerous animals living in these caves, but it doesn't appear to be true with this one.",
    options: [
    {
    text: "Explore the rest of the cave",
    setState: {goldcoins: true},                                              // requiredState: currentState => currentState.goldcoins, possible from here !
    nextText: 131
  },{
    text: "Sleep",
    nextText: 132
      }    
    ]
  }, 
  {
    id: 131,
    text: "You walk towards the darker and much more tinier part of the cave. \n When suddely you step on a small bag. It seems to contain a few gold coins, so you take them with you. The rest of the cave is empty and it'll probably do it for the night. Still theres also the possibility to sleep in the trees.",
    options: [
    {
    text: "Sleep in cave",
    nextText: 132
  },{
    text: "Sleep with the trees",
    nextText: 15
      }    
    ]
  }, 
  {
    id: 132,
    text: "You really have chosen to sleep in this mysterious cave. You really are weird, aren't you? \n The good thing is you're awake now and ready for the day. Since the fog apparently completly dissapeared this morning, you are also ready to go towards the village you've seen.",
    options: [
    {
    text: "Try to find the initial way to the village",
    nextText: 1321
  } ]
  },  {
    id: 1321,
    text: "As you try to find the village you walk and walk. Some weird feeling about the cave you've slept it just doesn't let you go but you ignore it for now. So you walk, and walk, and walk. But as time passes you start to reckognize that just walking won't fix the issue. \n So you need a new plan. You've seen some hills and mountains, as well as a river that flows through the forrest you are in. What now?",
    options: [
    {
    text: "Hills and Mountains",
    nextText: 151
  }, {
    text: "River through Forrest",
    nextText: 152
  }  ]
  },
  
 //sleep inside the cave ends here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // Hills & Mountains start here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   {id: 151,
    text: "You've choosen to visit the surrounding hills and mountains. Alright then. \n As you search for higher and higher ground, you think about what the answers are you need. \n What is it that keeps you going? \n It's no easy question to answer... enough for now. \n You walk and walk and at one point you reach a nice overview over your situation. \n It appears that you are surrounded by forrest, unless you either go in the direction of the mountains, or follow the river through the forrest you already saw.",
    options: [
    {
    text: "Go to mountains",                                 
    nextText: 1511
  }, {
    text: "Go follow river",
    nextText: 152
  }  ]
  }, 
  {id: 1511,
    text: "Ok, but this will be a though way. \n At first you'll have too choose which exact path you want to go. \n The path with the easiest visibility involves climbing over loose rocks. \n Your alternative route would have you to walk, or rather climb on the side of this very steep mountain. \n Both ways seem to go in your direction, so it's your choice.",
    options: [
    {
    text: "Loose rocks",
    nextText: 15111                
  }, {
    text:"Steep side",
    nextText: 15112                            
  } ]
  },
  {id: 15111,
    text: "Be careful when playing with fire, you could always burn yourself. \n Go try again.",
    options: [
    {
    text: "Restart",
    nextText: -1
  } ]
  },
  {id: 15112,
    text: "While casually enjoying the good choices you make, you start to see some kind of construction deeper in the mountains. \n These constructions appear to represent a village you think, but it would be hidden deep in the mountains. \n Getting there would propably also be very hard. \n What now?",
    options: [
    {
    text: "Restart",                      // random restart button mid-game
    nextText: -1
  }, {
    text:"Go to mountain village",
    nextText: 1111111
  }  ]
  },
  {id: 15111,
    text: "Well.. alright. \n You start climbing in this loose territory, when suddenly some of the rocks you climb on start to tumble. \n They tumble and tumble and there they go. \n\n Sadly you tumble as well, but for next time you know.",
    options: [
    {
    text: "Restart",
    nextText: -1
  } ]
  },
  // Follow River trough forrest starts here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   {id: 152,
    text: "So you've choosen to follow the river through the forrest. Alright let's do that. \n You start walking again.. and you walk and walk. \n After hours of walking you get a little tired. \n But meanwhile the sun also doesn't seem to be shining a lot longer so you continue walking. \n And you walk and walk and walk. \n\n Maybe minutes before it gets way too dark to do anything, you find a little shack next to the river. \n It appears to be empty and it even has its own boat.",
    options: [
    {
    text: "Enter shack",
    nextText: 1522                  
  }, {
    text: "Use boat",
    nextText: 1523
  }, {
    text: "Ignore shack",
    nextText: 1524
  } ]
  },  
   {id: 1523,
    text: "Well... i did say it's getting very dark. \n On top of that comes that the river you are on now isn't very quiet. In fact it is quite dangerous. \n You get pulled out of the boat and immediately smash your head against the solid riverbed-rock. \n You may consider some rest next time.",
    options: [
    {
    text: "Restart",
    nextText: -1
  } ]
  },
  {id: 1524,
    text: "Well... i did say it's getting very dark. \n But ok you get what you want. \n You continue walking along the river but you just get more and more tired. \n On top of that comes that you don't even see where you are going. \n Unfortunately for you, the only thing missing wasn't going to let you wait for too long, so about four or five wolves find you and take good care of you. \n You might aswell consider some rest next time.",
    options: [
    {
    text: "Restart",
    nextText: -1
  } ]
  },
  // Entered the shaaaaaack !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  {id: 1522,
    text: "Alright. It's getting very dark and it does so very quick around here. \n The shack luckily was open so you don't have to break in. Even though it is empty, it doesn't look too abandoned. \n At least not for centuries you think. \n You find a way to lock the door from inside and apply it that first. \n You also find some food while looting the shack so you enjoy a good night meal. \n It's night outside but you think it's not as dark you've expected it to be. \n What now?",
    options: [
    {
    text: "Take boat out on the river",
    nextText: 1523
  }, {
    text: "Go sleep",
    nextText: 15222
  }  ]
  },
  // Wake up in shack starts here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   {id: 15222,
    text: "Good Morning. \n You look around and notice that it all looks way nicer in daylight. \n Unfortunately it looks like it is going to rain soon outside but for now you don't care. \n You stand up and take another quick look through the shack. \n After finding nothing new you head outside, but where exactly?",
    options: [
    {
    text: "Continue along river on foot",
    nextText: 152221
  }, {
    text: "Continue on river with boat",
    nextText: 152222
  }, {
    text: "Search for alternative route",
    nextText: 152223
  }   ]
  },
  {id: 152223,
    text: "What other options do you have? \n\n You ain't going back from here.",
    options: [
     {
    text: "Continue along river on foot",
    nextText: 152221
  }, {
    text: "Continue on river with boat",
    nextText: 152222
  }]
  },
  //BOTH Hills & Mountains AND Follow River trough Forrest end here !!!!!!!!!!!!!!!!!!!!!!mountains path already ended earlier!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
  // ALONG RIVER ON FOOT starts here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!soon rain!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   {id: 152221,
    text: "So you choose to walk when you could comfortably drive along the river. \n Well it's your choice. \n So then you start to walk and you walk and you walk. \n After walking for some time you start to feel dizzy. The place around you looks beautiful, but something about the colors or the smell or whatever just doesn't suit you well. \n You sit down for a while and try to focus.",
    options: [
     {
    text: "Continue walking",
    nextText: 1522211
  }, {
    text: "Sit for a while",
    nextText: 1522212
  }]
  },
   {id: 1522212,
    text: "You choose to sit for a while. How comfy. \n You look around as the dizzy feeling you have, increases dramatically. \n\n You look out for a butterfly - and then suddenly he goes \n\n But now you seem pretty intoxicated - and your eyes they suddenly close.",
    options: [
    {
    text: "Restart",
    nextText: -1
  }]
  },
   {id: 1522211,
    text: "Not too easy, but better something than nothing. I guess. \n You stand up and even though you wobble a lot while standing up you continue walking. \n The smell you noticed comes and goes with the wind. \n You walk on.",
    options: [
     {
    text: "Continue walking",
    nextText: 15222111
  }]
  },
    {id: 15222111,
    text: "You walk along the river when suddenly you hear a loud roar. \n You don't know what it is, nor where it comes from, but it's not very far away. \n That's not good you suppose.",
    options: [
     {
    text: "Go on",
    nextText: 152221111
  }, {
    text: "Go hide",
    nextText: 221522211122
  }]
  },
  // HIDE FROM ROAR BS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11
   {id: 221522211122,
    text: "You choose to hide yourself for a while. I really don't know about that. \n You look around but nothing seemes to move. \n It's so quiet now you almost think you hallucinated.",
    options: [
    {
    text: "Don't hide anymore",
    nextText: 2215222111226
  }, {
    text: "Hide longer",
    nextText: 22152221112266
  }]
  },
   {id: 2215222111226,
    text: "You carelessly step out of your hiding spot and continue walking. \n\n But, it turns out you weren't hallucinating. \n\n This area has bears and you just met one who appears to be more hungry than friendly. \n\n What do you think he's going to do?",
    options: [
    {
    text: "Restart",
    nextText: -1
  }]
  },
  {id: 22152221112266,
    text: "You're pretty sure you weren't hallucinating so you stay in your hiding spot for a while. \n But slowly something starts to approach your hideout. \n Since your tactic is to wait longer, guess what, you wait a little longer. \n\n But that waiting isn't going to change anything anymore. \n\n This meals target was already found, sadly it appears that with target I meant you.",
    options: [
    {
    text: "Restart",
    nextText: -1
  }]
  },
  // BS HIDE FROM ROAR ENDS HERE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // WALK ALONG RIVER / AFTER SHACK CONTINUES !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  {id: 152221111,
    text: "So you've decided to ignore the roar and keep on with your route. Ok then let's do that. \n After a roar this loud, you naturally increase your walking speed. \n It doesn't take very long for you to realize that by thinking the roars origin wasn't far away, you were right. \n All of a sudden you face a big and hungry looking bear. As he looks at you, he appears to have found his meal. \n \n What now?",
    options: [
     {
    text: "Run away",
    nextText: 1522211114
  }, {
    text: "Climb on tree",
    nextText: 15222111144
  }]
  },
  {id: 15222111144,
    text: "If only he'd let you do that...",
    options: [
     {
    text: "Restart",
    nextText: -1
  }]
  },
  {id: 1522211114,
    text: "You start running, but so does the bear. \n Luckily, there are a lot of trees here so the bear has a harder time to get through. \n He's still very fast. \n\n You will definetly need more speed.",
    options: [
     {
    text: "Run faster",
    nextText: 15222111141
  }]
  },
  {id: 15222111141,
    text: "Ruuuuuuuuuuuun!",
    options: [
     {
    text: "Sprint",
    nextText: 152221111411
  }]
  },
  {id: 152221111411,
    text: "It turns out that... bears are faster than human. \n\n See you next time.",
    options: [
     {
    text: "Restart",
    nextText: -1
  }]
  },
  // ON RIVER WITH BOAT starts here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!soon rain!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   {id: 152222,
    text: "So you choose to drive this boat when you could comfortably walk along the river. \n Well it's your choice. \n\n So then let's go. You throw yourself in the boat and that boat in the river and the journey begins. \n\n Immediately you realize that taking care of this boats direction isn't as easy as you thought... but you manage it. \n\n You go further and further and ther further you go the calmer the river gets. \n It's unbelieveably relaxing to be doing this right now. You close your eyes and let go for a while... \n As you go on with the stream of the water, you start to reckognize some kind of constructions in the distance. \n Nevertheless everything arround you seems so incredibly beautiful, it's hard to focus.",
    options: [
     {
    text: "Exit boat to explore surroundings",
    nextText: 1522224
  }, {
    text: "Keep going towards constructions",
    nextText: 1522225
  }]
  },
  {id: 1522224,
    text: "Well it's your choice. As you try to get out of the boat you notice that your legs wobble a lot. \n Something about this place seems magical. \n The colors, the smells, you don't exactly know. \n Everything arround you seems so incredibly beautiful, it's hard to focus. \n Is that dangerous? \n You feel dizzy. \n Wow, such a beautiful place.",
    options: [
     {
    text: "Exit to explore surroundings",
    nextText: 15222244
  }, {
    text: "Keep going towards constructions",
    nextText: 1522225
  }]
  },
  {id: 15222244,
    text: "Wow, such a beautiful place you think. \n\n Wow, so hard to focus you think. \n\n Wow, fast as a rock you sink. \n\n And wow, maybe next time you think.",
    options: [
     {
    text: "Restart",
    nextText: -1
  }]
  },
  {id: 1522225,
    text: "Ok so you've decided to rather stay in the boat. I like that descision. \n But this place really feels powerful somehow. \n As you go with the stream of the water, more and more of the constructions you saw become visible. \n You see them containing symbols and a lot of other stuff you can't explain.",
    options: [
     {
    text: "Exit boat to explore surroundings",
    nextText: 1522224
  }, {
    text: "Keep going towards constructions",
    nextText: 15222255
  }]
  },
  //KEEP GOING BOAT TOWARDS CONSTRUCTION !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  {id: 15222255,
    text: "You approach contructions. \n\n Way bigger than you expected, but without any hint about what they are or why they are. \n\n Do you really want to go on?",
    options: [
     {
    text: "Yes",
    nextText: 152222555
  }, {
    text: "Maybe next time",
    nextText: -1
  }]
  },
  {id: 152222555,
    text: "Ok so let's go on. \n You've had quite a way so far. \n The river from here on goes around the cornerso you can't see where it's going. \n But you see a little dock, where you could get out of the boat. \n Something about this place feels right, you just can't explain it yet.",
    options: [
     {
    text: "Go to dock########",
    nextText: -1
  }, {
    text: "Stay in boat",
    nextText: 1515152222555
  }]
  },
   {id: 1515152222555,
    text: "Getting lazy since you found the boat huh? \n\n Let's see if you are going to regret that. \n\n As the boat goes around the corner, you notice that the river turns into a ruthless beast. \n\n So to sum it up, things change really quick when you don't react.",
    options: [
     {
    text: "Restart",
    nextText: -1
  }]
  },
  // sleep on top of tree starts here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  {
    id: 15,
    text: "You have climbed up a tree you liked and after some reassuring that you won't fall off while sleeping you get ready to sleep. As it gets darker and darker you here more and more animals on ground floor. \n Good thing that you haven't slept in the cave, who knows what could have happened. After some hours of sleep you wake up unharmed in your selfmade tree-bed. The fog isn't there anymore and you start to walk again. \n You walk and walk and walk. \n But because the trees make it hard to walk a straight path you rethink your plan. You see different ways leading through the forrest, which both could lead to the village you want to get to. \n You could get to higher ground, or simply follow the river here. \n So what is it going to be?",
    options: [
    {
    text: "Higher Ground",
    nextText: 151
  },{
    text: "Follow River",
    nextText: 152
      }    
    ]
  },
  // Sleep on top of tree ends here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
  
  
  // SOUTH-WAY STORY !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // SOUTH-WAY STORY !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // SOUTH-WAY STORY !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  {
    id: 2,
    text: "You venture forth in search of answers to where you are when you come across a merchant. \n You ask some questions but the merchant appears to have no answer for any of them. \n Though, he likes the piece of cloth you wear, appearently it's valuable. \n He offers you different items, what dou you do?",
    options: [
    {
    text: "Trade the cloth for a sword",
    requiredState: currentState => currentState.cloth,
    setState: {cloth: false, sword: true},
    nextText: 4
  },{
    text: "Trade the cloth for weird gems",
    requiredState: currentState => currentState.cloth,
    setState: {cloth: false, weirdGems: true},   
    nextText: 4
  },{
    text: "Ignore the Merchant",
    nextText: 4
      }    
    ]
  },   {
    id: 4,
    text: "After leaving the merchant you start your journey next to the river. \n You walk, and walk, and walk. Finally, after walking for hours you see that the river flows through a small town. \n About a mile away from the town you also see an abandoned looking castle. \n It got pretty dark while walking next to the river and you are really tired. \n So.. what do you do?",
    options: [
    {
    text: "Explore the castle",
    nextText: 6
  },{
    text: "Find a place to sleep in town",  
    nextText: 8
  },{
    text: "Find some hay in a stable to sleep in",
    nextText: 10
      },
      {
    text: "Sleep outside the town inbetween some bushes",
    nextText: 44
      } 
    ]
  },
  //Hay in stable starts here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    { id: 10,
    text: "You go towards a stable on the outside part of the town. \n Everything around the town seems so quiet, but you are way too tired to ask questions. \n You found a good looking stable you could sleep in. But since the town appears to be empty, you also could take a look at it and maybe find some place to sleep there.",
    options: [
      {
      text: "Explore town",
      nextText: 8
    }, {
      text: "Sleep in stable",
      nextText: 100
    }
    ]
  }, 
    { id: 100,
    text: "'.. .. hey you, hey .. '\n 'He doesn't understands us maybe.. '\n 'Leave him, he's not important for now'",
    options: [
      {
      text: "Wake up",
      requiredState: currentState => currentState.weirdGems,  
      nextText: 1000                                                        
    }, {
      text: "Sleep on",
      nextText: 1001
    }
    ]
  }, 
  { id: 1001,
    text: "That was weird. \n Nevertheless it's a good morning and you're ready to continue your journey.",
    options: [
      {
      text: "Explore the town",  
      nextText: 6677                 
    }, {
      text: "Leave the town",
      nextText: 6677222
    }
    ]
  }, 
  // mysterious way 1000 starts here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  { id: 1000,
    text: "'He's awake - look' \n You open your eyes only to realize you've dreamed. \n You aren't quite sure about what or why. \n What is real or what is wrong. \n You hear some noises outside but you sure aren't fully awake yet. What now?",
    options: [
      {
      text: "Sleep on",  
      nextText: 1001                 
    }, {
      text: "Explore noises",
      nextText: 10000
    }
    ]
  }, 
  { id: 10000,
    text: "You barely open your eyes but it's enough to see a little. \n You walk out of the stable and you hear the noises get quiter and quiter. \n You think you see some light in the forrest behind the stable.",
    options: [
      {
      text: "Go back to sleep",  
      nextText: 1001                 
    }, {
      text: "Explore light",
      setState: {key: true},
      nextText: 100000
    }
    ]
  }, 
   { id: 100000,
    text: "As you come closer to the light, it's strength weakens and weakens. \n You walked almost to the edge of that forrest, as you notice that right on the biggest, towards the stable poiting tree, \n there is a mysterious looking key attached to it. \n\n You take the key and the light immediately disappears completely. It's dark.",
    options: [
      {
      text: "Go back to sleep",  
      nextText: 1001                 
    }, {
      text: "Explore further",
      nextText: 100001
    } ]
  }, 
   { id: 100001,
    text: "You really should learn when it's enough. \n This time it really was enough.",
    options: [
      {
      text: "Restart",  
      nextText: -1                
    }]
  }, 
  //Hay in stable ends here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // Sleep in bushes starts here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  { id: 44,
    text: "You are so tired that you immediately fall asleep only to be \n killed by some terrible monster in your sleep moments later.",
    options: [{
      text: "Restart",
      nextText: -1
    }]
  }, 
  // Sleep in bushes ends here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
  // walk towards castle starts here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  { id: 6,
    text: "You walk fast towards the castle as it's getting darker every minute. \n As you come close you see that the castle really is abandoned, but it really looks ruined. \n Nevertheless you find some places to sleep as you are really tired. One is on ground floor hidden in some sort of tent in \n the middle of the castles courtyard. The other one is on upper ground, but it's a risky climb up to get there. The spot also \n isn't pretty convincing talking about safety, but it is higher up.",
    options: [
    {
    text: "Sleep in the tent",
    nextText: 66
  },{
    text: "Climb to higher sleep spot",
    nextText: 67
  }
    ]
  }, 
  
  { id: 66,
    text: "You get in the tent and find a nice cozy looking spot. You start to fall asleep immediately as you really are tired and it's also late already. A few hours in the sleep you here noises outside your tent. These noises appear to be animal noises, and actually there are a bunch of them surrounding your tent at the moment. \n What now?",
    options: [
      {
      text: "Open tent",
      nextText: 666
    },
      {
        text: "Wait quietly",
        nextText: 667
      }
    ]
  },
   { id: 666,
    text: "You open the tent and immediately regret making such a bad descision. \n So while looking at the nightsky, you get attacked by at least five wolves. \n Watch out next time.",
    options: [
      {
      text: "Restart",
      nextText: -1
    } ]
  },
   { id: 667,
    text: "Your heart starts shaking as you wait quietly for these animals to leave. Fortunately they do so after a while, but i guess that ruined your good night sleep. \n Doesn't matter it's still not that bright again so you could sleep some more. \n But since you are already awake you could also start exploring some more. So what is it going to be?",
    options: [
      {
      text: "Sleep some more",
      nextText: 6676
    }, {
      text: "Go explore the town",
      nextText: 6677                                                          
    }, {
      text: "Climb the castle",
      nextText: 67                                                         
    }   ]
  },
  //additional castle content !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   { id: 6676,
    text: "You fell asleep and the animals returned. \n This time luck wasn't on your side. \n It turned out that these animals actually were a pack of hungry wolves. \n And since they found a way in your tent this time, ...",
    options: [
      {
      text: "Restart",
      nextText: -1
    }, {
      text: "Ouch",
      nextText: -1
    }]
  }, { id: 67,
    text: "So you're a climber. Alright let's go. \n You find a nice route to climb up and start climbing. The castle is pretty much destroyed but it'll do for the night. \n You find a place to sleep.",
    options: [
      {
      text: "Sleep",
      nextText: 676
    }, {
      text: "Go back to tent",
      nextText: 66
    }]
  }, { id: 676,
    text: "Good Morning. \n The weather is sunny, no fog and you had a good night of sleep. \n From up here you see the whole town. \n It seems very quiet though. \n If you're ready let's go.",
    options: [
      {
      text: "Explore the town",
      nextText: 6677
    }]
  },  
  { id: 6677,
    text: "You head towards the town. It's seems like it's the middle of the day, but you don't see anybody. \n What is this place? \n As you get closer to the middle of the twon you realize that it must be empty. This is very strange, but you just haven't seen anyone. So we need a new plan.",
    options: [
      {
      text: "Loot the town",
      nextText: 66771
    }, {
      text: "Make loud noises",
      nextText: 66772
    }]
  }, 
   { id: 66772,
    text: "You start making noises. In fact pretty loud ones too. \n No one seems to care.",
    options: [
      {
      text: "Loot the town",
      nextText: 66771
    }, {
      text: "Make louder noises",
      nextText: 667722
    }]
  },
   { id: 667722,
    text: "Nobody cares.",
    options: [
      {
      text: "Loot the town",
      nextText: 66771
    }, {
      text: "Leave the town", 
      nextText: 6677222                  
    }]
  },
  { id: 66771,
    text: "So you've decided to loot this town as good as possible. You walk in every house you see and take whatever is useful. You find a lot of food and you also eat some. The houses interiors seem to look very nice for abandoned ones, but for now let's focus on other things. You found a bagpack and packed it with some useful items, such as a knife, some medical stuff and so on.",
    options: [
      {
      text: "Leave the town", 
      nextText: 6677222            // This path is under the walk towards town path !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!          
    }]
  }, 
  // walk towards castle ends here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
  /*  requiredState: currentState => currentState.xyz, setState: {xyz: true} */
  // walk towards town !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  {
    id: 8,
    text: "So you venture forth towards the town as the sun increasingly dissapears with every minute that passes. \n While walking you realize that you haven't seen anybody since the merchant. Even getting closer to the town doesn't make anyone or at least any noise appear. As you get to the middle of the town you see that the whole town is empty. This is very strange, but you just haven't seen anyone. You get a weird feeling but you also are very tired, so.. what's it this time?",
    options: [
    {
    text: "Make loud noises",
    nextText: 81
  },{
    text: "Find a rather hidden place to sleep", 
    nextText: 82
  },{
    text: "Go sleep in the first open house you see",
    nextText: 83
      }    
    ]
  }, { id: 81,
    text: "You start making noises. In fact pretty loud ones too. \n No one seems to care.",
    options: [
       {
    text: "Make louder noises",
    nextText: 811
  },{
    text: "Find a rather hidden place to sleep", 
    nextText: 82
  },{
    text: "Go sleep in the first open house you see",
    nextText: 83
      } ]
  }, { id: 811,
    text: "Nobody cares.",
    options: [
       {
    text: "Find a rather hidden place to sleep", 
    nextText: 82
  },{
    text: "Go sleep in the first open house you see",
    nextText: 83
      } ]
  }, { id: 82,
    text: "You sneak around town and finally you find something that suites your eyes. It's a little bigger sized house you climb on. The roof has it's own roof again and no animal will be able to climb up to annoy you. You found a nice place to sleep.",
    options: [
       {
    text: "Sleep",
    nextText: 821
  },{
    text: "Go sleep in the first open house you see",
    nextText: 83
      } ]
  }, { id: 821,
    text: "It was a good night of sleep on top of here. You seem to enjoy sleeping on top of things. \n Well for now, let's go on. \n You've slept good and the weather is fine. \n What now?",
    options: [
       {
    text: "Loot the town",
    nextText: 66771
  },{
    text: "Leave the town",
    nextText: 6677222                       // goes towards hill || follow river path !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      } ]
  }, 
  { id: 83,
    text: "You get in the first open house you like and throw yourself immediately in the bed. Really comfortable for such an abandoned town but let's not think about that. You are very tired and the place seems ok.",
    options: [
      {
    text: "Find a rather hidden place to sleep", 
    nextText: 82
  },{
    text: "Sleep",
    nextText: 831
      } ]
  },  { id: 831,
    text: "You wake surrounded by strange creatures. You can't identify if these are humans or not. \n They don't like you being awake.",
    options: [
      {
    text: "Fight", 
    requiredState: currentState => currentState.sword,    
    nextText: 8311                              
  },{
    text: "Restart",
    nextText: -1
      } ]
  }, 
   { id: 8311,
    text: "You fight the strange creatures. They fight back but actually it's an easy fight after all. \n They don't like you being awake, and you don't like them being alive i guess. \n So you took care of that, but what now?",
    options: [
      {
    text: "Search the bodys", 
    setState: {document: true},   
    nextText: 83111                               
  },{
    text: "Loot the town",
    nextText: 66771
  },{
    text: "Leave the town",
    nextText: 6677222                      
      }]
  },  { id: 83111,
    text: "You have found a mysterious document. \n You don't understand a thing.",
    options: [
      {
    text: "Loot the town",
    nextText: 66771
  },{
    text: "Leave the town",
    nextText: 6677222                     
      }]
  },                                        // here would be the place for a new textNodeId
  // walk towards Hill starts here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  { id: 6677222,
    text: "So you've decided leave this town. \n Seems ok to me since there was nobody to answer questions here. You could follow the river further south. Alternatively you could climb up some hills to get a better view. Although these hills don't seem to be very close here. So.. where do we go from here? ",
    options: [
      {
      text: "Walk towards Hills", 
      nextText: 3030                    
    }, {
      text: "Continue along the river",
      nextText: 3031
    }]
  },
   { id: 3030,
    text: "So you climb up some hills and get a better view. \n Even though these hills didn't seem to be very close, you still get quite a good overview of the town. \n You see that at the edge of this town there is a valley. It goes deep between the mountains and the forrests. \n Alternativey there would be the river that flows through the forrest. Where do you go? ", 
    options: [
      {
      text: "Explore the valley", 
      nextText: 30301                    
    }, {
      text: "Continue journey along the river",
      nextText: 3031
    }]
  },
  // walk towards Hill ends here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // Explore valley starts here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   { id: 30301,
    text: "So you decide to explore the beautiful valley you've seen from the hills. \n Not a bad choice if you ask me, you're close to mountains as well as to forrests. \n But still after walking for a while you get the feeling that maybe it wasn't right.", 
    options: [
      {
      text: "Go back to river-route", 
      nextText: 3031                   
    }, {
      text: "Continue your way",
      nextText: 333
    }]
  }, 
   { id: 333,
    text: "You continue exploring this beautiful valley, \n when all of a sudden birds starts to sing.", 
    options: [
      {
      text: "Continue", 
      nextText: 3331                   
    }]
  }, 
   { id: 3331,
    text: "The natures green color becomes so strong, you just want to lay down and hug it.", 
    options: [
      {
      text: "Continue", 
      nextText: 33311                    
    }]
  },
    { id: 33311,
    text: "Even the flowers have such a strong smell that you literally can taste them.", 
    options: [
      {
      text: "Continue", 
      nextText: 333111                    
    }]
  },
  { id: 333111,
    text: "All of a sudden you become unconscious.", 
    options: [
      {
      text: "Wake up", 
      nextText: 3331111                    
    }, {
      text: "Don't wake up",
      nextText: -1
    }]
  },
  // Explore valley ends here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // Wake up after unconscinous in valley starts here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  { id: 3331111,
    text: "You open your eyes. \n\n What happened? \n\n What is this place?", 
    options: [
      {
      text: "Stand up", 
      nextText: 33311113                    
    }, {
      text: "Close eyes again",
      nextText: 333111
    }]
  },
  { id: 33311113,
    text: "You stand up and you notice, that somehow you got knocked out in the middle of a flower field. \n Weird is that you don't remember walking around here, but you don't care too much for now. \n But something about this whole valley definately seems weird, you are quite convinced. \n\n Nevertheless you move on, and as you move on you see a lot of natures variety. \n You don't know how, but you feel as if these special smells affects you pretty hard, and that it could be something about these flower whoose numbers you increasingly start to see going up again. \n As you continue further down the valley, you see that it leads into a forrest again. \n Alternatively you could also try to find a way up on these mountains next to you. This option would have less of this nature, but it does look difficult. \n\n What do you choose?", 
    options: [
     {
      text: "Search for way",
      nextText: 43331111344
    }, {
      text: "Go to forrest",
      nextText: 4333111134
    }]
  },
  { id: 4333111134,
    text: "Usually it's good not to ignore warnings. Never mind. \n You head towards the forrest as your view increasingly gets worse and worse again. \n The dizzyness comes back, this time you're also pretty cold. \n You continue your way, but you barely have your eyes open. \n You see a river, this could wake you up maybe.", 
    options: [
      {
      text: "Jump in", 
      nextText: 43331111341                    // goes to lets party easter egg???
    }, {
      text: "Sit down for a while", 
      nextText: 333111                         // goes back to all of a sudden you become unconscinous !     
    }]
  },
   { id: 43331111341,
    text: "Yeeaah duuuuude. \n\n Let's party!", 
    options: [
      {
      text: "Restart", 
      nextText: -1                    
    }]
  },
   { id: 433311113411,
    text: "Are you sure you want to go back? \n\n Last time you didn't feel that good.", 
    options: [
      {
      text: "Yes", 
      nextText: 4333111134                  
    }, {
      text: "No",
      nextText: 433311113444
    }]
  },
  //Search for WAY OUT OF VALLEY TO MOUNTAIN STARTS HERE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   { id: 43331111344,
    text: "So.. you want the mountains.. you get mountains. \n You find a route but it's a long and technical climb. \n You could also choose to go back through the forrest again.", 
    options: [
     {
      text: "Climb",
      nextText: 433311113444
    }, {
      text: "Go back into forrest",
      nextText: 433311113411
    }]
  },
  { id: 433311113444,
    text: "So mountains it shall be! \n\n After some planning of your exact route across this mountains wall, you start climbing up. \n It doesn't take very long for the routes difficulty to really start to increase. \n At one point you need to pick a rock to hold on so you can continue your climb. \n One handhold would be easier to grab, but seems very flat and smooth. \n The other could hurt your hand as it is quite rough, but it seems stable.", 
    options: [
      {
      text: "Smooth Handhold", 
      nextText: 4333111134441                    
    }, {
      text: "Rough Handhold",
      nextText: 4333111134442
    }]
  },
  { id: 4333111134441,
    text: "As quick as it started, so quick did it end. \n\n Your journey unfinished, but it's ready for a new begin.", 
    options: [
      {
      text: "Restart", 
      nextText: -1                    
    }]
  },
  { id: 4333111134442,
    text: "You grab on that solid rock, and you slightly cut your hand. \n\n It appears to be no danger, so continuing your way gets the upperhand. \n\n As you climb you see a shortcut, some roots and some vines. \n\n Maybe you could use them, or maybe you just pass by.", 
    options: [
      {
      text: "Shortcut", 
      nextText: 4333111134441                    
    }, {
      text: "Climb on",
      nextText: 43331111344422
    }]
  },
  { id: 43331111344422,
    text: "The choices you make are good, so your hands remain quite stable. \n But the more and more you climb, the more and more you fatigue. \n Soon you reach a point where your hands won't be able to hold you on this wall anymore. \n\n You need a place to rest some time. \n If you continue climbing up on your left side, you see what potentially could be a cave you could hide in for some rest. \n If you continue on your right side you'll have a little extension you could sit on. \n\n What now?", 
    options: [
      {
      text: "Cave", 
      nextText: 433311113444221                    
    }, {
      text: "Extension",                
      nextText: 433311113444222
    }]
  },
  { id: 433311113444221,
    text: "You climb on as your grip weakens with each and every bit of progress you make. \n Although you hope for the best, you don't know what to expect. \n And as you reach the cave, you realize that there's no way you could fit inside. \n Now that you have no erergy left anymore, you hold on to that cave. \n As your arms increasingly loose strength, you look down into the abyss. \n You've already managed quite a lot of way, when unfortunately... \n you let go. \n\n Sometimes it's better to know things.", 
    options: [
      {
      text: "Restart", 
      nextText: -1                    
    }]
  },
  { id: 433311113444222,
    text: "And another good choice. Well done. \n You manage to climb to the extension and you sit down on it. \n It's an amazing view you enjoy. \n You see the river going through the forrest, you see the valley, you see a lot. \n You also manage to get some good rest up here. \n\n So let's move on.\n As you look up to the top of this what now appears to be a cliff, you see different ways of overcoming the next obstacle. \n It's a overhang, in fact a quite big one. \n Again you could pick the left side around it or the right one.", 
    options: [
      {
      text: "Left", 
      nextText: 4333111134442221                    
    },
    {
      text: "Right", 
      nextText: 4333111134442222                    
    }]
  },
  { id: 4333111134442222,
    text: "You start climbing around the right side of the overhang, when suddenly you hear some rocks falling of the top of the cliff. \n You stay still and you hope for the best, as only seconds later one fist-sized rock catches your face and takes you down to ground with it. \n\n Usually ... a lot of the times you pick right, you are right. \n But not this time my friend, not this time.", 
    options: [
      {
      text: "Restart", 
      nextText: -1                    
    }]
  },
  { id: 4333111134442221,
    text: "You start climbing around the left side of the overhang, when suddenly you hear some rocks falling of the top of the cliff. \n You stay still and you hope for the best, as only seconds later one fist-sized rock almost catches your face. \n I can tell you were lucky on this one, but that's great.", 
    options: [
      {
      text: "Continue climbing", 
      nextText: 43331111344422211                    
    }]
  },
  { id: 43331111344422211,
    text: "As you continue your climb, you see that you are slowly approaching the end of it. \n A couple more moves and you are done. \n As you get closer and closer to the edge of this cliff, you spot different options to conquer your next and final obstacle on this wall. \n Right at the top of this cliff you see a tree, whoose roots you could propably use to climb up. \n Alternatively you could try climbing up with no aid, at least it also seems doable. \n The last possibility presents a rather long crack in the wall you'd have to cross to your right side, so you could continue climbing what you think would be the easiest way up. However, this crack between you and this route is pretty big, as well as it is on a vertical wall. \n Your strength weakens little by little again.", 
    options: [
      {
      text: "Climb to roots",   // NOT READY !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      nextText: 4333111134442221114                    
    },  {
      text: "Climb without aid",   
      nextText: 433311113444222112                    
    },  {
      text: "Climb over crack",   
      nextText: 433311113444222113                    
    }]
  },
  { id: 433311113444222113,
    text: "Why would you volunatily choose the hardest route. Interesting. \n As you try to pass this crack, you realize that it isn't as easy as you thought. \n You start climbing and you come to a point where you are kind of stuck. \n Actually you appear to have brought yourself in a chimney like position, the only problem is you can't exit this position alone. \n As you get weaker and weaker you look around, what a beautiful view. \n\n You almost had it.", 
    options: [
       {
      text: "Restart",
      nextText: -1                      
    }]
  }, 
  { id: 433311113444222112,
    text: "You don't want to interact with the alternatives and you don't want any help as well. \n You continue climbing up towards the cliff. \n Only a few moves away, you start to become really impatient. \n You climb up fast, as you want this climbing to be finished quick, when suddenly you grab what you believe to be your next handhold. \n It turns out that was a snake... \n The snake bites your hand and you immediately pull it back. \n\n Without your stabilizing hand you immediatly slip. \n\n This didn't took very long, but it quickly ended your trip.", 
    options: [
       {
      text: "Continue",
      nextText: 3033111                      
    }]
  }, 
  { id: 4333111134442221114,
    text: "Are you sure you don't prefer the alternatives?", 
    options: [
       {
      text: "Yes",
      nextText: 43331111344422211141                      
    },        {
      text: "No",
      nextText: 43331111344422211                      
    }]
  }, 
  { id: 43331111344422211141,
    text: "You really don't fall for traps, huh?", 
    options: [
       {
      text: "True",
      nextText: 433311113444222111411                      
    },        {
      text: "Not True",                                   // Trap restart !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      nextText: -1                      
    }]
  }, 
  { id: 433311113444222111411,
    text: "Alright.. \n You climb towards the roots of this tree and you finally reach them. \n While you climb over them, you hear some snap and some other crack, but because you don't have any other choice now you continue. \n You grab and climb, and you don't worry for some time. \n Until finally you overcome the cliff and lay down on this huge overhang rock you just climbed on. \n\n Beautiful isn't it. \n After such a long climb you just sit and relax for a while. \n\n But as your excitement decreases, you start to think about your journey and how to continue it. \n From where you are now, climbing back is not an option so what is? \n You see two walkable paths going deeper into the mountains. \n One goes straight and looks very easy, the other one slowly goes further up, but also deeper into the mountains. \n What do you prefer?", 
    options: [
       {
      text: "Walk",
      nextText: 4333111134442221114111                                                                   
    }, {
      text: "Hike",
      nextText: 433113442221114112
    }] 
  }, 
  // UP ON THE CLIFF STARTS HERE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // WALK AFTER CLIFF STARTS HERE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   { id: 4333111134442221114111,
    text: "After such a long climb you are quite exhausted, so you naturally prefer the walk instead of the hike. \n And then you start to walk again. Only this time you walk high up in the mountains. \n You became very familiar with walking by now and you start to enjoy the art of moving your feet. \n After all what else is there you could do? Never mind. \n So you walk and walk and walk. \n After walking for some time you realize that you've come to a forking. \n From here, you could climb up to the hiking trail you could have walked earlier, but the climb seems risky. Or you enter this kind of cave in front of you. But actually this caves entry is a hole in the ground and the cave is too dark to estimate how deep it is. \n\n What now?", 
    options: [
       {
      text: "Enter the Cave",
      nextText: 43331111344422211141111                      
    }, {
      text: "Climb to trail",
      nextText: 33343331111344422211141111
    }]
  }, 
  { id: 43331111344422211141111,
    text: "It's a dark hole in the ground and you don't know how deep it is. Sure why not explore it. \n You try to climb down this caves entry, but it turns out that not seeing where you go while climbing is actually pretty difficult. \n Since you already went halfway into that cave, you are basically left only with the possibility to jump.", 
    options: [
       {
      text: "Jump",
      nextText: 433311113444222111411111                      
    }]
  }, 
   { id: 433311113444222111411111,
    text: "The deeper you go, the darker it gets. \n\n And the faster you fall, the harder the floor hits. \n\n You knew that this was a bad idea.", 
    options: [
       {
      text: "Restart",
      nextText: -1                      
    }]
  }, 
   { id: 33343331111344422211141111,
    text: "As you try to climb up, you notice your hands are still resting. \n\n Anyway if it has to come to an end, you would prefer it while testing. \n\n But as your first few test pass and you manage to climb. \n\n Some stones they become loose.. and you better move left or right.", 
    options: [
       {
      text: "Left",
      nextText: 333433311113444222111411114                      
    },  {
      text: "Right",
      nextText: 33433311113444222111411115                      
    }]
  }, 
  { id: 333433311113444222111411114,
    text: "You choose left.. and it was false. \n\n You get hit by big rocks and that's the end of it all.", 
    options: [
       {
      text: "Restart",
      nextText: -1                      
    }]
  }, 
   { id: 33433311113444222111411115,
    text: "You choose right and you're right. \n\n You avoid the rocks even though it was real tight. \n\n Finally, you reach the trail.", 
    options: [
       {
      text: "Continue",
      nextText: 44331111344422211141122                      
    }]
  }, 
  // HIKE AFTER CLIFF STARTS HERE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  { id: 433113442221114112,
    text: "After such an exhausting climb you still have enough energy for this hike. What a great endurance you have. \n So you start to hike, and you hike and hike. \n While hiking you see what you believe to be various signs of somebodys presence around this trail in the past. \n There are signs craved into the rocks you pass, but you don't understand them so you just continue your way. \n But as you walk and walk, you see far in distance something that appears to be a weirdly shiny metal. \n This thing is a little off of your way, so what do you do?", 
    options: [
      {
      text: "Explore metal########################################",     // NOT READY !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      nextText: -1                   
    }, {
      text: "Continue trail",
      nextText: 44331111344422211141122
    }]
  }, 
  { id: 44331111344422211141122,
    text: "The trail looks \n But up here there aren't a lot other alternatives so probably you aren't wrong.", 
    options: [
      {
      text: "Go on######tomountainvillage#",                                                               // 1111111 goes to Mountain village ?????????????????????
      nextText: 1111111                    
    }, {
      text: "Co############################",
      nextText: -1
    }]
  }, 
  // Follow the river starts here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 { id: 3031,
    text: "So you decide to continue your journey along the river. \n Not a bad choice if you ask me, water always leads somewhere. \n But still after walking for a while you get the feeling that maybe it wasn't right.", 
    options: [
      {
      text: "Go back to valley route", 
      nextText: 30301                   
    }, {
      text: "Continue your way",
      nextText: 30331
    }]
  }, 
   { id: 30331,
    text: "You continue your journey along the river. You walk and walk. \n You come to a place where the river almost looks inviteably quiet. \n Getting carried along some of the way would be great you think.", 
    options: [
      {
      text: "Swim along the river", 
      nextText: 303310                   
    }, {
      text: "Continue your way",
      nextText: 303311
    }]
  }, 
  { id: 303310,
    text: "How could you not see the trap. \n Try again.", 
    options: [
      {
      text: "Restart", 
      nextText: -1                   
    }, {
      text: "Swim again",
      nextText: -1
    }]
  }, 
  { id: 303311,
    text: "You don't fall for traps huh? \n Well.. i guess that's good.", 
    options: [
       {
      text: "Continue",
      nextText: 3033111                      
    }]
  }, 
  { id: 3033111,
    text: "So you continue walking and walking when suddenly on the other side of the river you see a cave. \n This cave appears to have an open end making it more a tunnel than a cave. \n Additionally you see a lot of signs of traffic, such as broken branches and so on there. What do you do?", 
    options: [
       {
      text: "Cross River",
      nextText: 30331113                     
    }, {
      text: "Ignore cave",
      nextText: 30331114                     
    }]
  }, 
  //Ignore cave starts here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  { id: 30331114,
    text: "Do you really want to ignore it?", 
    options: [
       {
      text: "Yes",
      nextText: 303311144                     
    }, {
      text: "No",
      nextText: 30331113                     
    }]
  }, 
  { id: 303311144,
    text: "Well quite determined you are. I like that. \n So then you walk past this cave and you don't loose a second thought about it. \n You continue walking along the river, when slowly you notice that the way you walk gets worse and worse. \n You get to a point where you don't longer walk, you only step over roots and climb through trees all the time. \n Continuing this process is very hard and slow, but you continue it. \n So you pass tons and tons of trees, only to discover that you've lost the river you were following and you've lost yourself in this forest. \n You could try to find the river again, alternatively you could try to exit this forest somewhere. \n\n What do you do?", 
    options: [
       {
      text: "Search for River#######################################################",
      nextText: -1                    
    },  {
      text: "Exit forest",
      nextText: 393311144                    
    }]
  }, 
  //SEARCH FOR RIVER SMALL STORY STARTS HERE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  //EXIT FOREST SMALL STORY STARTS HERE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  { id: 3933111444,
    text: "You walk towards the exit of this forest. \n As you approach the end of the path, you realize you are walking towards a huge cliff. \n Fortunately, you have seen it in time so nothing bad happend. \n Still you propably won't be able to climb down, as the only way would be provided by some not-reliable looking vines. \n Alternatively you could walk back again and try to search for the river.", 
    options: [
       {
      text: "Climb vines",
      nextText: 39331114446                    
    },  {
      text: "Search for river###############################################################",
      nextText: -1          //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!          
    }]
  },
  { id: 39331114446,
    text: "Didn't I tell you they weren't reliable. But sure why not try it yourself. \n You grab some vines and start the climb. \n It's a very high cliff so you try not to spend too much time with climbing down this wall. \n\n It actually even looks good until.. well until it doesn't anymore. \n\n The vines snap and you fall in the gap.", 
    options: [
       {
      text: "Restart",
      nextText: -1                    
    }]
  },
  { id: 393311144,
    text: "After being lost in the forest for already quite a while, you decide you want to leave. \n You look around and take what you think will be the easiest walking route. You walk and walk and actually after some time you notice that the trees around you increasingly disappear. \n You now see a route ahead of you, and most importantly, you see the blue sky.", 
    options: [
       {
      text: "Go towards exit",
      nextText: 3933111444                    
    },  {
      text: "Run towards exit",
      nextText: 3933111446                    
    }]
  },
  { id: 3933111446,
    text: "Excited huh? Well then go for it. \n You start running towards what you believe will be the exit of this forest. \n As you approach the end of the path, you realize you are running towards a huge cliff. \n Unfortunately, I think it's to late to stop now.", 
    options: [
       {
      text: "Try to stop",
      nextText: 39331114466                    
    }]
  },
   { id: 39331114466,
    text: "Sometimes it's good to go fast, sometimes it isn't.", 
    options: [
       {
      text: "Restart",
      nextText: -1                    
    }]
  },
  //EXIT FOREST SMALL STORY END HERE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
  // Explore Cave starts here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  { id: 30331113,
    text: "Obviously, this looks way too intresting to be ignored. \n The river has a not-too narrow part you could jump, as well as a thick but very slippery looking log you could use as bridge, or a piece of a broken wooden boat you see. \n This peace could support and carry you if you try to swim across the river. \n\n So, what do you do?", 
    options: [
       {
      text: "Jump river",
      nextText: 303311131                     
    }, {
      text: "Swim river",
      nextText: 303311132                    
    }, {
      text: "Log Bridge",
      nextText: 303311133
    }, {
      text: "Ignore Cave",
      nextText: 30331114
    }]
  },
   { id: 303311131,
    text: "So you are the jumping type of person. So then let's jump. \n\n You find a spot you think this would be possible. \n You take some good amount of space for your run-up. \n You jump... and ... \n\n You land in the cold water, only to get your head immediately smashed against some rocks in the river. \n\n Next time you aren't 100% sure, how about skipping on it?", 
    options: [
       {
      text: "Restart",
      nextText: -1                    
    }]
  },
  { id: 303311132,
    text: " Oh well i don't think that'll work. But try it why not. \n\n You find a spot you think this could be possible. \n You break a larger piece of wood from the boat and lastly.. \n\n You jump in ... and ... \n\n You land in the cold water, only to get your head immediately smashed against some rocks in the river. It turns out that the piece of wood you brought into this wasn't helpful at all. \n\n Next time you aren't 100% sure, how about skipping on it?", 
    options: [
       {
      text: "Restart",
      nextText: -1                    
    }]
  }, { id: 303311133,
    text: "You try it with the good old slippery log bridge. Most people wouldn't choose that option. \n You could also reconsider ignoring the cave again.", 
    options: [
       {
      text: "Log Bridge",
      nextText: 3033111333                                               
    }, 
    {
      text: "Ignore Cave",
      nextText: 30331114                    
    }]
  },
  { id: 3033111333,
    text: "So then it shall be the good old log bridge you can see. \n\n You step onto it and carefully cross it step by step. \n The log is very slippery so crossing it definetly won't be easy.\n As you go on, you think that the river increasingly gets angry the closer you come to the end of that log. \n So you go slow.. very slow.. step.. by step.. by step... aand  \n\n You make it! \n\n Welcome to the other side. \n From here you see a clear path towards the cave.", 
    options: [
       {
      text: "Go explore cave",
      nextText: 30331113333                    
    }, {
      text: "Go back",
      nextText: 630331113336
    }]
  },
   { id: 630331113336,
    text: "Oh well, you really like to challange your luck. But try it why not. \n\n You step back on the log again and you try to move on. \n This time you go faster - you think this can't be wrong. \n Then you go and you slip - go try your luck on your next trip.", 
    options: [
       {
      text: "Restart",
      nextText: -1                    
    }]
  },
  //Walk towards hill & Follow the river end here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111111
  //Exploring CAVE/TUNNEL starts here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111111
  { id: 30331113333,
    text: "Good choice, let's move on. \n\n You walk towards the cave when suddenly you see that there's a pretty big gap right in front of you. \n A lot of trees lie around and coincidentally there's also a fallen tree going across the gap. Although it does appear to be a little loose.\n You also spot a big tree whose vines reach far enough to swing you across this fissure. \n What is it going to be?", 
    options: [
       {
      text: "Log Bridge",
      nextText: 303311133331                    
    },{
      text: "Vine Swing",
      nextText: 303311133332
    }]
  },
  { id: 303311133332,
    text: "Ok, try it why not. \n\n You step back, grab the vine, start running. \n At first you think it's ok, but as soon as you hold on to that vine with your whole weight it tears and falls into the deep deep fissure. \n And so do you. \n\n Try again.", 
    options: [
       {
      text: "Restart",
      nextText: -1                    
    }]
  },
  { id: 303311133331,
    text: "Ok, try it why not. \n\n You step on that log and slowly start walking to the other side. \n At first you think it's ok, but as soon as you're about mid-way across that log, it starts to rotate. \n You are very close to the end if you manage to rotate with it for a little bit you could make it. \n Decide quickly in what direction to follow the rotation. \n\n Choose wisely.", 
    options: [
       {
      text: "Follow left",
      nextText: 3033111333311                    
    }, {
      text: "Follow right",
      nextText: 3033111333312
    }]
  },
   { id: 3033111333311,
    text: "Oh, you immediately regret that decision. \n\n A wise decision is a right decision. \n\n It turns out, the log agreed.", 
    options: [
       {
      text: "Restart",
      nextText: -1                    
    }]
  },
  { id: 3033111333312,
    text: "It works, but it doesn't work very long. \n\n The log starts to fall into the gap, but you have one last chance. \n\n You could use your momentum to jump and hold on to the cliff of this gap. Alternatively you could jump to a trees roots you see in font of you. You don't know if they will hold you but it's an easier jump than the cliff-jump. \n\n Time runs, what now?", 
    options: [
       {
      text: "Jump to Root",
      nextText: 30331113333121                    
    }, {
      text: "Jump to Cliff",
      nextText: 30331113333122
    }]
  }, 
  { id: 30331113333122,
    text: "Well, you knew that this would be the harder one. \n So you jump to the cliff and immediately hold on to it. \n\n But, unfortunately there's not much you could hold on, on a cliff. \n So as your grip slowly weakens, you think about the choice you have made. \n\n Choices what a thing, once made they are made.", 
    options: [
       {
      text: "Restart",
      nextText: -1                    
    }]
  },
  { id: 30331113333121,
    text: "Alright. \n You jump to this trees root and actually manage to hold on pretty easily. \n You immediately climb up the roots and finally overcome the gap. \n This was a quite tricky one. \n As you walk on you get closer and closer to the cave. \n In fact, now that you aren't that far away anymore, you see that it isn't that much of a cave. \n You clearly see light at the end of it, even though you don't know how long it would take to get there. \n\n But... It's a tunnel.", 
    options: [
       {
      text: "Enter tunnel",
      nextText: 303311133331211                    
    }]
  },
  { id: 303311133331211,
    text: "As you enter the tunnel you notice that the light inside is pretty low. \n You can't see very far ahead, but at least you see the light at the end of this tunnel. \n As you walk and walk you step on branch-like things you don't care about at first. \n But since you start hearing all kinds of animal echos you start to question everything. \n Nevertheless you continue.", 
    options: [
       {
      text: "Continue",
      nextText: 3033111333312111                    
    }]
  }, 
  { id: 3033111333312111,
    text: "The tunnel is way more mysterious than you thought. \n Now that you're about mid-way trough it you see, what appears to be a special room. \n It's a spacious hall, even with some statue or at least you think that these are some.", 
    options: [
       {
      text: "Explore Hall",
      nextText: 30331113333121111                    
    }, {
      text: "Ignore Hall",
      nextText: 303311133331211122
    }]
  },
  { id: 30331113333121111,
    text: "So let's explore this mysterious hall. Great. \n\n You find some signs on the wall, but unfortunately you don't understand them. Nevertheless you are sure they mean something. \n These what you believed to be statues are weird rock formations, apparently constructed like this on purpose. \n At the end of the tunnel you find something that looks like a keyhole, but you aren't too sure about that.", 
    options: [
      {
        text: "Continute route through tunnel",
        nextText: 303311133331211122
      },
       {
      text: "Use mysterious key#####",                         // must create !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      requiredState: currentState => currentState.key,
      nextText: -1                    
    }, 
    {
      text: "Use mysterious document#####",                    // must create !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      requiredState: currentState => currentState.document,
      nextText: -1                    
    }]
  }, 
  //SPECIAL WAYS KEY AND DOCUMENT START HERE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //SPECIAL WAYS KEY AND DOCUMENT END HERE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
  //CONTINUING ROUTE THROUGH TUNNEL START HERE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  { id: 303311133331211122,
    text: "Well.. ok. \n\n You continue your way through the tunnel when suddenly you start hearing echos again. \n You don't know what it is, so how could you really care#########################################################", 
    options: [
       {
      text: "Continue##############",
      nextText: 303311133331211122                    
    }]
  }
///////////REMEMBER!!!!!key/////document//////SOUTH WAY STORY IS CAPABLE OF /requiredState: currentState => currentState.sword,\///////////weirdGems/////////////////
]

// start Game here !!!!!!!!!!!!!!!!!!!!!!!!
startGame();
