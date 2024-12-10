let timeRemaining = 300; // 300 seconds
let score = 0;
let hintCount = 0;
const maxHints = 4;
let correctSuspect = Math.floor(Math.random() * 8); // Randomly choose one of 8 suspects
let currentClueIndex = 0;

// Detailed backstory for the game
const backstory = `
The Celestial Wave, a sprawling, state-of-the-art luxury yacht, was the epitome of opulence, hosting a high-profile evening party under the glittering canopy of stars. Onboard were some of the city's most influential figures: business moguls, celebrities, and a handful of select guests who had secured their invitations through connections and whispers. Champagne flowed freely, music filled the night air, and laughter echoed across the shimmering waters.

But the jubilant atmosphere took a sinister turn when Captain Chris, the seasoned and respected helmsman of the Celestial Wave, was discovered missing. He had last been seen at the stern of the yacht, in the middle of a heated argument with one of the guests. A witness, shaken but insistent, claimed they saw someone shove Conrad overboard in the heat of the moment.

With no immediate escape route and the specter of the captain’s mysterious fate hanging over them, the guests find themselves under scrutiny.

The stakes are high: who pushed Captain Chris overboard? Was it a deliberate act fueled by revenge, a tragic accident in a fit of passion, or part of a more elaborate scheme? Time is running out to piece together the clues before the yacht becomes a floating crime scene.

Can you unravel the tangled web of secrets, lies, and motives to uncover the truth? The answers are hidden among the glamorous and the guilty.
`;

document.getElementById("story").textContent = backstory;

// Timer and auto-start functionality
let timerInterval;
document.addEventListener("DOMContentLoaded", () => {
  const timerMainElement = document.getElementById("timer-main");
  const timerSecondaryElement = document.getElementById("timer-secondary");

  // Start the timer
  timerInterval = setInterval(() => {
    if (timeRemaining > 0) {
      timeRemaining--;
      timerMainElement.textContent = timeRemaining;
      if (timerSecondaryElement) {
        timerSecondaryElement.textContent = timeRemaining;
      }
    } else {
      clearInterval(timerInterval);
      endGame(false);
    }
  }, 1000);
});

// Suspect data with detailed backstories and ambiguous clues
const suspects = [
  {
    name: "Tennile Seas",
    backstory: "The captain's first mate, known for her strict demeanor and unwavering loyalty. Recently, she discovered she had been passed over for a promotion, fueling her resentment toward Captain Chris.",
    clues: [
      "She had an argument with the captain the day before.",
      "Her uniform was wet shortly after the incident.",
      "She was seen near the railing moments before the alarm was raised.",
      "A rejection letter was found near the stern of the boat.",
    ],
  },
  {
    name: "Alexander Waves",
    backstory: "A rival yachtsman who had always envied Captain Chris's success. He recently lost a high-stakes regatta to the captain, which humiliated him in front of the sailing community.",
    clues: [
      "The suspect was overheard muttering about 'revenge.'",
      "A witness saw him examining the captain's personal effects.",
      "He was the last person seen in the galley with a drink in hand.",
      "A pair of sailing gloves were found near the scene.",
    ],
  },
  {
    name: "Brittany Breeze",
    backstory: "A mysterious guest who appeared uninvited to the yacht party. She claimed to be a journalist, but no one could verify her credentials. She was caught sneaking into restricted areas.",
    clues: [
      "The suspect had a map of the yacht that no guest was supposed to have.",
      "She was seen near the captain’s quarters shortly before the incident.",
      "Her bag contained a recording device and a handwritten note with the captain's name.",
      "A guest overheard her talking about a 'big story.'"
    ],
  },
  {
    name: "Abel Deep",
    backstory: "A deckhand with a history of trouble, Abel was recently reprimanded by the captain for neglecting his duties. Rumors about his temper had spread among the crew.",
    clues: [
      "A crewmember heard him muttering, 'He’ll regret messing with me.'",
      "His alibi doesn’t hold up, as he claimed to be below deck during the incident.",
      "He was spotted cleaning the deck, unusually close to the railing.",
      "A torn piece of his uniform was found near the railing."
    ],
  },
  {
    name: "Heather Lagoon",
    backstory: "A wealthy socialite who had a heated argument with the captain earlier in the day. She accused him of revealing a scandalous secret about her at the last yacht club meeting.",
    clues: [
      "Her jewelry was found scattered near the railing.",
      "She was seen leaving the captain’s quarters looking distraught.",
      "A witness heard her shout, 'You’ll pay for this!' during the argument.",
      "A silk scarf, matching her dress, was caught on the railing.",
    ],
  },
  {
    name: "Travis Tide",
    backstory: "The ship's engineer, who discovered the yacht was scheduled for decommissioning. He blamed Captain Chris for ruining his career prospects.",
    clues: [
      "The suspect was found near the engine room shortly after the incident.",
      "He recently filed a complaint about the captain with the yacht company.",
      "An oil-stained handprint was found on the railing near the scene.",
      "A ripped letter about the yacht's final voyage was found in his locker.",
    ],
  },
  {
    name: "Darla Pearl",
    backstory: "The captain's niece, who had a complicated relationship with him. She was recently excluded from his will, sparking resentment.",
    clues: [
      "She was seen crying in the lounge before the incident.",
      "A torn letter addressed to her was found in the captain’s quarters.",
      "A guest overheard her whisper, 'He doesn’t deserve to be here anymore.'",
      "A crumpled picture of her and the captain was near the stern.",
    ],
  },
  {
    name: "Jassmine Gale",
    backstory: "A journalist looking for a big scoop. Jassmine had been pestering the captain with questions about his personal life, making him visibly uncomfortable.",
    clues: [
      "Her notepad had cryptic notes about a 'fall from grace.'",
      "She was spotted near the railing minutes before the incident.",
      "A tape recorder belonging to her had a partial recording of the argument.",
      "Her press badge was found in the captain’s quarters."
    ],
  },
];

