const formAdd = document.forms[0];
const formSearch = document.forms[1];
const contentElem = document.querySelector('#content');


const get_contentLst = () => JSON.parse(localStorage.getItem('contentLst')) || [];

const add_deal = deal => localStorage.setItem('contentLst', JSON.stringify([...get_contentLst(), deal]));

const remove_deal = deal =>{
	const new_lst = get_contentLst().filter(elem => elem.word !== deal.word);
	localStorage.setItem('contentLst', JSON.stringify(new_lst));
};


function render(list){
	contentElem.innerText = '';
	for(let elem of list){
		const divElem = document.createElement('div');
		const pElem = document.createElement('p');
		const closeElem = document.createElement('div');

		divElem.append(pElem, closeElem);
		contentElem.append(divElem);

		closeElem.innerText = '✘'
		pElem.innerText = elem.word;
		divElem.style.background = elem.color;

		divElem.classList.add('card');
		pElem.classList.add('word-elem');
		closeElem.classList.add('close');

		closeElem.addEventListener('click', event =>{
			remove_deal(elem);
			render(get_contentLst());
		})

		divElem.addEventListener('dblclick', event=>{
			if(pElem.innerText == elem.word){
				pElem.innerText = elem.translation;
			}else{
				pElem.innerText = elem.word;
			};
		});
	};
};



formAdd.addEventListener('submit', event =>{
	event.preventDefault();
	const {word, translation, color} = event.target;
	if(word.value !== '' && translation.value !== '' && color.value !== ''){
		add_deal({
			word: word.value,
			translation: translation.value,
			color: color.value,
		});
	}else{
		alert('Значение одного из полей пустое!');
	};
	word.value = '';
	translation.value = '';
	color.value = '';
	render(get_contentLst());
});

formSearch.addEventListener('input', event => {
	event.preventDefault();
	const searchElem = event.target.value;
	const lst =  get_contentLst().filter(elem => elem.word.startsWith(searchElem));
	render(lst);
})

render(get_contentLst());