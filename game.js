// Credit: https://www.youtube.com/watch?v=R1S_NhKkvGA 
// javascript part starts at 6:26 


const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {} // this is going to equal an empty object because it will keep track of where in the adventure they are. 

function startGame() {
 
    state = {} //So when we start our game, this should be empty. 
    showTextNode(1)

}


// Implementing how to show the text node 
function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    //removes the option button
    while (optionButtonsElement.firstChild) {
      optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => { 
        if (showOption(option)){ 
            const button = document.createElement('button')   //1. Creating the button
            button.innerText = option.text                    //2. Setting the text          
            button.classList.add('btn')                       //3. class so it's styled proper 
            button.addEventListener('click', () => selectOption(option))     //4. clicking 
            optionButtonsElement.appendChild(button)
        }
    })
}


function showOption(option) {
    return option.requiredState == null || option.requiredState (state)    //This is to show if there is a required state object or not. Look at line 80 & 86.
}

function selectOption(option){
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0 ) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}



// Below: setting up texts 
// Adding 2nd Node: Video starts at 11;50


const textNodes = [
  {
    id: 1,
    text: 'You wake up at D12, what do you do next?',
    options: [
      {
        text: 'Go to the Bar',
        setState: { goBar: true },
        nextText: 2
      },
      {
        text: 'Back 2 Sleep',
        nextText: 2
      }
    ]
  },
  {
        id: 2,
        text: "You're at the bar, lit. What do you do next?",
        options: [
            {
                text: 'Phone a friend',
                requiredState: (currentState) => currentState.goBar,
                setState: {goBar: false, phone: true},
                nextText: 3
            },
            {
                text:  'Go home',
                requiredState: (currentState) => currentState.goBar,
                setState: {goBar: false, home: true},
                nextText: 3
            },
            {
                text: 'ignore consciousness',
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: "You finally made it home",
        options: [
            {
                text: 'sleep while watching Netflix',
                nextText: -2
            },
            {
                text: 'sleep while watching Hulu',
                nextText: 0
            },
            {
                text: 'spit some hot poetry',
                nextText: -1
            }
        ]
    },    
]

startGame()