// Populate suspects on the suspect page
const suspectsList = document.getElementById("suspects-list");
suspects.forEach((suspect, index) => {
  const suspectDiv = document.createElement("div");
  suspectDiv.classList.add("suspect");
  suspectDiv.innerHTML = `
    <h4>${suspect.name}</h4>
    <p>${suspect.backstory}</p>
    <button class="suspect-button" data-index="${index}">Accuse</button>
  `;
  suspectsList.appendChild(suspectDiv);
});

// Start game logic
document.getElementById("start-game").addEventListener("click", () => {
  document.getElementById("story-page").classList.add("hidden");
  document.getElementById("suspects-page").classList.remove("hidden");
});

// Accuse suspect
document.querySelectorAll(".suspect-button").forEach((button) => {
  button.addEventListener("click", (event) => {
    const suspectIndex = parseInt(event.target.dataset.index);
    if (suspectIndex === correctSuspect) {
      score += 15;
      endGame(true);
    } else {
      score -= 10;
      document.getElementById("score").textContent = score;
      alert("Incorrect suspect! Try again.");
    }
  });
});

// Provide hints
document.getElementById("hint-button").addEventListener("click", () => {
  if (hintCount < maxHints) {
    const hint = suspects[correctSuspect].clues[currentClueIndex];
    document.getElementById("hint-text").textContent = `Hint ${hintCount + 1}: ${hint}`;
    currentClueIndex = (currentClueIndex + 1) % suspects[correctSuspect].clues.length;
    hintCount++;
    score -= 5;
    document.getElementById("score").textContent = score;
  } else {
    document.getElementById("hint-text").textContent = "No more hints available!";
  }
});

// End game
function endGame(won) {
  clearInterval(timerInterval); // Stop the timer
  document.getElementById("suspects-page").classList.add("hidden");
  document.getElementById("end-screen").classList.remove("hidden");
  const suspect = suspects[correctSuspect];
  document.getElementById("end-message").innerHTML = won
    ? `Congratulations! You solved the mystery! The culprit was ${suspect.name}.<br>Final Score: ${score}`
    : `Time's up! The culprit was ${suspect.name}.<br>Final Score: ${score}`;
}
