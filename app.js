//Variables
const jokeContainer = document.querySelector('#jokeAwaitingAssignment');
const generator = document.querySelector('#generator');
const popUp = document.querySelector('#jokePopUp');
const clearListsBtn = document.querySelector('#clearLists');
const titleSpans = document.querySelectorAll('span');

//Tier Lists
const notFunnyList = document.querySelector('.not-funny');
const ehList = document.querySelector('.eh');
const funnyList = document.querySelector('.funny');

//Assignment Buttons
const notFunnyBtn = document.querySelector('#notFunny');
const ehBtn = document.querySelector('#eh');
const funnyBtn = document.querySelector('#funny');

//Form Variables
const createdJokeForm = document.querySelector('#jokeForm');
const createdJoke = document.querySelector('#createdJoke');
const jokeLevel = document.querySelector('#tierSelect');
const submitBtn = document.querySelector('#submitFormBtn');


//Functions

titleSpans.forEach((span, i) => {
    setTimeout(() => span.classList.add('active'), 250 * i)
});

const getDadJoke = async () => {
    try {
        const config = { headers: { Accept: 'application/json' } };
        const res = await axios.get('https://icanhazdadjoke.com/', config);
        return res.data.joke;
    } catch (e) {
        return "No Jokes Available Right Now"
    }
};

const openPopUp = () => {
    popUp.style.display = 'flex';
    popUp.scrollIntoView({ behavior: 'smooth' });
    generator.classList.remove('pulse')
}

const closePopUp = () => {
    generator.classList.add('pulse')
    popUp.style.display = 'none';
    window.scrollTo(0, 0);
}

const getNewJoke = async () => {
    openPopUp();
    const jokeText = await getDadJoke();
    const newLi = document.createElement('li');
    newLi.append(jokeText);

    if (jokeContainer.children.length > 0) {
        jokeContainer.replaceChildren();
        jokeContainer.append(newLi);
    } else {
        jokeContainer.append(newLi);
    }

};

const createLi = () => {
    const newLi = document.createElement('li');
    const icon = document.createElement('i');
    icon.classList.add('fa', 'fa-trash');
    newLi.append(jokeContainer.firstElementChild);
    newLi.append(icon);
    icon.addEventListener('click', () => { icon.parentNode.parentNode.removeChild(icon.parentNode) });
    return newLi;
};

const appendToNotFunnyList = () => {
    const newLi = createLi();
    notFunnyList.append(newLi);
    closePopUp();
};

const appendToEhList = () => {
    const newLi = createLi();
    ehList.append(newLi);
    closePopUp();
};

const appendToFunnyList = () => {
    const newLi = createLi();
    funnyList.append(newLi);
    closePopUp();
};

const clearLists = () => {
    notFunnyList.replaceChildren();
    ehList.replaceChildren();
    funnyList.replaceChildren();
};

const handleSubmit = (e) => {
    e.preventDefault();
    const newLi = document.createElement('li');
    const icon = document.createElement('i');
    icon.classList.add('fa', 'fa-trash');
    newLi.append(createdJoke.value);
    newLi.append(icon);
    icon.addEventListener('click', () => { icon.parentNode.parentNode.removeChild(icon.parentNode) });

    if (jokeLevel.value === 'notFunny') {
        notFunnyList.append(newLi);
    }
    else if (jokeLevel.value === 'eh') {
        ehList.append(newLi);
    }
    else if (jokeLevel.value === 'funny') {
        funnyList.append(newLi);
    } else {
        alert("Please Select A Funny Level!");
    }

    createdJoke.value = '';
    jokeLevel.value = '';
    window.scrollTo(0, 0);
};


//Calls and Inits
generator.addEventListener('click', getNewJoke);

notFunnyBtn.addEventListener('click', appendToNotFunnyList);

ehBtn.addEventListener('click', appendToEhList);

funnyBtn.addEventListener('click', appendToFunnyList);

clearListsBtn.addEventListener('click', clearLists)

createdJokeForm.addEventListener('submit', handleSubmit);

submitBtn.addEventListener('click', handleSubmit);



