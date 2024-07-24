const names = [
    'alexis',
    'blake',
    'cassidy',
    'devon',
    'emerson',
    'finley',
    'gray',
    'harper',
    'jordan',
    'kai',
    'logan',
    'morgan',
    'peyton',
    'quinn',
    'riley',
    'skyler'
];

const thoughts = [
    'Just finished a great book!',
    'The stars are beautiful tonight.',
    'I love hiking in the mountains.',
    'Time for some coffee!',
    'Just learned a new recipe!',
    'What if we could teleport?',
    'A good song can change your mood.',
    'Nature is so calming.'
];

// Function to get a unique random username from the names array
// The selected name is removed from the array to avoid repetition
const getRandomName = () => {
    if (names.length === 0) {
        return 'No more names available';
    }
    const index = Math.floor(Math.random() * names.length);
    return names.splice(index, 1)[0];
};

// Function to get a unique random thought from the thoughts array
// The selected thought is removed from the array to avoid repetition
const getRandomThought = () => {
    if (thoughts.length === 0) {
        return 'No more thoughts available';
    }
    const index = Math.floor(Math.random() * thoughts.length);
    return thoughts.splice(index, 1)[0];
};

// Exporting the functions to generate random unique names and thoughts
module.exports = { getRandomName, getRandomThought };
