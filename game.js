const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const form = document.getElementById('form')
form.style.display = "none"
let state = {}

let monsters = []
let monsterArray = []
fetch('http://localhost:3000/monsters')
.then(response => response.json())
.then(monsterData => {
  monsters = monsterData
  monsters.forEach(monster => {
    monsterArray.push(monster.name)
    console.log(monsterArray[0])
  })
})

console.log(monsterArray[0])
console.log(monsterArray)
document.addEventListener('mouseover', (e)=>{
    audio = document.getElementById('myAudio')
    audio.play()
})
function showMonster(monsters) {
  const monsterContainer = document.getElementById('monster-container')
  let newMonster = document.createElement('img')
  newMonster.src = monsters.url
  monsterContainer.appendChild(newMonster)
}
function startGame() {
  state = {}
  showTextNode(1)
}
function showTextNode(textNodeId) {
  const textNode = textNodes.find((node) => node.id === textNodeId);
  textElement.innerText = textNode.text;
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }
  textNode.options.forEach((option) => {
    if (showOption(option)) {
      const button = document.createElement('button');
      button.innerText = option.text;
      button.classList.add('btn');
      button.addEventListener('click', () => {
        console.assert(monsters!=null, "monsters was null in click")
        monsters.forEach(monster => {
          console.log(monster.name)
        })
        selectOption(option)
      });
      optionButtonsElement.appendChild(button);
    }
  });
}
function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}
function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  } if (nextTextNodeId===37) {
      form.style.display = "block"
      form.addEventListener('submit', (e)=>{
        e.preventDefault()
        password = e.target['password'].value
        if (password === 'JavaScript') {
          showTextNode(38)
          form.style.display = 'none'
        } 
        e.target.reset()
      })
  } if (nextTextNodeId >= 1 && nextTextNodeId <= 36) {
      form.style.display = "none"
  } if (nextTextNodeId === 5) {
    document.body.style.backgroundImage = "url('https://i.pinimg.com/originals/23/87/7c/23877c1029cb9c1918fc05e9ec83e2e7.jpg')";
  } if (nextTextNodeId === 2) {
    document.body.style.backgroundImage = "url('https://static.wikia.nocookie.net/garndnd/images/2/2f/ViridianPlaza.jpg/revision/latest?cb=20200116032201')"
  } if (nextTextNodeId === 3) {
    document.body.style.backgroundImage = "url('https://i.pinimg.com/originals/49/24/76/492476b0e6394d8d1d3704031a71a270.png')"
  } if (nextTextNodeId === 4) {
    document.body.style.backgroundImage = "url('https://www.creativefabrica.com/wp-content/uploads/2023/01/17/Apothecary-Shop-Background-Fantasy-Art-57967939-1.png')"
  } if (nextTextNodeId === 8) {
    alert("You feel a little drunk");
    document.getElementById("option-buttons").blur();
  } if (nextTextNodeId === 20) {
    alert('Thanks!')
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}
const textNodes = [
  {
    id: 1,
    text: 'You wake up in a strange forest wearing a mysterious magical ring.',
    options: [
      {
        text: 'Search for civilization.',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'You come across a town on the edge of the forest.',
    options: [
      {
        text: 'Go to tavern.',
        nextText: 3
      },
      {
        text: 'Go to store.',
        nextText: 4
      },
      {
        text: 'Go to the cave.',
        nextText: 5
      },
      {
        text: 'Go to house behind the tavern.',
        nextText: 37
      }
    ]
  },
  {
    id: 3,
    text: 'You come into a tavern that has seen better days. There are few people here.',
    options: [
      {
        text: 'Talk to the barkeep.',
        nextText: 6
      },
      {
        text: 'Talk to the mysterious man.',
        nextText: 7
      },
      {
        text: 'Drink a pint.',
        nextText: 8
      },
      {
        text: 'Exit to town square.',
        nextText: 2
      }
    ]
  },
  {
    id: 4,
    text: 'You walk into a small shop.',
    options: [
      {
        text: 'Buy some food.',
        nextText: 4
      },
      {
          text: 'Talk to the merchant.',
          nextText: 9
      },
      {
          text: 'Exit to town square.',
          nextText: 2
      }
    ]
  },
  {
    id: 5,
    text: 'You find a damp cave with a large opening not far from the town.',
    options: [
      {
        text: 'Search around the opening of the cave.',
        nextText: 11
      },
      {
          text: 'Delve deeper into the cave.',
          requiredState: (currentState) => currentState.secondSpell || currentState.fifthSpell,
          nextText: 12
      },
      {
          text: 'Set up camp for the night.',
          nextText: 13
      },
      {
          text: 'Go back to town.',
          nextText: 2
      }
    ]
  },
  {
    id: 6,
    text: 'The barkeep serves you a pint and asks how you are.',
    options: [
      {
        text: 'Ask, "What`s going on around here?"',
        nextText: 14
      },
      {
          text: 'Tip the bartender.',
          nextText: 15
      },
      {
          text: 'Go back to your seat.',
          nextText: 3
      }
    ]
  },
  {
    id: 7,
    text: 'A mysterious hooded man sitting in the corner greets you coldly.',
    options: [
      {
        text: 'Ask, "What`s going on around here?"',
        nextText: 16
      },
      {
        text: 'Show him your ring.',
        nextText: 17
      },
      {
        text: 'Go back to your seat.',
        nextText: 3
      },
    ]
  },
  {
    id: 8,
    text: 'You feel a little more drunk.',
    options: [
      {
        text: 'Talk to barkeep.',
        nextText: 6
      },
      {
          text: 'Talk to the mysterious man.',
          nextText: 7
      },
      {
          text: 'Drink another pint.',
          nextText: 8
      },
      {
          text: 'Exit to town square.',
          nextText: 2
      }
    ]
  },
  {
    id: 9,
    text: '"Goblins have been raiding the town at nights. People are getting tired of living like this."',
    options: [
      {
        text: 'Continue',
        nextText: 4
      }
    ]
  },
  {
    id: 11,
    text: `A crazed ${monsterArray} appears from out of the darkness.`,
    options: [
      {
        text: 'Cast a spell at the goblin.',
        setState: { secondSpell: true },
        nextText: 18
      },
      {
          text: 'Run away.',
          nextText: 5
      }
    ]
  },
  {
    id:12,
    text: 'Going deeper into the cave you notice webs spread from the floor to ceiling.',
    options: [
      {
        text: 'Search the webs.',
        nextText: 19
      },
      {
        text: 'Go deeper into the cave.',
        requiredState: (currentState) => currentState.thirdSpell || currentState.fifthSpell,
        nextText: 25
      },
      {
        text: 'Return to the start of the cave.',
        nextText: 5
      }
    ]
  },
  {
    id: 13,
    text: 'You set up camp for the night.',
    options:[
      {
        text: 'Spend the night next to the fire.',
        nextText: 5
      }
    ]
  },
  {
    id: 14,
    text: 'Everyone in town is scared because there are rumors of a large dragon hiding in the cave nearby.',
    options:[
      {
        text: 'Continue',
        nextText: 6
      }
    ]
  },
  {
    id: 15,
    text: 'The bartender thanks you and offers you another pint.',
    options:[
      {
        text: 'Tip the bartender again.',
        nextText: 20
      },
      {
        text: 'Talk to the bartender.',
        nextText: 6
      },
      {
        text: 'Return to your seat.',
        nextText: 3
      }
    ]
  },
  {
    id: 16,
    text: 'A dragon recently took up residence in a nearby cave and now the whole town is spooked.',
    options:[
      {
        text: 'Continue',
        nextText: 7
      }
    ]
  },
  {
    id: 17,
    text: 'That ring looks very familiar to the town wizard`s ring. He lives behind the tavern, but he`s very reclusive.',
    options:[
      {
        text: 'Continue',
        nextText: 7
      }
    ]
  },
  {
    id:18,
    text: 'The goblin is burnt to a crisp. You feel more powerful and learn a new spell.',
    options: [
      {
        text: 'Continue',
        nextText: 5
      }
    ]
  },
  {
    id: 19,
    text: 'A giant spider crawls down from the ceiling and confronts you.',
    options:[
      {
        text: 'Attack the spider.',
        setState: { thirdSpell: true },
        nextText: 21
      },
      {
        text: 'Run away.',
        nextText: 12
      }
    ]
  },
  {
    id: 20,
    text: 'The bartender thanks you again and offers you another pint.',
    options:[
      {
        text: 'Tip the bartender again.',
        nextText: 23
      },
      {
        text: 'Talk to the bartender.',
        nextText: 6
      },
      {
        text: 'Return to your seat.',
        nextText: 3
      }
    ]
  },
  {
    id: 21,
    text: 'The giant spider is incinerated. You feel more powerful from the experience and a new spell comes to mind.',
    options: [
      {
        text: 'Continue',
        nextText: 12
      }
    ]
  },
  {
    id:22,
    text:'The giant spider is unaffected by your spell. It lunges forward and strikes, mortally wounding you.',
    options: [
      {
        text: 'Retry',
        nextText: -1
      }
    ]
  },
  {
    id:23,
    text: 'The bartender thanks you again and offers you another pint.',
    options: [
      {
        text: 'Tip the bartender again.',
        nextText: 24
      },
      {
        text: 'Talk to the bartender.',
        nextText: 6
      },
      {
        text: 'Return to your seat.',
        nextText: 3
      }
    ]
  },
  {
    id:24,
    text: '"You`re quite gernous. I shouldn`t be telling anyone this but the password for the house behind the tavern is JavaScript. Don`t ask me why, I don`t know what it means.',
    options: [
      {
        text: 'Continue',
        nextText: 6
      }
    ]
  },
  {
    id:25,
    text: 'Deeper into the cave you notice some crude cave paintings and personal effects that seem too large for a human.',
    options: [
      {
        text: 'Search the belongings.',
        nextText: 26
      },
      {
        text: 'Retreat towards the beginning of the cave.',
        nextText: 12
      },
      {
        text: 'Go further into the cave.',
        requiredState: (currentState) => currentState.fourthSpell || currentState.fifthSpell,
        nextText:27
      }
    ]
  },
  {
    id: 26,
    text: 'A massive ogre lumbers towards you as you rifle through their belongings.',
    options: [
      {
        text: 'Cast a spell at the ogre.',
        setState: { fourthSpell: true },
        nextText: 28
      },
      {
        text: 'Run away.',
        nextText: 25
      }
    ]
  },
  {
    id: 27,
    text: 'Even deeper in the cave you feel the temperature begin to rise and you notice a clutch of dragon eggs.',
    options: [
      {
        text: 'Inspect the eggs.',
        nextText: 30
      },
      {
        text: 'Go back up a level.',
        nextText: 25
      },
      {
        text: 'Go deeper into the cave.',
        requiredState: (currentState) => currentState.fifthSpell,
        nextText: 31
      }
    ]
  },
  {
    id: 28,
    text: 'The ogre is easily felled by your magic. As it collapses you feel more powerful and you gain another spell.',
    options: [
      {
        text: 'Continue',
        nextText: 25
      }
    ]
  },
  {
    id:29,
    text: 'The ogre dodges your spell, picks you up and hurls you into the cave wall, crushing your body.',
    options: [
      {
        text: 'Retry',
        nextText: -1
      }
    ]
  },
  {
    id:30,
    text: 'A "small" dragon screeches and moves in your direction.',
    options: [
      {
        text: 'Attack the small dragon.',
        setState: { fifthSpell: true },
        nextText: 32
      },
      {
        text: 'Retreat.',
        nextText: 27
      }
    ]
  },
  {
    id: 31,
    text: 'The temperature here is overwhelming. You pass a large clutch of eggs and come across a massive hoard of gold.',
    options: [
      {
        text: 'Inspect the hoard.',
        nextText: 34
      },
      {
        text: 'Go back up a level.',
        nextText: 27
      }
    ]
  },
  {
    id: 32,
    text: 'The small dragon is destroyed by your magic. As its life fades you feel even stronger and learn an incredibly powerful spell.',
    options: [
      {
        text: 'Continue',
        nextText: 27
      }
    ]
  },
  {
    id: 33,
    text: 'The dragon rips you limb from limb.',
    options: [
      {
        text: 'Retry.',
        nextText: -1
      }
    ]
  },
  {
    id:34,
    text: 'A massive red dragon moves into the space of the cavern, completely dwarfing you.',
    options: [
      {
        text: 'Attack the dragon!',
        nextText: 35
      }
    ]
  },
  {
    id:35,
    text: 'The dragon is defeated. The town is saved.',
    options: [
      {
        text: 'You win!',
        nextText: -1
      }
    ]
  },
  {
    id:36,
    text: 'The dragon breathes a wall of fire over you, instantly turning you to ash.',
    options: [
      {
        text: 'Retry',
        nextText: -1
      }
    ]
  },
  {
    id:37,
    text: 'You knock on the door of a small house. An eye peers out from a hole in the door. What`s the password?',
    options: [
      {
        text: 'Return to town.',
        nextText: 2
      }
    ]
  },
  {
    id: 38,
    text: 'The wizard lets you into his home. Someone mustve told you I live here. I`ll teach you what I know but you have to leave me alone after that, and don`t tell anyone where you learned this! You learn an incredibly powerful spell.',
    options:[
      {
        text: 'Continue',
        setState: { fifthSpell: true },
        nextText: 2
      }
    ]
  }
]

startGame()
